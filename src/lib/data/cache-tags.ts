/**
 * Cache tags for every cached read. Any action that writes to a collection must
 * call `updateTag()` with the collection tag (and the item tag for single items),
 * which is the only invalidation path for these `cacheLife("max")` reads.
 */
export const CACHE_TAGS = {
  settings: "settings",
  services: "services",
  projects: "projects",
  blog: "blog",
  videos: "videos",
  service: (slug: string) => `service:${slug}`,
  project: (slug: string) => `project:${slug}`,
  blogPost: (slug: string) => `blog:${slug}`,
  video: (slug: string) => `video:${slug}`,
} as const;
