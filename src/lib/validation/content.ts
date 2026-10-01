/** Server-side validation for every admin content form. */
import { z } from "zod";
import { parseYouTubeId } from "@/lib/video";
import {
  iconName,
  imageSchema,
  optionalText,
  optionalUrl,
  publishStatus,
  seoSchema,
  slug,
  stringList,
  text,
} from "./common";

const order = z.coerce.number().int().min(0).max(9999).default(0);
const markdown = (max: number) => z.string().max(max, `Keep it under ${max.toLocaleString()} characters`);
// Form image pickers send null when the image is cleared.
const optionalImage = imageSchema.nullable().default(null);

export const serviceInput = z.object({
  slug,
  title: text(120, "Title"),
  description: text(600, "Description"),
  iconName,
  deliverables: stringList(20, 120),
  image: optionalImage,
  order,
  status: publishStatus,
  seo: seoSchema,
});

export const projectInput = z.object({
  slug,
  title: text(120, "Title"),
  description: text(600, "Description"),
  body: markdown(50_000).default(""),
  category: text(60, "Category"),
  technologies: stringList(20, 60),
  coverImage: imageSchema,
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  order,
  status: publishStatus,
  seo: seoSchema,
});

export const blogInput = z.object({
  slug,
  title: text(160, "Title"),
  excerpt: text(400, "Excerpt"),
  body: markdown(100_000).min(1, "Write the post body"),
  category: text(60, "Category"),
  tags: stringList(12, 40),
  coverImage: imageSchema,
  status: publishStatus,
  seo: seoSchema,
});

/** An uploaded video file, as returned by `registerUpload`. Only this account's Cloudinary video URLs are accepted. */
export const videoFileSchema = z.object({
  url: z
    .string()
    .trim()
    .max(1000)
    .refine((v) => /^https:\/\/res\.cloudinary\.com\/[\w-]+\/video\/upload\//.test(v), "Upload a video file"),
  publicId: z.string().trim().min(1).max(300),
  durationSeconds: z.number().nonnegative().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  bytes: z.number().int().nonnegative().optional(),
  format: z.string().trim().max(20).optional(),
});

export type VideoFileInput = z.infer<typeof videoFileSchema>;

export const videoInput = z
  .object({
    slug,
    title: text(160, "Title"),
    description: optionalText(1000),
    source: z.enum(["youtube", "upload"]).default("youtube"),
    youtubeId: z.string().trim().max(200).default(""),
    videoFile: videoFileSchema.nullable().default(null),
    duration: optionalText(12),
    views: optionalText(24),
    category: z.enum(["tutorials", "vlogs", "reviews"]),
    thumbnail: optionalImage,
    order,
    status: publishStatus,
  })
  // Keep only the fields of the chosen source, so a switched video can't keep a stale one.
  .transform((v, ctx) => {
    if (v.source === "youtube") {
      const id = parseYouTubeId(v.youtubeId);
      if (!id) ctx.addIssue({ code: "custom", path: ["youtubeId"], message: "Paste a YouTube link or 11-character video id" });
      return { ...v, youtubeId: id ?? "", videoFile: null };
    }
    if (!v.videoFile) ctx.addIssue({ code: "custom", path: ["videoFile"], message: "Upload a video file" });
    return { ...v, youtubeId: "" };
  });

export const CONTENT_INPUTS = {
  services: serviceInput,
  projects: projectInput,
  blog: blogInput,
  videos: videoInput,
} as const;

export const siteSettingsInput = z.object({
  brand: z.object({
    name: text(80, "Site name"),
    logoTitle: optionalText(40),
    logoSubtitle: optionalText(40),
  }),
  contact: z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(254)
      .refine((v) => v === "" || z.email().safeParse(v).success, "Enter a valid email address")
      .default(""),
    phone: optionalText(40),
    whatsapp: optionalText(40),
    address: optionalText(200),
    timezone: optionalText(60),
  }),
  social: z.object({
    linkedin: optionalUrl,
    x: optionalUrl,
    instagram: optionalUrl,
    pinterest: optionalUrl,
    tiktok: optionalUrl,
    youtube: optionalUrl,
    github: optionalUrl,
  }),
  footer: z.object({ copyrightText: optionalText(200) }),
  seo: z.object({
    title: optionalText(120),
    description: optionalText(300),
    ogImage: optionalImage,
  }),
});

/** Flattens Zod issues to `{ "path.to.field": "message" }` for the admin forms. */
export function issuesByPath(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    out[key] ??= issue.message;
  }
  return out;
}

export type SaveResult = { ok: true; id?: string } | { ok: false; error: string; issues?: Record<string, string> };
