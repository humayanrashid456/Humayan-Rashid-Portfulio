import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import AdminSkeleton from "@/components/admin/AdminSkeleton";
import PageHeader from "@/components/admin/PageHeader";
import { COLLECTIONS, COLLECTION_NAMES } from "@/lib/admin/collection-names";
import { getDashboardStats } from "@/lib/admin/queries";
import { verifySession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Dashboard" };

async function Welcome() {
  const user = await verifySession();
  return <>Welcome, {user.name}</>;
}

async function Stats() {
  const stats = await getDashboardStats();
  return (
    <>
      <Link
        href="/admin/inbox"
        className="flex items-center justify-between rounded-2xl border border-[#cbf341]/30 bg-[#cbf341]/5 p-5 mb-6 hover:bg-[#cbf341]/10"
      >
        <div>
          <p className="text-3xl font-black text-white">{stats.newInquiries}</p>
          <p className="text-sm text-zinc-300">new {stats.newInquiries === 1 ? "inquiry" : "inquiries"} in the inbox</p>
        </div>
        <ArrowRight className="text-[#cbf341]" />
      </Link>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {COLLECTION_NAMES.map((name) => (
          <Link key={name} href={`/admin/content/${name}`} className="rounded-2xl border border-white/10 bg-[#0a2219] p-4 hover:border-white/25">
            <p className="text-sm font-semibold text-white">{COLLECTIONS[name].label}</p>
            <p className="text-2xl font-black text-white mt-2">{stats[name].published}</p>
            <p className="text-xs text-zinc-400">published · {stats[name].drafts} draft</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title={
          <Suspense fallback="Dashboard">
            <Welcome />
          </Suspense>
        }
        description="Everything on the website is edited from here. Changes go live as soon as you save."
      />

      <Suspense fallback={<AdminSkeleton rows={2} />}>
        <Stats />
      </Suspense>

      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        <Link href="/admin/home" className="rounded-2xl border border-white/10 p-5 hover:border-white/25">
          <p className="font-semibold text-white">Homepage sections</p>
          <p className="text-sm text-zinc-400 mt-1">Hero, about, process, benefits, study abroad, contact and section headings.</p>
        </Link>
        <Link href="/admin/settings" className="rounded-2xl border border-white/10 p-5 hover:border-white/25">
          <p className="font-semibold text-white">Site settings</p>
          <p className="text-sm text-zinc-400 mt-1">Brand, contact details, social links, footer and SEO defaults.</p>
        </Link>
      </div>
    </>
  );
}
