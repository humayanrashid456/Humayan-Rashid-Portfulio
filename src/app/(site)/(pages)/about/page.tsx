import type { Metadata } from "next";
import About from "@/components/sections/About";
import { getHomeContent, getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, how I work and what I can build for your business.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [settings, home] = await Promise.all([getSiteSettings(), getHomeContent()]);
  return <About content={home.about} phone={settings.contact.phone} />;
}
