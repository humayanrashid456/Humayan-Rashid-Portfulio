/**
 * Creates the admin account, or resets its password. There is no public sign-up.
 *
 *   npm run create-admin -- --email you@example.com --name "Your Name"
 *
 * The password is typed at a hidden prompt, so it never lands in shell history.
 */
import { parseArgs } from "node:util";
import mongoose from "mongoose";
import { hashPassword, MIN_PASSWORD_LENGTH } from "@/lib/auth/password";
import { connectDB } from "@/lib/db/connect";
import { Session, User } from "@/lib/db/models";

function promptHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    const { stdin, stdout } = process;
    stdout.write(question);
    let value = "";
    if (!stdin.isTTY) {
      // Piped input (CI): read one line.
      stdin.setEncoding("utf8");
      stdin.once("data", (chunk) => resolve(String(chunk).split(/\r?\n/)[0] ?? ""));
      return;
    }
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    const onData = (char: string) => {
      if (char === "\r" || char === "\n" || char === "\u0004") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.off("data", onData);
        stdout.write("\n");
        resolve(value);
      } else if (char === "\u0003") {
        process.exit(130);
      } else if (char === "\u007f" || char === "\b") {
        value = value.slice(0, -1);
      } else {
        value += char;
      }
    };
    stdin.on("data", onData);
  });
}

async function main() {
  const { values } = parseArgs({ options: { email: { type: "string" }, name: { type: "string" } } });
  const email = values.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Usage: npm run create-admin -- --email you@example.com --name "Your Name"');
  }

  const password = await promptHidden(`Password for ${email} (min ${MIN_PASSWORD_LENGTH} chars): `);
  if (password.length < MIN_PASSWORD_LENGTH) throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  if ((await promptHidden("Repeat password: ")) !== password) throw new Error("Passwords don't match.");

  await connectDB();
  const passwordHash = await hashPassword(password);
  const existing = await User.findOne({ email });

  if (existing) {
    existing.set({ passwordHash, passwordChangedAt: new Date(), failedLoginCount: 0, lockedUntil: undefined });
    if (values.name) existing.name = values.name;
    await existing.save();
    await Session.deleteMany({ userId: existing._id });
    console.log(`✓ Password reset for ${email}. All of its sessions were signed out.`);
  } else {
    await User.create({ email, name: values.name?.trim() || email.split("@")[0], passwordHash, role: "admin" });
    console.log(`✓ Admin ${email} created. Sign in at /admin/login`);
  }
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
