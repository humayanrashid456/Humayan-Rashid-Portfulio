import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Mail, Phone } from "lucide-react";
import AdminSkeleton from "@/components/admin/AdminSkeleton";
import InquiryActions from "@/components/admin/InquiryActions";
import PageHeader from "@/components/admin/PageHeader";
import { listInquiries } from "@/lib/admin/queries";

export const metadata: Metadata = { title: "Inbox" };

const TYPES = [
  { value: "", label: "All" },
  { value: "booking", label: "Bookings" },
  { value: "study_abroad", label: "Study abroad" },
];
const STATUSES = [
  { value: "", label: "Open" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "archived", label: "Archived" },
];

const LABELS: Record<string, string> = { booking: "Booking", study_abroad: "Study abroad" };

type SearchParams = PageProps<"/admin/inbox">["searchParams"];

export default function InboxPage({ searchParams }: PageProps<"/admin/inbox">) {
  return (
    <>
      <PageHeader title="Inbox" description="Booking requests and study-abroad leads from the website forms." />
      <Suspense fallback={<AdminSkeleton rows={4} />}>
        <Inbox searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Inbox({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : "";
  const status = typeof params.status === "string" ? params.status : "";
  const rows = await listInquiries({ type, status });

  const href = (next: { type?: string; status?: string }) => {
    const q = new URLSearchParams({ type: next.type ?? type, status: next.status ?? status });
    for (const [k, v] of [...q]) if (!v) q.delete(k);
    return `/admin/inbox${q.size ? `?${q}` : ""}`;
  };
  const pill = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-semibold ${active ? "bg-[#cbf341] text-[#061910]" : "bg-white/5 text-zinc-300 hover:bg-white/10"}`;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-2">
        {TYPES.map((t) => (
          <Link key={t.value} href={href({ type: t.value })} className={pill(type === t.value)}>
            {t.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map((s) => (
          <Link key={s.value} href={href({ status: s.value })} className={pill(status === s.value)}>
            {s.label}
          </Link>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/15 p-10 text-center text-sm text-zinc-400">No messages here.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className={`rounded-xl border p-4 sm:p-5 ${row.status === "new" ? "border-[#cbf341]/40 bg-[#cbf341]/5" : "border-white/10 bg-[#0a2219]"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-white">
                    {row.name}{" "}
                    <span className="ml-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">{LABELS[row.type] ?? row.type}</span>
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {new Date(row.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>
                <InquiryActions id={row.id} status={row.status} />
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-sm">
                <a href={`mailto:${row.email}`} className="inline-flex items-center gap-1.5 text-[#cbf341] hover:underline">
                  <Mail size={14} /> {row.email}
                </a>
                {row.phone && (
                  <a href={`tel:${row.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white">
                    <Phone size={14} /> {row.phone}
                  </a>
                )}
              </div>

              {Object.keys(row.details).length > 0 && (
                <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1 mt-3 text-sm">
                  {Object.entries(row.details).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="text-zinc-400 capitalize">{k.replace(/([A-Z])/g, " $1").toLowerCase()}:</dt>
                      <dd className="text-zinc-200">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {row.message && <p className="mt-3 text-sm text-zinc-300 whitespace-pre-line">{row.message}</p>}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
