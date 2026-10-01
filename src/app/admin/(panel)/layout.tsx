import type { ReactNode } from "react";
import AdminNav from "@/components/admin/AdminNav";

/**
 * Static shell: no session or database reads here, so it renders instantly on
 * every navigation. Authorization happens in each page and Server Action via
 * `verifySession()` (pages stream in behind loading.tsx), with the proxy as an
 * early redirect for visitors without a session cookie.
 */
export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:flex min-h-screen">
      <AdminNav />
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
        <div className="max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
