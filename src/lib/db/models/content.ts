import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { imageRefSchema, PUBLISH_STATUSES, seoSchema, slugField } from "./shared";

// ── Service ──────────────────────────────────────────────────────────────────
const serviceSchema = new Schema(
  {
    slug: slugField,
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 600 },
    iconName: { type: String, required: true, trim: true, default: "Code" },
    deliverables: { type: [String], default: [] },
    image: { type: imageRefSchema },
    order: { type: Number, default: 0 },
    status: { type: String, enum: PUBLISH_STATUSES, default: "draft", required: true },
    seo: { type: seoSchema },
  },
  { timestamps: true }
);
serviceSchema.index({ status: 1, order: 1 });

// ── Project ──────────────────────────────────────────────────────────────────
const projectSchema = new Schema(
  {
    slug: slugField,
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 600 },
    body: { type: String, default: "" }, // Markdown case study
    category: { type: String, required: true, trim: true, maxlength: 60 },
    technologies: { type: [String], default: [] },
    coverImage: { type: imageRefSchema, required: true },
    liveUrl: { type: String, trim: true },
    repoUrl: { type: String, trim: true },
    order: { type: Number, default: 0 },
    status: { type: String, enum: PUBLISH_STATUSES, default: "draft", required: true },
    seo: { type: seoSchema },
  },
  { timestamps: true }
);
projectSchema.index({ status: 1, order: 1 });
projectSchema.index({ status: 1, category: 1 });

// ── Blog post ────────────────────────────────────────────────────────────────
const blogPostSchema = new Schema(
  {
    slug: slugField,
    title: { type: String, required: true, trim: true, maxlength: 160 },
    excerpt: { type: String, required: true, trim: true, maxlength: 400 },
    body: { type: String, required: true }, // Markdown
    category: { type: String, required: true, trim: true, maxlength: 60 },
    tags: { type: [String], default: [] },
    coverImage: { type: imageRefSchema, required: true },
    readingMinutes: { type: Number, min: 1, default: 1 },
    publishedAt: { type: Date },
    status: { type: String, enum: PUBLISH_STATUSES, default: "draft", required: true },
    seo: { type: seoSchema },
  },
  { timestamps: true }
);
blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ tags: 1 });

// ── Video ────────────────────────────────────────────────────────────────────
export const VIDEO_CATEGORIES = ["tutorials", "vlogs", "reviews"] as const;
/** Where a video plays from: a YouTube embed, or a file uploaded to Cloudinary. */
export const VIDEO_SOURCES = ["youtube", "upload"] as const;

const videoFileSchema = new Schema(
  {
    url: { type: String, required: true, trim: true }, // Cloudinary secure_url of the original
    publicId: { type: String, required: true, trim: true },
    durationSeconds: { type: Number, min: 0 },
    width: { type: Number, min: 1 },
    height: { type: Number, min: 1 },
    bytes: { type: Number, min: 0 },
    format: { type: String, trim: true },
  },
  { _id: false }
);

const videoSchema = new Schema(
  {
    slug: slugField,
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, trim: true, maxlength: 1000, default: "" },
    source: { type: String, enum: VIDEO_SOURCES, default: "youtube", required: true },
    // Exactly one of these is set, matching `source` (enforced by the Zod input schema).
    youtubeId: { type: String, trim: true, match: /^[A-Za-z0-9_-]{11}$/ },
    videoFile: { type: videoFileSchema },
    duration: { type: String, trim: true, maxlength: 12, default: "" },
    views: { type: String, trim: true, maxlength: 24, default: "" },
    category: { type: String, enum: VIDEO_CATEGORIES, required: true },
    thumbnail: { type: imageRefSchema },
    order: { type: Number, default: 0 },
    status: { type: String, enum: PUBLISH_STATUSES, default: "draft", required: true },
  },
  { timestamps: true }
);
videoSchema.index({ status: 1, order: 1 });

export type ServiceDoc = InferSchemaType<typeof serviceSchema>;
export type ProjectDoc = InferSchemaType<typeof projectSchema>;
export type BlogPostDoc = InferSchemaType<typeof blogPostSchema>;
export type VideoDoc = InferSchemaType<typeof videoSchema>;

export const Service: Model<ServiceDoc> = mongoose.models.Service ?? mongoose.model("Service", serviceSchema);
export const Project: Model<ProjectDoc> = mongoose.models.Project ?? mongoose.model("Project", projectSchema);
export const BlogPost: Model<BlogPostDoc> = mongoose.models.BlogPost ?? mongoose.model("BlogPost", blogPostSchema);
export const Video: Model<VideoDoc> = mongoose.models.Video ?? mongoose.model("Video", videoSchema);
