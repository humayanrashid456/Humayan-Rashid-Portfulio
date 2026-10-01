import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/detail/ProjectDetail";
import { getProjects } from "@/lib/data/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return {};
  const title = project.seo?.title || project.title;
  const description = project.seo?.description || project.description;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description, images: [project.coverImage.url] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectDetail project={project} related={projects.filter((p) => p.slug !== slug).slice(0, 3)} />;
}
