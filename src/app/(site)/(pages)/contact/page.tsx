import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import { getHomeContent, getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to discuss your project or book a free strategy call.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const [settings, home] = await Promise.all([getSiteSettings(), getHomeContent()]);
  return <Contact content={home.contact} contact={settings.contact} />;
}
