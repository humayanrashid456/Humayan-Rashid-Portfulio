"use client";

import { useEffect, useRef, useState } from "react";
import { Film, Loader2, Trash2, Upload, X } from "lucide-react";
import { getUploadSignature, registerVideoUpload } from "@/lib/actions/admin/media";
import { uploadToCloudinary } from "@/lib/admin/cloudinary-upload";
import type { UploadKind } from "@/lib/admin/upload-kinds";
import type { VideoFileInput } from "@/lib/validation/content";
import { formatDuration, uploadedVideoPoster, uploadedVideoSrc } from "@/lib/video";
import { dangerButton, errorClass, helpClass, primaryButton, secondaryButton } from "./styles";

/** Cloudinary's per-video limit on the free plan. Raise it if the plan allows larger files. */
export const MAX_VIDEO_MB = 100;
const ACCEPT = ["video/mp4", "video/quicktime", "video/webm", "video/x-m4v"];

interface VideoFieldProps {
  id: string;
  value: VideoFileInput | null | undefined;
  onChange: (value: VideoFileInput | null) => void;
  kind: UploadKind;
  describedBy?: string;
}

export default function VideoField({ id, value, onChange, kind, describedBy }: VideoFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [stage, setStage] = useState<"uploading" | "processing">("uploading");
  const [error, setError] = useState("");
  const busy = progress !== null;

  // Leaving mid-upload would lose it; ask first.
  useEffect(() => {
    if (!busy) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [busy]);

  async function upload(file: File) {
    setError("");
    if (!ACCEPT.includes(file.type)) return setError("Use an MP4, MOV or WebM video.");
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      return setError(`The video is ${(file.size / 1024 / 1024).toFixed(0)} MB; the limit is ${MAX_VIDEO_MB} MB. Compress it, or upload it to YouTube and use the link.`);
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setStage("uploading");
    setProgress(0);
    try {
      const sig = await getUploadSignature(kind, "video");
      const res = await uploadToCloudinary(file, sig, { onProgress: setProgress, signal: controller.signal });
      setStage("processing");
      onChange(await registerVideoUpload({ publicId: res.public_id, version: res.version, signature: res.signature }));
    } catch (e) {
      if ((e as Error).name !== "AbortError") setError((e as Error).message || "Upload failed. Please try again.");
    } finally {
      setProgress(null);
      abortRef.current = null;
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const pct = Math.round((progress ?? 0) * 100);

  return (
    <div className="space-y-3">
      {value?.url && !busy && (
        <div className="rounded-xl overflow-hidden border border-zinc-600 bg-black max-w-xl">
          <video
            key={value.url}
            src={uploadedVideoSrc(value.url)}
            poster={uploadedVideoPoster(value.url)}
            controls
            preload="metadata"
            playsInline
            className="w-full aspect-video"
          />
          <p className="px-3 py-2 text-xs text-zinc-300 bg-[#05110b] flex flex-wrap gap-x-4 gap-y-1">
            {value.durationSeconds !== undefined && <span>Length {formatDuration(value.durationSeconds)}</span>}
            {value.width && value.height && (
              <span>
                {value.width}×{value.height}
              </span>
            )}
            {value.bytes !== undefined && <span>{(value.bytes / 1024 / 1024).toFixed(1)} MB</span>}
          </p>
        </div>
      )}

      {busy ? (
        <div className="max-w-xl space-y-2" aria-live="polite">
          <div className="flex items-center justify-between text-xs text-zinc-200">
            <span className="inline-flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" />
              {stage === "uploading" ? `Uploading… ${pct}%` : "Checking the upload…"}
            </span>
            {stage === "uploading" && (
              <button type="button" onClick={() => abortRef.current?.abort()} className={`${secondaryButton} !py-1 !px-2 !text-xs`}>
                <X size={12} /> Cancel
              </button>
            )}
          </div>
          <div
            role="progressbar"
            aria-label="Video upload progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            className="h-2 rounded-full bg-zinc-700 overflow-hidden"
          >
            <div className="h-full bg-[#cbf341] transition-[width] duration-200" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <button
            id={id}
            type="button"
            aria-describedby={describedBy}
            onClick={() => inputRef.current?.click()}
            className={primaryButton}
          >
            {value?.url ? <Film size={16} /> : <Upload size={16} />}
            {value?.url ? "Replace video" : "Choose video from computer"}
          </button>
          {value?.url && (
            <button type="button" onClick={() => onChange(null)} className={dangerButton}>
              <Trash2 size={16} /> Remove
            </button>
          )}
        </div>
      )}

      {!busy && !value?.url && <p className={helpClass}>MP4, MOV or WebM, up to {MAX_VIDEO_MB} MB.</p>}
      {error && (
        <p role="alert" className={errorClass}>
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        className="hidden"
        tabIndex={-1}
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
      />
    </div>
  );
}
