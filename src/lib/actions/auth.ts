"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getDummyHash, hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from "@/lib/auth/password";
import { createSession, destroyOtherSessions, destroySession, verifySession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connect";
import { User } from "@/lib/db/models";
import { consumeRateLimit, getClientIpHash } from "@/lib/rate-limit";

export type FormState = { error?: string; success?: string } | undefined;

const MAX_FAILED_LOGINS = 5;
const LOCK_MINUTES = 15;
const INVALID = "Incorrect email or password.";

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
  password: z.string().min(1).max(200),
});

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: INVALID };
  const { email, password } = parsed.data;

  const ipHash = await getClientIpHash();
  const allowed =
    (await consumeRateLimit(`login:ip:${ipHash}`, 20, 15 * 60)) &&
    (await consumeRateLimit(`login:email:${email}`, 10, 15 * 60));
  if (!allowed) return { error: "Too many attempts. Please wait 15 minutes and try again." };

  await connectDB();
  const user = await User.findOne({ email }).select("+passwordHash failedLoginCount lockedUntil");

  if (!user) {
    await verifyPassword(password, await getDummyHash()); // equalise timing
    return { error: INVALID };
  }
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return { error: "This account is temporarily locked. Please try again later." };
  }

  if (!(await verifyPassword(password, user.passwordHash))) {
    const failures = (user.failedLoginCount ?? 0) + 1;
    user.failedLoginCount = failures >= MAX_FAILED_LOGINS ? 0 : failures;
    if (failures >= MAX_FAILED_LOGINS) user.lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
    await user.save();
    return { error: INVALID };
  }

  user.failedLoginCount = 0;
  user.lockedUntil = undefined;
  await user.save();
  await createSession(String(user._id));
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

const changePasswordSchema = z
  .object({
    current: z.string().min(1, "Enter your current password").max(200),
    next: z.string().min(MIN_PASSWORD_LENGTH, `Use at least ${MIN_PASSWORD_LENGTH} characters`).max(200),
    confirm: z.string(),
  })
  .refine((v) => v.next === v.confirm, { message: "The new passwords don't match", path: ["confirm"] });

export async function changePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const admin = await verifySession();
  const parsed = changePasswordSchema.safeParse({
    current: formData.get("current"),
    next: formData.get("next"),
    confirm: formData.get("confirm"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  await connectDB();
  const user = await User.findById(admin.id).select("+passwordHash");
  if (!user || !(await verifyPassword(parsed.data.current, user.passwordHash))) {
    return { error: "Your current password is incorrect." };
  }

  user.passwordHash = await hashPassword(parsed.data.next);
  user.passwordChangedAt = new Date();
  await user.save();

  // Every existing session (including this one) predates the change; start a fresh one.
  await destroyOtherSessions(admin.id);
  await destroySession();
  await createSession(admin.id);
  return { success: "Password changed. Other devices have been signed out." };
}
