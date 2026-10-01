import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { connectDB } from "@/lib/db/connect";
import { HOME_SECTION_KEYS, parseHomeSection, type HomeContent, type HomeSectionKey } from "@/lib/content/home";
import { SITE_SETTINGS_ID, SiteSettings } from "@/lib/db/models";
import { siteImage } from "@/lib/images";
import { CACHE_TAGS } from "./cache-tags";
import { toImage } from "./mappers";
import type { SiteSettingsData } from "./types";

export async function getSiteSettings(): Promise<SiteSettingsData> {
  "use cache";
  cacheTag(CACHE_TAGS.settings);
  cacheLife("max");

  await connectDB();
  const doc = await SiteSettings.findById(SITE_SETTINGS_ID).lean();
  const name = doc?.brand?.name || "Humayan Rashid";

  return {
    brand: {
      name,
      logoTitle: doc?.brand?.logoTitle ?? "",
      logoSubtitle: doc?.brand?.logoSubtitle ?? "",
    },
    hero: { introVideo: doc?.hero?.introVideo ?? "" },
    contact: {
      email: doc?.contact?.email ?? "",
      phone: doc?.contact?.phone ?? "",
      whatsapp: doc?.contact?.whatsapp ?? "",
      address: doc?.contact?.address ?? "",
      timezone: doc?.contact?.timezone ?? "",
    },
    social: {
      linkedin: doc?.social?.linkedin ?? "",
      x: doc?.social?.x ?? "",
      instagram: doc?.social?.instagram ?? "",
      pinterest: doc?.social?.pinterest ?? "",
      tiktok: doc?.social?.tiktok ?? "",
      youtube: doc?.social?.youtube ?? "",
      github: doc?.social?.github ?? "",
    },
    footer: {
      // The year is fixed when this cache entry is created and refreshes whenever settings are saved.
      copyrightText:
        doc?.footer?.copyrightText || `© ${new Date().getFullYear()} ${name}. All rights reserved.`,
    },
    seo: {
      title: doc?.seo?.title ?? "",
      description: doc?.seo?.description ?? "",
      ogImage: toImage(doc?.seo?.ogImage, name),
    },
  };
}

/** Every homepage section's content; missing or invalid sections fall back to defaults. */
export async function getHomeContent(): Promise<HomeContent> {
  "use cache";
  cacheTag(CACHE_TAGS.settings);
  cacheLife("max");

  await connectDB();
  const doc = await SiteSettings.findById(SITE_SETTINGS_ID).select("home hero").lean();
  const stored = (doc?.home ?? {}) as Partial<Record<HomeSectionKey, unknown>>;

  const content = Object.fromEntries(
    HOME_SECTION_KEYS.map((key) => [key, parseHomeSection(key, stored[key])])
  ) as HomeContent;

  // The intro video used to live at `hero.introVideo`; keep honouring it until the hero is saved.
  if (stored.hero === undefined && doc?.hero?.introVideo) {
    content.hero = { ...content.hero, introVideo: doc.hero.introVideo };
  }
  return withSiteImages(content);
}

/** Points bundled `/images/...` references at their Cloudinary copies when enabled. */
function withSiteImages<T>(value: T): T {
  if (Array.isArray(value)) return value.map(withSiteImages) as T;
  if (value && typeof value === "object") {
    const entries = Object.entries(value).map(([k, v]) => {
      if (k === "url" && typeof v === "string" && v.startsWith("/images/")) return [k, siteImage(v.slice(8))];
      return [k, withSiteImages(v)];
    });
    return Object.fromEntries(entries) as T;
  }
  return value;
}
