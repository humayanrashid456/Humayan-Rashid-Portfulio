import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AdminSkeleton from "@/components/admin/AdminSkeleton";
import PageHeader from "@/components/admin/PageHeader";
import SchemaForm from "@/components/admin/form/SchemaForm";
import { saveHomeSection } from "@/lib/actions/admin/home";
import { HOME_FORMS } from "@/lib/admin/form-configs";
import { getAdminHomeSection } from "@/lib/admin/queries";
import { HOME_SECTION_KEYS, type HomeSectionKey } from "@/lib/content/home";

export const metadata: Metadata = { title: "Edit homepage section" };

type Params = PageProps<"/admin/home/[section]">["params"];

const isSection = (value: string): value is HomeSectionKey => (HOME_SECTION_KEYS as string[]).includes(value);

async function SectionEditor({ params }: { params: Params }) {
  const { section } = await params;
  if (!isSection(section)) notFound();

  const form = HOME_FORMS[section];
  const value = await getAdminHomeSection(section);

  return (
    <>
      <PageHeader title={form.title} description={form.description} backHref="/admin/home" />
      <SchemaForm fields={form.fields} initialValue={value} onSave={saveHomeSection.bind(null, section)} />
    </>
  );
}

export default function HomeSectionPage({ params }: PageProps<"/admin/home/[section]">) {
  return (
    <Suspense fallback={<AdminSkeleton rows={5} />}>
      <SectionEditor params={params} />
    </Suspense>
  );
}
