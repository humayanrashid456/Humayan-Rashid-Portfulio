import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

// ── User (admin accounts; there is no public sign-up) ────────────────────────
export const USER_ROLES = ["admin"] as const;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 254 },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: USER_ROLES, default: "admin", required: true },
    emailVerifiedAt: { type: Date },
    passwordChangedAt: { type: Date },
    failedLoginCount: { type: Number, default: 0 },
    lockedUntil: { type: Date },
  },
  { timestamps: true }
);

// ── Session (cookie holds a random token; only its SHA-256 hash is stored) ────
const sessionSchema = new Schema(
  {
    tokenHash: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    expiresAt: { type: Date, required: true },
    lastSeenAt: { type: Date },
    userAgent: { type: String, maxlength: 400 },
    ipHash: { type: String },
  },
  { timestamps: true }
);
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// ── Auth token (password reset / email verification; hashed, single-use, TTL) ─
export const AUTH_TOKEN_PURPOSES = ["password_reset", "email_verify"] as const;

const authTokenSchema = new Schema(
  {
    tokenHash: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    purpose: { type: String, enum: AUTH_TOKEN_PURPOSES, required: true },
    expiresAt: { type: Date, required: true },
    usedAt: { type: Date },
  },
  { timestamps: true }
);
authTokenSchema.index({ userId: 1, purpose: 1 });
authTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// ── Rate limit counter (fixed window, auto-expires) ──────────────────────────
const rateLimitSchema = new Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
  expiresAt: { type: Date, required: true },
});
rateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type UserDoc = InferSchemaType<typeof userSchema>;
export type SessionDoc = InferSchemaType<typeof sessionSchema>;
export type AuthTokenDoc = InferSchemaType<typeof authTokenSchema>;
export type RateLimitDoc = InferSchemaType<typeof rateLimitSchema>;

export const User: Model<UserDoc> = mongoose.models.User ?? mongoose.model("User", userSchema);
export const Session: Model<SessionDoc> = mongoose.models.Session ?? mongoose.model("Session", sessionSchema);
export const AuthToken: Model<AuthTokenDoc> = mongoose.models.AuthToken ?? mongoose.model("AuthToken", authTokenSchema);
export const RateLimit: Model<RateLimitDoc> = mongoose.models.RateLimit ?? mongoose.model("RateLimit", rateLimitSchema);
