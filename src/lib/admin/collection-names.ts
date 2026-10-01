/** Content collections editable in the admin, with their display names and public URL prefix. */
export const COLLECTIONS = {
  services: { label: "Services", singular: "Service", publicPath: "/services" },
  projects: { label: "Projects", singular: "Project", publicPath: "/projects" },
  blog: { label: "Blog posts", singular: "Blog post", publicPath: "/blog" },
  videos: { label: "Videos", singular: "Video", publicPath: "/videos" },
} as const;

export type Collection = keyof typeof COLLECTIONS;
export const COLLECTION_NAMES = Object.keys(COLLECTIONS) as Collection[];

export const isCollection = (value: string): value is Collection => value in COLLECTIONS;
