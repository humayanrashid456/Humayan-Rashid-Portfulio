import "server-only";
import { createHash } from "node:crypto";
import mongoose from "mongoose";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db/connect";
import { RateLimit } from "@/lib/db/models";
import { serverEnv } from "@/lib/env";

const DUPLICATE_KEY = 11000;

/** SHA-256 of the client IP, salted, so raw IPs are never stored. */
export async function getClientIpHash(): Promise<string> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return createHash("sha256").update(`${serverEnv().IP_HASH_SALT}:${ip}`).digest("hex");
}

/**
 * Fixed-window counter. Returns true while `key` is within `limit` hits per window.
 * One atomic upsert per call; expired windows are removed by the TTL index.
 */
export async function consumeRateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  await connectDB();
  const now = new Date();

  // A window can outlive its expiry until the TTL monitor runs (≤ 60s); clear it.
  // `trusted` exempts this server-built operator from the global sanitizeFilter.
  await RateLimit.deleteOne({ key, expiresAt: mongoose.trusted({ $lte: now }) });

  const upsert = () =>
    RateLimit.findOneAndUpdate(
      { key },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(now.getTime() + windowSeconds * 1000) } },
      { upsert: true, new: true, lean: true }
    );

  let doc;
  try {
    doc = await upsert();
  } catch (error) {
    // Two first hits raced on the unique key; the retry increments the winner.
    if ((error as { code?: number }).code !== DUPLICATE_KEY) throw error;
    doc = await upsert();
  }
  return (doc?.count ?? 0) <= limit;
}
