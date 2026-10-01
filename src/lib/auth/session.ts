import "server-only";
import { createHash, randomBytes } from "node:crypto";
import mongoose from "mongoose";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { connectDB } from "@/lib/db/connect";
import { Session, User } from "@/lib/db/models";

/**
 * Database sessions. The cookie holds 32 random bytes; the database stores only
 * their SHA-256, so a leaked database can't be replayed as a login. Sessions can
 * be revoked individually and die when the password changes.
 */
const IS_PROD = process.env.NODE_ENV === "production";
// `__Host-` binds the cookie to this exact origin over HTTPS; plain name in local dev (HTTP).
export const SESSION_COOKIE = IS_PROD ? "__Host-session" : "session";
const SESSION_DAYS = 7;

export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const userAgent = (await headers()).get("user-agent")?.slice(0, 400) ?? "";

  await connectDB();
  await Session.create({ tokenHash: sha256(token), userId, expiresAt, lastSeenAt: new Date(), userAgent });

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/** The signed-in admin, or null. Deduplicated per request. */
export const getCurrentUser = cache(async (): Promise<AdminUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  await connectDB();
  const session = await Session.findOne({
    tokenHash: sha256(token),
    // Server-built operator, exempt from the global sanitizeFilter.
    expiresAt: mongoose.trusted({ $gt: new Date() }),
  }).lean();
  if (!session) return null;

  const user = await User.findById(session.userId).select("name email passwordChangedAt").lean();
  if (!user) return null;
  // A password change signs out every session created before it.
  if (user.passwordChangedAt && session.createdAt && user.passwordChangedAt > session.createdAt) return null;

  return { id: String(user._id), name: user.name, email: user.email };
});

/**
 * Authorization gate for every admin page, layout and Server Action. A layout check
 * alone isn't enough: actions can be invoked directly, so each one calls this first.
 */
export async function verifySession(): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    await connectDB();
    await Session.deleteOne({ tokenHash: sha256(token) });
  }
  jar.delete(SESSION_COOKIE);
}

/** Signs out every other session of this user (after a password change, for example). */
export async function destroyOtherSessions(userId: string): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  await connectDB();
  await Session.deleteMany({
    userId,
    ...(token ? { tokenHash: mongoose.trusted({ $ne: sha256(token) }) } : {}),
  });
}
