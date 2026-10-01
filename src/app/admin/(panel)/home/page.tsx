import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import AdminSkeleton from "@/components/admin/AdminSkeleton";
import PageHeader from "@/components/admin/PageHeader";
import { HOME_FORMS } from "@/lib/admin/form-configs";
import { getAdminHomeSection } from "@/lib/admin/queries";
import { HOME_SECTION_KEYS } from "@/lib/content/home";

export const metadata: Metadata = { title: "Homepage" };

async function SectionList() {
  const sections = await Promise.all(
    HOME_SECTION_KEYS.map(async (key) => ({ key, enabled: (await getAdminHomeSection(key)).enabled }))
  );

  return (
    <ol className="space-y-2">
      {sections.map(({ key, enabled }, i) => (
        <li key={key}>
          <Link
            href={`/admin/home/${key}`}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#0a2219] px-4 py-3.5 hover:border-white/25"
          >
            <span className="text-xs font-mono text-zinc-400 w-5">{i + 1}</span>
            <span className="flex-1 font-semibold text-white">{HOME_FORMS[key].title}</span>
            <span className={`inline-flex items-center gap-1.5 text-xs ${enabled ? "text-[#cbf341]" : "text-zinc-400"}`}>
              {enabled ? <Eye size={14} /> : <EyeOff size={14} />}
              {enabled ? "Visible" : "Hidden"}
            </span>
            <ChevronRight size={16} className="text-zinc-400" />
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default function HomeSectionsPage() {
  return (
    <>
      <PageHeader title="Homepage" description="Sections in the order they appear on the homepage. Each one can be edited or hidden." />
      <Suspense fallback={<AdminSkeleton rows={5} />}>
        <SectionList />
      </Suspense>
    </>
  );
}
