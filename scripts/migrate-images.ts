/**
 * Moves the built-in site images to Cloudinary.   npm run images:migrate
 *
 * 1. Uploads every file in public/images to Cloudinary as `portfolio/site/<name>`.
 * 2. Rewrites every image reference in MongoDB that still points at a local
 *    `/images/...` path to the Cloudinary URL, and records it in the media ledger.
 *
 * Idempotent: existing Cloudinary assets are reused (never re-uploaded) and
 * references that already point at Cloudinary are left alone.
 *
 * Afterwards set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME so hardcoded images in the
 * components switch to Cloudinary too (see src/lib/images.ts), then restart/redeploy.
 */
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { BlogPost, Media, Project, Service, SITE_SETTINGS_ID, SiteSettings, Video } from "@/lib/db/models";
import { SITE_IMAGE_FOLDER } from "@/lib/images";

const IMAGE_DIR = path.join(process.cwd(), "public", "images");
const MIME: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

interface Uploaded {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

function cloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const missing = Object.entries({ CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret })
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) throw new Error(`Missing in .env.local: ${missing.join(", ")}`);
  return { cloudName: cloudName!, apiKey: apiKey!, apiSecret: apiSecret! };
}

/** Signed upload through Cloudinary's REST API (no SDK needed). */
async function upload(file: string, publicId: string): Promise<Uploaded> {
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
  const params: Record<string, string> = {
    overwrite: "false",
    public_id: publicId,
    timestamp: String(Math.floor(Date.now() / 1000)),
  };
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const signature = createHash("sha1").update(toSign + apiSecret).digest("hex");

  const form = new FormData();
  for (const [k, v] of Object.entries(params)) form.append(k, v);
  form.append("api_key", apiKey);
  form.append("signature", signature);
  const type = MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  form.append("file", new Blob([await readFile(file)], { type }), path.basename(file));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: form });
  const body = await res.json();
  if (!res.ok) throw new Error(`Upload failed for ${path.basename(file)}: ${body?.error?.message ?? res.status}`);
  return {
    publicId: body.public_id,
    url: body.secure_url,
    width: body.width,
    height: body.height,
    format: body.format,
    bytes: body.bytes,
  };
}

interface ImageRef {
  url?: string | null;
  publicId?: string | null;
  width?: number | null;
  height?: number | null;
  alt?: string | null;
}

/** Cloudinary replacement for a local `/images/...` reference, or null to leave it as is. */
function replacement(ref: ImageRef | null | undefined, uploads: Map<string, Uploaded>) {
  if (!ref?.url?.startsWith("/images/")) return null;
  const hit = uploads.get(path.basename(ref.url));
  if (!hit) {
    console.warn(`  ! no uploaded file for ${ref.url}, left unchanged`);
    return null;
  }
  return { url: hit.url, publicId: hit.publicId, width: hit.width, height: hit.height, alt: ref.alt ?? "" };
}

async function main() {
  cloudinaryConfig();
  await connectDB();

  // 1. Upload
  const files = (await readdir(IMAGE_DIR)).filter((f) => MIME[path.extname(f).toLowerCase()]);
  const uploads = new Map<string, Uploaded>();
  for (const file of files) {
    const publicId = `${SITE_IMAGE_FOLDER}/${path.parse(file).name}`;
    const up = await upload(path.join(IMAGE_DIR, file), publicId);
    uploads.set(file, up);
    await Media.updateOne(
      { publicId: up.publicId },
      { $set: { ...up, folder: SITE_IMAGE_FOLDER, status: "attached" } },
      { upsert: true }
    );
    console.log(`✓ uploaded ${file} → ${up.url}`);
  }

  // 2. Rewrite references
  const collections = [
    { name: "services", model: Service, field: "image" },
    { name: "projects", model: Project, field: "coverImage" },
    { name: "blog posts", model: BlogPost, field: "coverImage" },
    { name: "videos", model: Video, field: "thumbnail" },
  ] as const;

  for (const { name, model, field } of collections) {
    // The four models differ only in which field holds the image, so treat them loosely.
    const loose = model as unknown as mongoose.Model<Record<string, unknown>>;
    const docs = await loose.find({ [`${field}.url`]: /^\/images\// }).select(field).lean();
    for (const doc of docs) {
      const next = replacement(doc[field] as ImageRef, uploads);
      if (next) await loose.updateOne({ _id: doc._id }, { $set: { [field]: next } });
    }
    console.log(`✓ ${name}: ${docs.length} reference(s) updated`);
  }

  const settings = await SiteSettings.findById(SITE_SETTINGS_ID).lean();
  if (settings) {
    const set: Record<string, unknown> = {};
    const og = replacement(settings.seo?.ogImage, uploads);
    if (og) set["seo.ogImage"] = og;
    settings.testimonials?.forEach((t, i) => {
      const avatar = replacement(t.avatar, uploads);
      if (avatar) set[`testimonials.${i}.avatar`] = avatar;
    });
    if (Object.keys(set).length) await SiteSettings.updateOne({ _id: SITE_SETTINGS_ID }, { $set: set });
    console.log(`✓ site settings: ${Object.keys(set).length} reference(s) updated`);
  }

  console.log(
    `\nDone. Now set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="${process.env.CLOUDINARY_CLOUD_NAME}" in .env.local and restart the dev server.`
  );
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
