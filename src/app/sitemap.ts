import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/data/content";
import { SITE_URL } from "@/lib/site";

const STATIC_PATHS = [
  "/",
  "/about",
  "/process",
  "/benefits",
  "/services",
  "/projects",
  "/blog",
  "/videos",
  "/contact",
  "/abroad",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();
  return [
    ...STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...entries.map((entry) => ({ url: `${SITE_URL}${entry.path}`, lastModified: entry.lastModified })),
  ];
}
