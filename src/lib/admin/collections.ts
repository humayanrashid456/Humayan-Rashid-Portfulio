import "server-only";
import type mongoose from "mongoose";
import { CACHE_TAGS } from "@/lib/data/cache-tags";
import { BlogPost, Project, Service, Video } from "@/lib/db/models";
import type { Collection } from "./collection-names";

/**
 * The four content collections differ only in fields, so the admin treats them
 * through one loose model type; each write is validated by its Zod schema first.
 */
type LooseModel = mongoose.Model<Record<string, unknown>>;

export const COLLECTION_MODELS: Record<Collection, LooseModel> = {
  services: Service as unknown as LooseModel,
  projects: Project as unknown as LooseModel,
  blog: BlogPost as unknown as LooseModel,
  videos: Video as unknown as LooseModel,
};

export const COLLECTION_TAGS: Record<Collection, { list: string; item: (slug: string) => string }> = {
  services: { list: CACHE_TAGS.services, item: CACHE_TAGS.service },
  projects: { list: CACHE_TAGS.projects, item: CACHE_TAGS.project },
  blog: { list: CACHE_TAGS.blog, item: CACHE_TAGS.blogPost },
  videos: { list: CACHE_TAGS.videos, item: CACHE_TAGS.video },
};
