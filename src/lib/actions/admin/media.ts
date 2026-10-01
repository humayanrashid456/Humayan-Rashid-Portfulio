"use server";

import { z } from "zod";
import { UPLOAD_KINDS, type UploadKind } from "@/lib/admin/upload-kinds";
import { verifySession } from "@/lib/auth/session";
import { cloudinaryConfig, fetchResource, signParams, type CloudinaryResource } from "@/lib/cloudinary";
import { connectDB } from "@/lib/db/connect";
import { Media } from "@/lib/db/models";
import type { ImageInput } from "@/lib/validation/common";
import type { VideoFileInput } from "@/lib/validation/content";

/**
 * Signed direct uploads: the browser sends the file straight to Cloudinary, so it
 * never passes through this server (no body-size limit, no proxying large videos).
 * The server fixes every upload parameter here; the client can't change the folder
 * or the allowed formats without breaking the signature.
 */
type ResourceType = "image" | "video";

const ALLOWED_FORMATS: Record<ResourceType, string> = {
  image: "jpg,jpeg,png,webp,avif",
  video: "mp4,mov,webm,m4v",
};

export interface UploadSignature {
  cloudName: string;
  apiKey: string;
  resourceType: ResourceType;
  timestamp: number;
  folder: string;
  allowedFormats: string;
  signature: string;
}

export async function getUploadSignature(kind: UploadKind, resourceType: ResourceType = "image"): Promise<UploadSignature> {
  await verifySession();
  const safeKind = z.enum(UPLOAD_KINDS).parse(kind);
  const type = z.enum(["image", "video"]).parse(resourceType);
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig();

  const params = {
    allowed_formats: ALLOWED_FORMATS[type],
    folder: `portfolio/${safeKind}`,
    timestamp: Math.floor(Date.now() / 1000),
  };
  return {
    cloudName,
    apiKey,
    resourceType: type,
    timestamp: params.timestamp,
    folder: params.folder,
    allowedFormats: params.allowed_formats,
    signature: signParams(params, apiSecret),
  };
}

const registerSchema = z.object({
  publicId: z.string().min(1).max(300),
  version: z.union([z.string(), z.number()]).transform(String),
  signature: z.string().regex(/^[a-f0-9]{40}$/),
});

/**
 * Verifies a finished upload and records it in the media ledger. Cloudinary signs
 * its response with our secret, so a matching signature proves the upload really
 * happened on our account; the metadata is then read back from Cloudinary itself.
 */
async function verifyAndRecord(input: z.input<typeof registerSchema>, resourceType: ResourceType): Promise<CloudinaryResource> {
  await verifySession();
  const { publicId, version, signature } = registerSchema.parse(input);
  const { apiSecret } = cloudinaryConfig();
  if (signParams({ public_id: publicId, version }, apiSecret) !== signature) {
    throw new Error("Upload could not be verified.");
  }

  const resource = await fetchResource(publicId, resourceType);
  await connectDB();
  await Media.updateOne(
    { publicId: resource.public_id },
    {
      $set: {
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        format: resource.format,
        bytes: resource.bytes,
        folder: resource.asset_folder ?? resource.folder ?? "",
        resourceType,
      },
      $setOnInsert: { status: "pending" },
    },
    { upsert: true }
  );
  return resource;
}

export async function registerUpload(input: z.input<typeof registerSchema>): Promise<ImageInput> {
  const resource = await verifyAndRecord(input, "image");
  return { url: resource.secure_url, publicId: resource.public_id, width: resource.width, height: resource.height, alt: "" };
}

export async function registerVideoUpload(input: z.input<typeof registerSchema>): Promise<VideoFileInput> {
  const resource = await verifyAndRecord(input, "video");
  return {
    url: resource.secure_url,
    publicId: resource.public_id,
    ...(resource.duration ? { durationSeconds: Math.round(resource.duration * 10) / 10 } : {}),
    width: resource.width,
    height: resource.height,
    bytes: resource.bytes,
    format: resource.format,
  };
}
