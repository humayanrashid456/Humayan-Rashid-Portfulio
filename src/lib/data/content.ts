import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { connectDB } from "@/lib/db/connect";
import { BlogPost, Project, Service, Video } from "@/lib/db/models";
import { siteImage } from "@/lib/images";
import { CACHE_TAGS } from "./cache-tags";
import { toImage, toIso, toSeo } from "./mappers";
import type {
  BlogPostData,
  BlogPostSummary,
  ImageData,
  ProjectData,
  ServiceData,
  SitemapEntry,
  VideoData,
} from "./types";

const PUBLISHED = { status: "published" } as const;
const MISSING_IMAGE: ImageData = { url: siteImage("case-study-team.jpg"), alt: "" };

// ── Services ─────────────────────────────────────────────────────────────────

type RawService = Awaited<ReturnType<typeof findServices>>[number];
const findServices = () => Service.find(PUBLISHED).sort({ order: 1, createdAt: 1 }).lean();

function mapService(doc: RawService): ServiceData {
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    iconName: doc.iconName,
    deliverables: doc.deliverables ?? [],
    image: toImage(doc.image, doc.title),
    seo: toSeo(doc.seo),
  };
}

export async function getServices(): Promise<ServiceData[]> {
  "use cache";
  cacheTag(CACHE_TAGS.services);
  cacheLife("max");

  await connectDB();
  return (await findServices()).map(mapService);
}

// ── Projects ─────────────────────────────────────────────────────────────────

type RawProject = Awaited<ReturnType<typeof findProjects>>[number];
const findProjects = () => Project.find(PUBLISHED).sort({ order: 1, createdAt: -1 }).lean();

function mapProject(doc: RawProject): ProjectData {
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    body: doc.body ?? "",
    category: doc.category,
    technologies: doc.technologies ?? [],
    coverImage: toImage(doc.coverImage, doc.title) ?? MISSING_IMAGE,
    ...(doc.liveUrl ? { liveUrl: doc.liveUrl } : {}),
    ...(doc.repoUrl ? { repoUrl: doc.repoUrl } : {}),
    seo: toSeo(doc.seo),
  };
}

export async function getProjects(): Promise<ProjectData[]> {
  "use cache";
  cacheTag(CACHE_TAGS.projects);
  cacheLife("max");

  await connectDB();
  return (await findProjects()).map(mapProject);
}

// ── Blog ─────────────────────────────────────────────────────────────────────

const BLOG_SUMMARY_FIELDS = "slug title excerpt category tags coverImage readingMinutes publishedAt updatedAt";

type RawBlogSummary = Awaited<ReturnType<typeof findBlogSummaries>>[number];
const findBlogSummaries = () =>
  BlogPost.find(PUBLISHED).select(BLOG_SUMMARY_FIELDS).sort({ publishedAt: -1 }).lean();

function mapBlogSummary(doc: RawBlogSummary): BlogPostSummary {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    tags: doc.tags ?? [],
    coverImage: toImage(doc.coverImage, doc.title) ?? MISSING_IMAGE,
    readingMinutes: doc.readingMinutes ?? 1,
    publishedAt: toIso(doc.publishedAt),
    updatedAt: toIso(doc.updatedAt) ?? new Date(0).toISOString(),
  };
}

/** Listing data only: the Markdown body is excluded from the query. */
export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  "use cache";
  cacheTag(CACHE_TAGS.blog);
  cacheLife("max");

  await connectDB();
  return (await findBlogSummaries()).map(mapBlogSummary);
}

export async function getBlogPost(slug: string): Promise<BlogPostData | null> {
  "use cache";
  cacheTag(CACHE_TAGS.blog, CACHE_TAGS.blogPost(slug));
  cacheLife("max");

  await connectDB();
  const doc = await BlogPost.findOne({ ...PUBLISHED, slug }).lean();
  if (!doc) return null;
  return { ...mapBlogSummary(doc), body: doc.body, seo: toSeo(doc.seo) };
}

// ── Videos ───────────────────────────────────────────────────────────────────

type RawVideo = Awaited<ReturnType<typeof findVideos>>[number];
const findVideos = () => Video.find(PUBLISHED).sort({ order: 1, createdAt: -1 }).lean();

function mapVideo(doc: RawVideo): VideoData {
  const file = doc.source === "upload" ? doc.videoFile : undefined;
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description ?? "",
    source: file ? "upload" : "youtube",
    youtubeId: doc.youtubeId ?? "",
    ...(file
      ? {
          videoFile: {
            url: file.url,
            publicId: file.publicId,
            ...(file.durationSeconds ? { durationSeconds: file.durationSeconds } : {}),
            ...(file.width ? { width: file.width } : {}),
            ...(file.height ? { height: file.height } : {}),
          },
        }
      : {}),
    createdAt: toIso(doc.createdAt) ?? new Date(0).toISOString(),
    duration: doc.duration ?? "",
    views: doc.views ?? "",
    category: doc.category,
    thumbnail: toImage(doc.thumbnail, doc.title),
  };
}

export async function getVideos(): Promise<VideoData[]> {
  "use cache";
  cacheTag(CACHE_TAGS.videos);
  cacheLife("max");

  await connectDB();
  return (await findVideos()).map(mapVideo);
}

// ── Sitemap ──────────────────────────────────────────────────────────────────

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  "use cache";
  cacheTag(CACHE_TAGS.services, CACHE_TAGS.projects, CACHE_TAGS.blog, CACHE_TAGS.videos);
  cacheLife("max");

  await connectDB();
  const fields = "slug updatedAt";
  const [services, projects, posts, videos] = await Promise.all([
    Service.find(PUBLISHED).select(fields).lean(),
    Project.find(PUBLISHED).select(fields).lean(),
    BlogPost.find(PUBLISHED).select(fields).lean(),
    Video.find(PUBLISHED).select(fields).lean(),
  ]);

  const entries = (prefix: string, docs: { slug: string; updatedAt?: Date | null }[]) =>
    docs.map((d) => ({
      path: `${prefix}/${d.slug}`,
      lastModified: toIso(d.updatedAt) ?? new Date(0).toISOString(),
    }));

  return [
    ...entries("/services", services),
    ...entries("/projects", projects),
    ...entries("/blog", posts),
    ...entries("/videos", videos),
  ];
}
