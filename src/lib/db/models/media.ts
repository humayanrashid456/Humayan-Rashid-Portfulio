import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * Ledger of every Cloudinary upload. Content documents embed an image or video snapshot;
 * this collection exists so replaced or abandoned uploads can be cleaned up.
 *   pending  → uploaded, not yet referenced by saved content
 *   attached → referenced by saved content
 *   detached → no longer referenced; deleted from Cloudinary after a grace period
 */
export const MEDIA_STATUSES = ["pending", "attached", "detached"] as const;

const mediaSchema = new Schema(
  {
    publicId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    format: { type: String, required: true },
    bytes: { type: Number, required: true },
    folder: { type: String, required: true },
    resourceType: { type: String, enum: ["image", "video"], default: "image", required: true },
    status: { type: String, enum: MEDIA_STATUSES, default: "pending", required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
mediaSchema.index({ status: 1, updatedAt: 1 });

export type MediaDoc = InferSchemaType<typeof mediaSchema>;

export const Media: Model<MediaDoc> = mongoose.models.Media ?? mongoose.model("Media", mediaSchema);
