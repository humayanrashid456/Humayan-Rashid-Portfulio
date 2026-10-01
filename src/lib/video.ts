const YOUTUBE_URL = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

/** Accepts a YouTube URL or a bare 11-character id; returns the id or null. */
export function parseYouTubeId(urlOrId: string | null | undefined): string | null {
  if (!urlOrId) return null;
  const value = urlOrId.trim();
  if (YOUTUBE_ID.test(value)) return value;
  const id = value.match(YOUTUBE_URL)?.[1];
  return id && YOUTUBE_ID.test(id) ? id : null;
}

export const youtubeEmbedUrl = (id: string, autoplay = true) =>
  `https://www.youtube-nocookie.com/embed/${id}?${autoplay ? "autoplay=1&" : ""}rel=0&modestbranding=1&playsinline=1`;

export const youtubeThumbnailUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// ── Uploaded (Cloudinary) videos ─────────────────────────────────────────────

/**
 * Inserts a Cloudinary transformation after `/upload/` and swaps the extension.
 * `.../video/upload/v12/portfolio/videos/clip.mov` → `.../video/upload/<t>/v12/portfolio/videos/clip.<ext>`
 */
function cloudinaryVariant(originalUrl: string, transformation: string, extension: string): string {
  return originalUrl.replace("/upload/", `/upload/${transformation}/`).replace(/\.[a-z0-9]+$/i, `.${extension}`);
}

/**
 * Playback URL: H.264 MP4 (plays in every browser) with automatic quality, capped
 * at 1080p wide so a 4K upload doesn't stream 4K to phones.
 */
export const uploadedVideoSrc = (originalUrl: string) => cloudinaryVariant(originalUrl, "q_auto,vc_h264,w_1920,c_limit", "mp4");

/** Poster frame picked automatically by Cloudinary, as an optimised JPG. */
export const uploadedVideoPoster = (originalUrl: string) => cloudinaryVariant(originalUrl, "so_auto,q_auto,w_1280,c_limit", "jpg");

/** 125.4 → "2:05", 3725 → "1:02:05" */
export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

/** ISO 8601 duration for structured data: 125 → "PT2M5S" */
export function isoDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  return `PT${Math.floor(s / 3600) ? `${Math.floor(s / 3600)}H` : ""}${Math.floor((s % 3600) / 60)}M${s % 60}S`;
}

/** Parses "2:05" / "1:02:05" back to seconds; null when it isn't a duration. */
export function parseDuration(value: string): number | null {
  if (!/^\d+(:\d{1,2}){1,2}$/.test(value.trim())) return null;
  return value
    .trim()
    .split(":")
    .reduce((acc, part) => acc * 60 + Number(part), 0);
}

/** Minimal shape needed to render any video, whatever its source. */
export interface PlayableVideo {
  title: string;
  source: "youtube" | "upload";
  youtubeId: string;
  videoFile?: { url: string };
  thumbnail?: { url: string };
}

/** The card/poster image: custom thumbnail, else the source's own frame. */
export function videoThumbnail(video: PlayableVideo): string {
  if (video.thumbnail?.url) return video.thumbnail.url;
  if (video.source === "upload" && video.videoFile) return uploadedVideoPoster(video.videoFile.url);
  return youtubeThumbnailUrl(video.youtubeId);
}
