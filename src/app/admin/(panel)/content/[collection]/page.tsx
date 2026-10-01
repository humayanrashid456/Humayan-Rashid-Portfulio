import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import AdminSkeleton from "@/components/admin/AdminSkeleton";
import PageHeader from "@/components/admin/PageHeader";
import { primaryButton } from "@/components/admin/form/styles";
import { COLLECTIONS, isCollection } from "@/lib/admin/collection-names";
import { listContent } from "@/lib/admin/queries";

export const metadata: Metadata = { title: "Content" };

type Params = PageProps<"/admin/content/[collection]">["params"];

async function ContentList({ params }: { params: Params }) {
  const { collection } = await params;
  if (!isCollection(collection)) notFound();
  const meta = COLLECTIONS[collection];
  const rows = await listContent(collection);

  return (
    <>
      <PageHeader
        title={meta.label}
        description="Only published items appear on the website."
        actions={
          <Link href={`/admin/content/${collection}/new`} className={primaryButton}>
            <Plus size={16} /> New {meta.singular.toLowerCase()}
          </Link>
        }
      />

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/15 p-10 text-center text-sm text-zinc-400">
          Nothing here yet. Create the first {meta.singular.toLowerCase()}.
        </p>
      ) : (
        <ul className="divide-y divide-white/5 rounded-xl border border-white/10 bg-[#0a2219]">
          {rows.map((row) => (
            <li key={row.id}>
              <Link href={`/admin/content/${collection}/${row.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.03]">
                <span className="w-16 aspect-video rounded-md bg-[#05110b] overflow-hidden shrink-0">
                  {row.thumb && (
                    // eslint-disable-next-line @next/next/no-img-element -- small admin thumbnail
                    <img src={row.thumb} alt="" className="w-full h-full object-cover" />
                  )}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold text-white truncate">{row.title}</span>
                  <span className="block text-xs text-zinc-400 truncate">
                    {meta.publicPath}/{row.slug}
                  </span>
                </span>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                    row.status === "published" ? "bg-[#cbf341]/15 text-[#cbf341]" : "bg-white/5 text-zinc-400"
                  }`}
                >
                  {row.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function ContentListPage({ params }: PageProps<"/admin/content/[collection]">) {
  return (
    <Suspense fallback={<AdminSkeleton rows={4} />}>
      <ContentList params={params} />
    </Suspense>
  );
}
