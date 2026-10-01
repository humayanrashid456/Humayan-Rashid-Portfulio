import type { Metadata } from "next";
import PortfolioProjects from "@/components/sections/PortfolioProjects";
import { getProjects } from "@/lib/data/content";
import { getHomeContent } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Recent projects and case studies.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [projects, home] = await Promise.all([getProjects(), getHomeContent()]);
  return <PortfolioProjects heading={home.portfolio} data={projects} />;
}
