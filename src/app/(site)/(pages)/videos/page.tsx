import type { Metadata } from "next";
import VideoShowcase from "@/components/sections/VideoShowcase";
import { getVideos } from "@/lib/data/content";
import { getHomeContent, getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Videos",
  description: "Tutorials, vlogs and reviews.",
  alternates: { canonical: "/videos" },
};

export default async function VideosPage() {
  const [videos, settings, home] = await Promise.all([getVideos(), getSiteSettings(), getHomeContent()]);
  return <VideoShowcase heading={home.videos} videos={videos} youtubeChannelUrl={settings.social.youtube} />;
}
