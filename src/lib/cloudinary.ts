import "server-only";
import { createHash } from "node:crypto";
import { serverEnv } from "@/lib/env";

/** Cloudinary REST helpers. The API secret never leaves the server. */
export function cloudinaryConfig() {
  const { CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret } = serverEnv();
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured: set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.");
  }
  return { cloudName, apiKey, apiSecret };
}

/** Cloudinary's request signature: SHA-1 of the sorted `k=v&…` string plus the secret. */
export function signParams(params: Record<string, string | number>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(toSign + apiSecret).digest("hex");
}

export interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  asset_folder?: string;
  folder?: string;
  /** Videos only, in seconds. */
  duration?: number;
}

/** Canonical metadata for an uploaded image or video, read with the Admin API. */
export async function fetchResource(publicId: string, resourceType: "image" | "video" = "image"): Promise<CloudinaryResource> {
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload/${publicId
    .split("/")
    .map(encodeURIComponent)
    .join("/")}${resourceType === "video" ? "?media_metadata=true" : ""}`; // video duration is only returned with media_metadata
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Cloudinary lookup failed (${res.status})`);
  return res.json();
}
