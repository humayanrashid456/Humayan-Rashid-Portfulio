import "server-only";
import mongoose from "mongoose";
import { Media } from "@/lib/db/models";

/** Every Cloudinary `publicId` referenced anywhere inside a content value. */
function collectPublicIds(value: unknown, out = new Set<string>()): Set<string> {
  if (Array.isArray(value)) value.forEach((v) => collectPublicIds(v, out));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === "publicId" && typeof v === "string" && v) out.add(v);
      else collectPublicIds(v, out);
    }
  }
  return out;
}

/**
 * Keeps the media ledger in step with saved content: images now referenced become
 * `attached`; images that were replaced or removed become `detached`, ready for a
 * delayed cleanup (they are not deleted right away, so a rollback still works).
 */
export async function syncMedia(before: unknown, after: unknown): Promise<void> {
  const now = collectPublicIds(after);
  const removed = [...collectPublicIds(before)].filter((id) => !now.has(id));

  if (now.size) {
    await Media.updateMany({ publicId: mongoose.trusted({ $in: [...now] }) }, { $set: { status: "attached" } });
  }
  if (removed.length) {
    await Media.updateMany({ publicId: mongoose.trusted({ $in: removed }) }, { $set: { status: "detached" } });
  }
}
