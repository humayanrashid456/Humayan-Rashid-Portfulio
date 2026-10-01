import type { ImageData } from "./types";

interface RawImage {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
}

export function toImage(raw: RawImage | null | undefined, fallbackAlt: string): ImageData | undefined {
  if (!raw?.url) return undefined;
  return {
    url: raw.url,
    alt: raw.alt || fallbackAlt,
    ...(raw.width ? { width: raw.width } : {}),
    ...(raw.height ? { height: raw.height } : {}),
  };
}

export function toSeo(raw: { title?: string | null; description?: string | null } | null | undefined) {
  if (!raw?.title && !raw?.description) return undefined;
  return {
    ...(raw.title ? { title: raw.title } : {}),
    ...(raw.description ? { description: raw.description } : {}),
  };
}

export const toIso = (date: Date | null | undefined) => (date ? new Date(date).toISOString() : null);
