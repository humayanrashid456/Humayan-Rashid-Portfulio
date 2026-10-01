"use server";

import { refresh, updateTag } from "next/cache";
import { z } from "zod";
import { syncMedia } from "@/lib/admin/media-sync";
import { verifySession } from "@/lib/auth/session";
import { HOME_SCHEMAS, HOME_SECTION_KEYS, type HomeSectionKey } from "@/lib/content/home";
import { CACHE_TAGS } from "@/lib/data/cache-tags";
import { connectDB } from "@/lib/db/connect";
import { SITE_SETTINGS_ID, SiteSettings } from "@/lib/db/models";
import { issuesByPath, siteSettingsInput, type SaveResult } from "@/lib/validation/content";

const GENERIC_ERROR = "Couldn't save. Please try again.";

export async function saveHomeSection(section: HomeSectionKey, input: unknown): Promise<SaveResult> {
  await verifySession();
  const key = z.enum(HOME_SECTION_KEYS as [HomeSectionKey, ...HomeSectionKey[]]).parse(section);
  const parsed = HOME_SCHEMAS[key].safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please fix the highlighted fields.", issues: issuesByPath(parsed.error) };

  try {
    await connectDB();
    const before = await SiteSettings.findById(SITE_SETTINGS_ID).select(`home.${key}`).lean();
    await SiteSettings.updateOne(
      { _id: SITE_SETTINGS_ID },
      { $set: { [`home.${key}`]: parsed.data } },
      { upsert: true }
    );
    await syncMedia((before?.home as Record<string, unknown> | undefined)?.[key], parsed.data);
    updateTag(CACHE_TAGS.settings);
    refresh();
    return { ok: true };
  } catch (error) {
    console.error("[saveHomeSection] failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function saveSiteSettings(input: unknown): Promise<SaveResult> {
  await verifySession();
  const parsed = siteSettingsInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please fix the highlighted fields.", issues: issuesByPath(parsed.error) };
  const { brand, contact, social, footer, seo } = parsed.data;

  try {
    await connectDB();
    const before = await SiteSettings.findById(SITE_SETTINGS_ID).select("seo.ogImage").lean();
    await SiteSettings.updateOne(
      { _id: SITE_SETTINGS_ID },
      {
        $set: {
          brand,
          contact,
          social,
          footer,
          "seo.title": seo.title,
          "seo.description": seo.description,
          ...(seo.ogImage ? { "seo.ogImage": seo.ogImage } : {}),
        },
        ...(seo.ogImage ? {} : { $unset: { "seo.ogImage": "" } }),
      },
      { upsert: true }
    );
    await syncMedia(before?.seo?.ogImage, seo.ogImage);
    updateTag(CACHE_TAGS.settings);
    refresh();
    return { ok: true };
  } catch (error) {
    console.error("[saveSiteSettings] failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}
