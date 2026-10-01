import { Schema } from "mongoose";

/**
 * Image reference embedded in content documents, so pages render without joins.
 * `url` is a Cloudinary secure_url or a local `/images/...` path; `publicId` is set
 * only for Cloudinary assets (and links to the `media` ledger for cleanup).
 */
export const imageRefSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true },
    width: { type: Number, min: 1 },
    height: { type: Number, min: 1 },
    alt: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

export const PUBLISH_STATUSES = ["draft", "published"] as const;

export const seoSchema = new Schema(
  {
    title: { type: String, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 300 },
  },
  { _id: false }
);

export const slugField = {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
  match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  maxlength: 120,
} as const;
