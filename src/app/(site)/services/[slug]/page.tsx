import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/detail/ServiceDetail";
import { getServices } from "@/lib/data/content";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = (await getServices()).find((s) => s.slug === slug);
  if (!service) return {};
  const title = service.seo?.title || service.title;
  const description = service.seo?.description || service.description;
  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title, description, ...(service.image ? { images: [service.image.url] } : {}) },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return <ServiceDetail service={service} related={services.filter((s) => s.slug !== slug).slice(0, 3)} />;
}
