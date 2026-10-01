"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Briefcase, ExternalLink, Home, Inbox, LayoutDashboard, LogOut, Settings, UserCog, Video, Wrench } from "lucide-react";
import { logout } from "@/lib/actions/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/home", label: "Homepage", icon: Home },
  { href: "/admin/content/services", label: "Services", icon: Wrench },
  { href: "/admin/content/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/content/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/content/videos", label: "Videos", icon: Video },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
  { href: "/admin/settings", label: "Site settings", icon: Settings },
  { href: "/admin/account", label: "Account", icon: UserCog },
];

export default function AdminNav() {
  return (
    <aside className="lg:w-60 lg:shrink-0 lg:min-h-screen border-b lg:border-b-0 lg:border-r border-white/10 bg-[#05110b] lg:sticky lg:top-0 lg:h-screen flex flex-col">
      <div className="px-4 lg:px-5 py-4">
        <Link href="/admin" className="font-display font-black text-white">
          Admin
        </Link>
      </div>

      {/* The current path is request data, so the highlight streams in; links render at once. */}
      <Suspense fallback={<NavLinks pathname={null} />}>
        <ActiveNavLinks />
      </Suspense>

      <div className="flex lg:flex-col gap-1 px-3 pb-3 lg:p-3 lg:border-t border-white/10">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white">
          <ExternalLink size={16} /> View website
        </a>
        <form action={logout}>
          <button type="submit" className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-red-300">
            <LogOut size={16} /> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

function ActiveNavLinks() {
  return <NavLinks pathname={usePathname()} />;
}

function NavLinks({ pathname }: { pathname: string | null }) {
  const isActive = (href: string, exact?: boolean) =>
    pathname !== null && (exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <nav aria-label="Admin" className="flex lg:flex-col gap-1 overflow-x-auto px-3 pb-3 lg:pb-0 lg:flex-1">
      {NAV.map(({ href, label, icon: Icon, exact }) => {
        const active = isActive(href, exact);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              active ? "bg-[#cbf341]/15 text-[#cbf341] font-semibold" : "text-zinc-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
