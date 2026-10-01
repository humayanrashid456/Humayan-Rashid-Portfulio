import { z } from "zod";
import { ICON_NAMES } from "@/lib/content/icons";

/** Required single-line text. */
export const text = (max: number, label = "This field") =>
  z.string().trim().min(1, `${label} is required`).max(max, `Keep it under ${max} characters`);

/** Optional single-line text (empty string allowed). */
export const optionalText = (max: number) => z.string().trim().max(max, `Keep it under ${max} characters`).default("");

/** Empty, or an absolute http(s) URL. */
export const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), "Enter a full URL starting with https://")
  .default("");

export const iconName = z.enum(ICON_NAMES);

/**
 * Embedded image reference. Only Cloudinary uploads and the bundled /images files
 * are accepted, so content can never point the site at an arbitrary host.
 */
export const imageSchema = z.object({
  url: z
    .string()
    .trim()
    .max(1000)
    .refine((v) => v.startsWith("https://res.cloudinary.com/") || /^\/images\/[\w.-]+$/.test(v), "Upload an image"),
  publicId: z.string().trim().max(300).optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  alt: z.string().trim().max(200).default(""),
});

export type ImageInput = z.infer<typeof imageSchema>;

export const slug = z
  .string()
  .trim()
  .toLowerCase()
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes only");

export const publishStatus = z.enum(["draft", "published"]);

export const seoSchema = z
  .object({
    title: optionalText(120),
    description: optionalText(300),
  })
  .default({ title: "", description: "" });

/** A list of short, non-empty strings. */
export const stringList = (maxItems: number, maxLength: number) =>
  z.array(z.string().trim().min(1).max(maxLength)).max(maxItems, `At most ${maxItems} items`).default([]);

/** "My First Post!" → "my-first-post" */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
