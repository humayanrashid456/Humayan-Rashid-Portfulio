import "server-only";
import mongoose from "mongoose";
import { verifySession } from "@/lib/auth/session";
import { parseHomeSection, type HomeContent, type HomeSectionKey } from "@/lib/content/home";
import { connectDB } from "@/lib/db/connect";
import { Inquiry, INQUIRY_STATUSES, INQUIRY_TYPES, SITE_SETTINGS_ID, SiteSettings } from "@/lib/db/models";
import type { Collection } from "./collection-names";
import { uploadedVideoPoster } from "@/lib/video";
import { COLLECTION_MODELS } from "./collections";

/**
 * Admin reads: uncached and straight from MongoDB, so the editor always shows what
 * is stored. Each one verifies the session itself, like the actions do.
 */

type Json = Record<string, unknown>;
const toJson = (doc: unknown): Json => JSON.parse(JSON.stringify(doc));
const SYSTEM_FIELDS = ["_id", "__v", "createdAt", "updatedAt", "readingMinutes", "publishedAt"];
const emptySeo = { title: "", description: "" };

export async function getAdminHomeSection<K extends HomeSectionKey>(key: K): Promise<HomeContent[K]> {
  await verifySession();
  await connectDB();
  const doc = await SiteSettings.findById(SITE_SETTINGS_ID).select("home hero").lean();
  const stored = (doc?.home as Json | undefined)?.[key];
  const value = parseHomeSection(key, stored);
  if (key === "hero" && stored === undefined && doc?.hero?.introVideo) {
    return { ...value, introVideo: doc.hero.introVideo } as HomeContent[K];
  }
  return value;
}

export async function getAdminSettings(): Promise<Json> {
  await verifySession();
  await connectDB();
  const doc = toJson((await SiteSettings.findById(SITE_SETTINGS_ID).lean()) ?? {});
  const pick = (group: string, keys: string[]) =>
    Object.fromEntries(keys.map((k) => [k, ((doc[group] as Json | undefined)?.[k] as string | undefined) ?? ""]));
  return {
    brand: pick("brand", ["name", "logoTitle", "logoSubtitle"]),
    contact: pick("contact", ["email", "phone", "whatsapp", "address", "timezone"]),
    social: pick("social", ["linkedin", "x", "instagram", "pinterest", "tiktok", "youtube", "github"]),
    footer: pick("footer", ["copyrightText"]),
    seo: { ...pick("seo", ["title", "description"]), ogImage: (doc.seo as Json | undefined)?.ogImage ?? null },
  };
}

export interface ContentRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  order?: number;
  thumb?: string;
  updatedAt: string;
}

export async function listContent(collection: Collection): Promise<ContentRow[]> {
  await verifySession();
  await connectDB();
  const sort: Record<string, 1 | -1> = collection === "blog" ? { createdAt: -1 } : { order: 1, createdAt: -1 };
  const docs = await COLLECTION_MODELS[collection]
    .find({})
    .select("title slug status order image coverImage thumbnail source youtubeId videoFile updatedAt")
    .sort(sort)
    .lean();

  return docs.map((d) => {
    const image = (d.image ?? d.coverImage ?? d.thumbnail) as { url?: string } | undefined;
    return {
      id: String(d._id),
      title: String(d.title),
      slug: String(d.slug),
      status: String(d.status),
      order: typeof d.order === "number" ? d.order : undefined,
      thumb:
        image?.url ??
        (d.source === "upload" && d.videoFile
          ? uploadedVideoPoster((d.videoFile as { url: string }).url)
          : d.youtubeId
            ? `https://i.ytimg.com/vi/${d.youtubeId}/default.jpg`
            : undefined),
      updatedAt: new Date(d.updatedAt as Date).toISOString(),
    };
  });
}

const NEW_ITEM: Record<Collection, Json> = {
  services: {
    status: "draft",
    title: "",
    slug: "",
    description: "",
    iconName: "Code",
    deliverables: [],
    image: null,
    order: 0,
    seo: emptySeo,
  },
  projects: {
    status: "draft",
    title: "",
    slug: "",
    description: "",
    category: "",
    technologies: [],
    coverImage: null,
    liveUrl: "",
    repoUrl: "",
    body: "",
    order: 0,
    seo: emptySeo,
  },
  blog: { status: "draft", title: "", slug: "", excerpt: "", category: "", tags: [], coverImage: null, body: "", seo: emptySeo },
  videos: {
    status: "draft",
    title: "",
    slug: "",
    source: "youtube",
    youtubeId: "",
    videoFile: null,
    category: "tutorials",
    description: "",
    duration: "",
    views: "",
    thumbnail: null,
    order: 0,
  },
};

/** The editor value for an item, or the blank template for id "new". Null when not found. */
export async function getContentFormValue(collection: Collection, id: string): Promise<Json | null> {
  await verifySession();
  const blank = NEW_ITEM[collection];
  if (id === "new") return blank;
  if (!mongoose.isValidObjectId(id)) return null;

  await connectDB();
  const doc = await COLLECTION_MODELS[collection].findById(id).lean();
  if (!doc) return null;
  const json = toJson(doc);
  for (const field of SYSTEM_FIELDS) delete json[field];
  // Fill fields the stored document lacks, so every input is controlled.
  return { ...blank, ...json, seo: { ...emptySeo, ...(json.seo as Json | undefined) } };
}

export interface InquiryRow {
  id: string;
  type: string;
  status: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  details: Json;
  createdAt: string;
}

export async function listInquiries(filter: { type?: string; status?: string }): Promise<InquiryRow[]> {
  await verifySession();
  await connectDB();
  const query: Json = {};
  if (filter.type && (INQUIRY_TYPES as readonly string[]).includes(filter.type)) query.type = filter.type;
  if (filter.status && (INQUIRY_STATUSES as readonly string[]).includes(filter.status)) query.status = filter.status;
  else query.status = mongoose.trusted({ $ne: "archived" });

  const docs = await Inquiry.find(query).sort({ createdAt: -1 }).limit(200).lean();
  return docs.map((d) => ({
    id: String(d._id),
    type: d.type,
    status: d.status,
    name: d.name,
    email: d.email,
    phone: d.phone ?? undefined,
    message: d.message ?? undefined,
    details: toJson(d.details ?? {}),
    createdAt: new Date(d.createdAt).toISOString(),
  }));
}

export async function getDashboardStats() {
  await verifySession();
  await connectDB();
  const counts = async (collection: Collection) => {
    const model = COLLECTION_MODELS[collection];
    const [published, drafts] = await Promise.all([
      model.countDocuments({ status: "published" }),
      model.countDocuments({ status: "draft" }),
    ]);
    return { published, drafts };
  };
  const [services, projects, blog, videos, newInquiries] = await Promise.all([
    counts("services"),
    counts("projects"),
    counts("blog"),
    counts("videos"),
    Inquiry.countDocuments({ status: "new" }),
  ]);
  return { services, projects, blog, videos, newInquiries };
}
