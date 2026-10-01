import type { Metadata } from "next";
import Benefits from "@/components/sections/Benefits";
import { getHomeContent } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Benefits",
  description: "Why clients choose to work with me, and what you get from every engagement.",
  alternates: { canonical: "/benefits" },
};

export default async function BenefitsPage() {
  const home = await getHomeContent();
  return <Benefits content={home.benefits} />;
}
