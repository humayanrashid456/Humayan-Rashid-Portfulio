import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { imageRefSchema } from "./shared";

/**
 * Singleton document (`_id: "site"`) for small, always-read-together site data.
 * Skills and testimonials are embedded here rather than being collections.
 */
export const SITE_SETTINGS_ID = "site";

const skillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    level: { type: Number, min: 0, max: 100, required: true },
    category: { type: String, required: true, trim: true, maxlength: 40 },
  },
  { _id: false }
);

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    role: { type: String, trim: true, maxlength: 120, default: "" },
    feedback: { type: String, required: true, trim: true, maxlength: 1000 },
    avatar: { type: imageRefSchema },
    url: { type: String, trim: true },
  },
  { _id: false }
);

const siteSettingsSchema = new Schema(
  {
    _id: { type: String, default: SITE_SETTINGS_ID },
    brand: {
      name: { type: String, required: true, trim: true, default: "Humayan Rashid" },
      logoTitle: { type: String, trim: true, default: "I AM HUMAYAN" },
      logoSubtitle: { type: String, trim: true, default: "" },
    },
    hero: {
      // YouTube URL or 11-char id for the hero intro video; empty = thumbnail only.
      introVideo: { type: String, trim: true, default: "" },
    },
    contact: {
      email: { type: String, trim: true, lowercase: true, default: "" },
      phone: { type: String, trim: true, default: "" },
      whatsapp: { type: String, trim: true, default: "" },
      address: { type: String, trim: true, default: "" },
      timezone: { type: String, trim: true, default: "" },
    },
    social: {
      linkedin: { type: String, trim: true, default: "" },
      x: { type: String, trim: true, default: "" },
      instagram: { type: String, trim: true, default: "" },
      pinterest: { type: String, trim: true, default: "" },
      tiktok: { type: String, trim: true, default: "" },
      youtube: { type: String, trim: true, default: "" },
      github: { type: String, trim: true, default: "" },
    },
    footer: {
      copyrightText: { type: String, trim: true, default: "" },
    },
    seo: {
      title: { type: String, trim: true, maxlength: 120, default: "" },
      description: { type: String, trim: true, maxlength: 300, default: "" },
      ogImage: { type: imageRefSchema },
    },
    // Homepage section content, keyed by section. Validated by the Zod schemas in
    // src/lib/content/home.ts on every write and parsed (with defaults) on read.
    home: { type: Schema.Types.Mixed, default: {} },
    skills: { type: [skillSchema], default: [] },
    testimonials: { type: [testimonialSchema], default: [] },
  },
  { timestamps: true, minimize: false }
);

export type SiteSettingsDoc = InferSchemaType<typeof siteSettingsSchema>;

export const SiteSettings: Model<SiteSettingsDoc> =
  mongoose.models.SiteSettings ?? mongoose.model("SiteSettings", siteSettingsSchema);
