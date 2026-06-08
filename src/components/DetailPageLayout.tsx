import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { loadCMSData } from "../lib/cmsState";

interface DetailPageLayoutProps {
  theme: "light" | "dark" | "stone";
  toggleTheme: () => void;
}

export default function DetailPageLayout({ theme, toggleTheme }: DetailPageLayoutProps) {
  const [cmsData] = useState(() => loadCMSData());
  const [glowMode, setGlowMode] = useState<"default" | "yellow" | "green">("default");

  // Sync active theme with document DOM root (keeps consistency with PortfolioHome / App)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "stone");
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "stone") {
      root.classList.add("stone");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#061910] dark:bg-[#061910] text-[#fafafa] font-sans transition-colors duration-300 relative overflow-x-hidden gradient-primary">
      {/* Soothing ambient background — mirrors the homepage for visual continuity */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25 leading-none transition-all duration-700 bg-[var(--color-primary-vibrant)]" />
        <div className="absolute top-[1200px] right-10 w-[450px] h-[450px] rounded-full blur-[150px] opacity-[0.15] transition-all duration-700 bg-[var(--color-primary-saturated)]" />
        <div className="absolute inset-0 gradient-mesh" />
      </div>

      {/* Global Navbar (same as homepage) */}
      <Navbar
        theme={theme === "light" ? "light" : "dark"}
        toggleTheme={toggleTheme}
        openBookingModal={() => {
          window.dispatchEvent(new CustomEvent("portfolio:open-booking"));
        }}
        glowMode={glowMode}
        setGlowMode={setGlowMode}
        logoUrl={cmsData.settings?.logoUrl || cmsData.footer?.logoText}
        customName={cmsData.hero?.name}
      />

      {/* Page content outlet */}
      <div className="relative z-10">
        <Outlet />
      </div>

      {/* Global Footer (same as homepage) */}
      <Footer data={cmsData.footer} contactData={cmsData.contact} />
    </div>
  );
}
