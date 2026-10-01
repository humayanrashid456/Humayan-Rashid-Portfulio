import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SiteBackground from "@/components/layout/SiteBackground";
import { getSiteSettings } from "@/lib/data/settings";

/** Shared chrome for the homepage and every detail page. */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-[#061910] text-[#fafafa] font-sans relative overflow-x-hidden gradient-primary">
      <SiteBackground />
      <Navbar logoTitle={settings.brand.logoTitle || settings.brand.name} logoSubtitle={settings.brand.logoSubtitle} />
      <main className="relative z-10">{children}</main>
      <div className="relative z-10">
        <Footer settings={settings} />
      </div>
    </div>
  );
}
