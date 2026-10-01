"use server";

import mongoose from "mongoose";
import { refresh, updateTag } from "next/cache";
import { z } from "zod";
import { COLLECTION_NAMES, type Collection } from "@/lib/admin/collection-names";
import { COLLECTION_MODELS, COLLECTION_TAGS } from "@/lib/admin/collections";
import { syncMedia } from "@/lib/admin/media-sync";
import { verifySession } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connect";
import { slugify } from "@/lib/validation/common";
import { formatDuration } from "@/lib/video";
import { CONTENT_INPUTS, issuesByPath, type SaveResult } from "@/lib/validation/content";

const DUPLICATE_KEY = 11000;
const collectionSchema = z.enum(COLLECTION_NAMES as [Collection, ...Collection[]]);
const idSchema = z.string().refine((v) => mongoose.isValidObjectId(v), "Invalid id");

/** Fields that can be cleared: a null or empty value becomes `$unset`. */
const NULLABLE_FIELDS = ["image", "thumbnail", "videoFile", "youtubeId"];

const WORDS_PER_MINUTE = 200;

export async function saveContent(collection: Collection, id: string | null, input: unknown): Promise<SaveResult> {
  await verifySession();
  const name = collectionSchema.parse(collection);
  const docId = id === null ? null : idSchema.parse(id);

  // An empty slug is generated from the title.
  const raw = (input ?? {}) as Record<string, unknown>;
  const withSlug = String(raw.slug ?? "").trim() ? raw : { ...raw, slug: slugify(String(raw.title ?? "")) };

  const parsed = CONTENT_INPUTS[name].safeParse(withSlug);
  if (!parsed.success) return { ok: false, error: "Please fix the highlighted fields.", issues: issuesByPath(parsed.error) };

  const data: Record<string, unknown> = { ...parsed.data };

  // Uploaded videos: fill the duration label from the real length when it's left empty.
  const file = data.videoFile as { durationSeconds?: number } | null | undefined;
  if (name === "videos" && !data.duration && file?.durationSeconds) data.duration = formatDuration(file.durationSeconds);

  const unset: Record<string, ""> = {};
  for (const field of NULLABLE_FIELDS) {
    if (field in data && (data[field] === null || data[field] === "")) {
      delete data[field];
      unset[field] = "";
    }
  }

  try {
    await connectDB();
    const model = COLLECTION_MODELS[name];
    const before = docId ? await model.findById(docId).lean() : null;
    if (docId && !before) return { ok: false, error: "This item no longer exists." };

    if (name === "blog") {
      const words = String(data.body).trim().split(/\s+/).length;
      data.readingMinutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
      // Stamp the publish date the first time a post goes live.
      if (data.status === "published" && !before?.publishedAt) data.publishedAt = new Date();
    }

    let savedId = docId;
    if (docId) {
      await model.updateOne({ _id: docId }, { $set: data, ...(Object.keys(unset).length ? { $unset: unset } : {}) }, { runValidators: true });
    } else {
      const created = await model.create(data);
      savedId = String(created._id);
    }

    await syncMedia(before, data);
    const tags = COLLECTION_TAGS[name];
    updateTag(tags.list);
    updateTag(tags.item(String(data.slug)));
    if (before?.slug && before.slug !== data.slug) updateTag(tags.item(String(before.slug)));
    refresh();
    return { ok: true, id: savedId ?? undefined };
  } catch (error) {
    if ((error as { code?: number }).code === DUPLICATE_KEY) {
      return { ok: false, error: "Please fix the highlighted fields.", issues: { slug: "This slug is already used" } };
    }
    console.error("[saveContent] failed:", error);
    return { ok: false, error: "Couldn't save. Please try again." };
  }
}

export async function deleteContent(collection: Collection, id: string): Promise<SaveResult> {
  await verifySession();
  const name = collectionSchema.parse(collection);
  const docId = idSchema.parse(id);

  try {
    await connectDB();
    const model = COLLECTION_MODELS[name];
    const before = await model.findByIdAndDelete(docId).lean();
    if (before) {
      await syncMedia(before, null);
      const tags = COLLECTION_TAGS[name];
      updateTag(tags.list);
      updateTag(tags.item(String(before.slug)));
    }
    refresh();
    return { ok: true };
  } catch (error) {
    console.error("[deleteContent] failed:", error);
    return { ok: false, error: "Couldn't delete. Please try again." };
  }
}
