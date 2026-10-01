"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import type { UploadKind } from "@/lib/admin/upload-kinds";
import { getUploadSignature, registerUpload } from "@/lib/actions/admin/media";
import { uploadToCloudinary } from "@/lib/admin/cloudinary-upload";
import type { ImageInput } from "@/lib/validation/common";
import { inputClass } from "./styles";

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = ["image/jpeg", "image/png", "image/webp", "image/avif"];

interface ImageFieldProps {
  value: ImageInput | null | undefined;
  onChange: (value: ImageInput | null) => void;
  kind: UploadKind;
  optional?: boolean;
}

/** Uploads straight from the browser to Cloudinary with a server-issued signature. */
export default function ImageField({ value, onChange, kind, optional }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setError("");
    if (!ACCEPT.includes(file.type)) return setError("Use a JPG, PNG, WebP or AVIF image.");
    if (file.size > MAX_BYTES) return setError("The image must be smaller than 10 MB.");

    setBusy(true);
    try {
      const sig = await getUploadSignature(kind, "image");
      const res = await uploadToCloudinary(file, sig);
      const image = await registerUpload({ publicId: res.public_id, version: res.version, signature: res.signature });
      onChange({ ...image, alt: value?.alt ?? "" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
        <div className="w-full sm:w-48 aspect-video rounded-xl border border-zinc-600 bg-[#05110b] overflow-hidden flex items-center justify-center shrink-0">
          {value?.url ? (
            // eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary uploads
            <img src={value.url} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-zinc-400">No image</span>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#cbf341] text-[#061910] text-xs font-bold disabled:opacity-60"
            >
              {busy ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
              {busy ? "Uploading…" : value?.url ? "Replace image" : "Upload image"}
            </button>
            {optional && value?.url && !busy && (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-500 text-xs text-zinc-200 hover:text-red-300 hover:border-red-400/60"
              >
                <Trash2 size={14} /> Remove
              </button>
            )}
          </div>
          {value?.url && (
            <input
              type="text"
              value={value.alt ?? ""}
              onChange={(e) => onChange({ ...value, alt: e.target.value })}
              placeholder="Describe the image (alt text, for accessibility and SEO)"
              className={inputClass}
              maxLength={200}
            />
          )}
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        className="hidden"
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
      />
    </div>
  );
}
