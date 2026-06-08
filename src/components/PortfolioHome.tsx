import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import PortfolioProjects from "./PortfolioProjects";
import WorkingProcess from "./WorkingProcess";
import Benefits from "./Benefits";
import VideoShowcase from "./VideoShowcase";
import StudyAbroad from "./StudyAbroad";
import Blog from "./Blog";
import Contact from "./Contact";
import Footer from "./Footer";
import { loadCMSData, syncCMSFromSupabase } from "../lib/cmsState";

interface PortfolioHomeProps {
  openBookingModal: () => void;
}

export default function PortfolioHome({ openBookingModal }: PortfolioHomeProps) {
  const [cmsData, setCmsData] = useState(loadCMSData());
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [glowMode, setGlowMode] = useState<"default" | "yellow" | "green">("default");

  // Sync theme
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    if (theme === "dark") {
      root.classList.add("dark");
    }
  }, [theme]);

  // Sync favicon
  useEffect(() => {
    if (cmsData.settings?.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = cmsData.settings.faviconUrl;
    }
  }, [cmsData.settings?.faviconUrl]);

  // Sync from Supabase on mount
  useEffect(() => {
    syncCMSFromSupabase().then((remoteData) => {
      setCmsData(remoteData);
    });
  }, []);

  // Keep cmsData updated if local storage is updated (custom update dispatch listen)
  useEffect(() => {
    const handleCMSUpdate = () => {
      const updatedData = loadCMSData();
      console.log("[CMS Broadcast Listener] Received update event! Syncing data to home portfolio view. Profile Image is now:", updatedData.about?.profileImage || "None (Using fallback)");
      setCmsData(updatedData);
    };
    window.addEventListener("portfolio-cms-update", handleCMSUpdate);

    return () => {
      window.removeEventListener("portfolio-cms-update", handleCMSUpdate);
    };
  }, []);

  const handleOpenBooking = () => {
    // Dispatch global event so the App-level modal can open from anywhere
    window.dispatchEvent(new CustomEvent("portfolio:open-booking"));
    if (openBookingModal) openBookingModal();
  };

  return (
    <div className="min-h-screen bg-[#061910] dark:bg-[#061910] text-[#fafafa] font-sans transition-colors duration-300 relative overflow-x-hidden gradient-primary">
      {/* Soothing ambient background with subtle gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25 leading-none transition-all duration-700 bg-[var(--color-primary-vibrant)]" />
        <div className="absolute top-[1200px] right-10 w-[450px] h-[450px] rounded-full blur-[150px] opacity-[0.15] transition-all duration-700 bg-[var(--color-primary-saturated)]" />
        <div className="absolute inset-0 gradient-mesh" />
      </div>

      {/* Sticky Premium Header Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
        openBookingModal={handleOpenBooking}
        glowMode={glowMode}
        setGlowMode={setGlowMode}
        logoUrl={cmsData.settings?.logoUrl || cmsData.footer?.logoText}
        customName={cmsData.hero?.name}
      />

      {/* Sections structured with absolute viewport container margins to ensure perfect desktop & mobile scaling */}
      <div className="relative z-10">
        <div id="home">
          <Hero openBookingModal={handleOpenBooking} data={cmsData.hero} />
        </div>
        
        <Services openBookingModal={handleOpenBooking} data={cmsData.services} />
        
        <About data={cmsData.about} customSkills={cmsData.skills} />
        
        <PortfolioProjects data={cmsData.projects} />
        
        <WorkingProcess />
        
        <Benefits />
        
        <VideoShowcase data={cmsData.videos} />
        
        <StudyAbroad openBookingModal={handleOpenBooking} />
        
        <Blog data={cmsData.blogs} />
        
        <Contact data={cmsData.contact} openBookingModal={handleOpenBooking} />
        
        <Footer data={cmsData.footer} contactData={cmsData.contact} />
      </div>
    </div>
  );
}
