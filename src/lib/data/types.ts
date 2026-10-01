/**
 * Plain, serializable shapes returned by the data layer. They are safe to cache
 * and to pass from Server Components into Client Components.
 */

export interface ImageData {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ServiceData {
  slug: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
  image?: ImageData;
  seo?: { title?: string; description?: string };
}

export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  body: string;
  category: string;
  technologies: string[];
  coverImage: ImageData;
  liveUrl?: string;
  repoUrl?: string;
  seo?: { title?: string; description?: string };
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: ImageData;
  readingMinutes: number;
  publishedAt: string | null; // ISO date
  updatedAt: string; // ISO date
}

export interface BlogPostData extends BlogPostSummary {
  body: string;
  seo?: { title?: string; description?: string };
}

export type VideoCategory = "tutorials" | "vlogs" | "reviews";

export interface VideoFileData {
  url: string;
  publicId: string;
  durationSeconds?: number;
  width?: number;
  height?: number;
}

export interface VideoData {
  slug: string;
  title: string;
  description: string;
  source: "youtube" | "upload";
  /** Empty for uploaded videos. */
  youtubeId: string;
  /** Set for uploaded videos. */
  videoFile?: VideoFileData;
  /** For structured data (VideoObject.uploadDate). */
  createdAt: string;
  duration: string;
  views: string;
  category: VideoCategory;
  thumbnail?: ImageData;
}

export interface SiteSettingsData {
  brand: { name: string; logoTitle: string; logoSubtitle: string };
  hero: { introVideo: string };
  contact: { email: string; phone: string; whatsapp: string; address: string; timezone: string };
  social: {
    linkedin: string;
    x: string;
    instagram: string;
    pinterest: string;
    tiktok: string;
    youtube: string;
    github: string;
  };
  footer: { copyrightText: string };
  seo: { title: string; description: string; ogImage?: ImageData };
}

export interface SitemapEntry {
  path: string;
  lastModified: string;
}
