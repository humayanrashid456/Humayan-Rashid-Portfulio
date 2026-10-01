import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/** One admin inbox for every lead the public site captures. */
export const INQUIRY_TYPES = ["booking", "study_abroad"] as const;
export const INQUIRY_STATUSES = ["new", "read", "replied", "archived"] as const;

const inquirySchema = new Schema(
  {
    type: { type: String, enum: INQUIRY_TYPES, required: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, trim: true, maxlength: 40 },
    message: { type: String, trim: true, maxlength: 2000 },
    // Type-specific fields, validated by the Zod schema of the submitting action.
    details: { type: Schema.Types.Mixed, default: {} },
    status: { type: String, enum: INQUIRY_STATUSES, default: "new", required: true },
    meta: {
      ipHash: { type: String },
      userAgent: { type: String, maxlength: 400 },
    },
  },
  { timestamps: true, minimize: false }
);
inquirySchema.index({ type: 1, createdAt: -1 });
inquirySchema.index({ status: 1, createdAt: -1 });

export type InquiryDoc = InferSchemaType<typeof inquirySchema>;

export const Inquiry: Model<InquiryDoc> = mongoose.models.Inquiry ?? mongoose.model("Inquiry", inquirySchema);
