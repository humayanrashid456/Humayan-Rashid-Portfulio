/** Cloudinary folders the admin can upload into (`portfolio/<kind>`). */
export const UPLOAD_KINDS = ["site", "services", "projects", "blog", "videos", "og"] as const;
export type UploadKind = (typeof UPLOAD_KINDS)[number];
