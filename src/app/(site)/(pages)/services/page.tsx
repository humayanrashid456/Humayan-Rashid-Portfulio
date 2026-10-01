import type { Metadata } from "next";
import Services from "@/components/sections/Services";
import { getServices } from "@/lib/data/content";
import { getHomeContent } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design, SEO, advertising and automation services to grow your business.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const [services, home] = await Promise.all([getServices(), getHomeContent()]);
  return <Services heading={home.services} services={services} />;
}
