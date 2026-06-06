import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { 
  Sparkles, BarChart3, Users as UsersIcon, Sliders, Layers, 
  Briefcase, Video, BookOpen, Mail, Settings as SettingsIcon, Globe,
  ArrowUpRight, X 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import PortfolioCMS from "./PortfolioCMS";

interface AdminDashboardProps {
  theme: "light" | "dark" | "stone";
  toggleTheme: () => void;
}

export default function AdminDashboard({ theme, toggleTheme }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  // Admin section specific SEO
  useEffect(() => {
    const tabLabels: Record<string, string> = {
      hero: "Hero Section Management",
      stats: "Performance Statistics",
      about: "Biography & Profile",
      skills: "Skills & Expertise Matrix",
      services: "Service Offerings",
      projects: "Project Portfolio",
      videos: "Video Showcase",
      blogs: "Articles & Insights",
      contact: "Contact Information",
      settings: "Site Configuration"
    };
    
    const tabDescriptions: Record<string, string> = {
      hero: "Manage the hero banner, call-to-actions, and main value proposition for Humayan Rashid's portfolio CMS.",
      stats: "Update performance statistics, client metrics, and success indicators for Humayan Rashid's professional portfolio.",
      about: "Edit the biography, profile image, and client testimonials for Humayan Rashid's professional portfolio.",
      skills: "Manage the technical skills matrix, tool proficiency, and capabilities for Humayan Rashid's portfolio.",
      services: "Configure custom service offerings, deliverables, and capabilities for Humayan Rashid's web development business.",
      projects: "Update case studies, project links, and technical showcases in Humayan Rashid's web development portfolio.",
      videos: "Manage YouTube video showcases and interactive media content for Humayan Rashid's digital portfolio.",
      blogs: "Publish and manage technical articles, system engineering breakdowns, and insights for Humayan Rashid's blog.",
      contact: "Update professional contact information, social links, and communication channels for Humayan Rashid.",
      settings: "Configure SEO metadata, site theme, analytics, and global settings for Humayan Rashid's portfolio CMS."
    };

    const sectionName = tabLabels[activeTab] || "CMS Dashboard";
    // Use a professional SEO title for the Hero management page; other tabs keep their descriptive titles.
    const seoTitle = "Humayan Rashid | Full Stack Developer & UI/UX Designer";
    const title = activeTab === "hero" ? seoTitle : `${sectionName} | Portfolio Content Management System - Humayan Rashid`;
    const description = tabDescriptions[activeTab] || "Manage Humayan Rashid's professional portfolio content through this custom CMS dashboard.";
    
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }
  }, [activeTab]);

  const mobileNavItems = [
    { id: "hero", label: "Hero Banner", icon: Sparkles },
    { id: "stats", label: "Statistics", icon: BarChart3 },
    { id: "about", label: "Biography/About", icon: UsersIcon },
    { id: "skills", label: "Skills Matrix", icon: Sliders },
    { id: "services", label: "Services Catalog", icon: Layers },
    { id: "projects", label: "Portfolio Projects", icon: Briefcase },
    { id: "videos", label: "Video Showcase", icon: Video },
    { id: "blogs", label: "Articles/Blog", icon: BookOpen },
    { id: "contact", label: "Contact Info", icon: Mail },
    { id: "settings", label: "Site Settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#061910] text-zinc-100 font-sans transition-colors duration-300 relative overflow-x-hidden flex self-stretch flex-row">
      
      {/* 1. Desktop Navigation Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          openSearch={() => {}}
        />
      </div>

      {/* Main Panel Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. Sticky Header Navbar */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme === "light" ? "light" : "dark"}
          onToggleTheme={toggleTheme}
          openSearch={() => {}}
          openMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* 3. Main Scrollable form wrappers */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto self-stretch">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              <PortfolioCMS 
                activeCategory={activeTab as any} 
                setActiveCategory={setActiveTab as any} 
                onToggleViewMode={() => navigate("/")} 
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 4. Mobile Sliding menu sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-start">
            {/* Backdrop overlay filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide drawer chassis */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="relative w-[285px] max-w-full bg-[#061910] border-r border-white/10 h-full flex flex-col p-4 justify-between"
            >
              <div className="space-y-6 overflow-y-auto scrollbar-none pb-4">
                {/* Header title close button */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gradient-to-tr from-[#0b2e24] to-[#133c31] border border-[#cbf341]/20 rounded-md text-[#cbf341] font-sans font-black flex items-center justify-center text-[10px]">
                      P
                    </div>
                    <span className="font-sans font-bold text-xs tracking-tight text-white">Portfolio CMS</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded text-[#cbf341] hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Categories lists */}
                <nav className="space-y-1">
                  {mobileNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl cursor-pointer text-xs font-semibold select-none transition-all ${
                          isActive 
                            ? "bg-[#0b2b1d] text-[#cbf341] font-bold border-l-2 border-[#cbf341]" 
                            : "text-[#cbf341] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon size={15} className={isActive ? "text-[#cbf341]" : "text-[#cbf341]"} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Quick Trigger for Live Website */}
              <div className="space-y-3 font-sans shrink-0 border-t border-white/10 pt-3">
                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#cbf341] text-[#061910] hover:bg-[#b2d932] font-sans font-bold text-xs rounded-xl shadow-lg cursor-pointer"
                >
                  <Globe size={14} className="text-[#061910]" />
                  <span>View Live Website</span>
                  <ArrowUpRight size={11} className="text-[#061910]" />
                </button>
                <div className="text-[9px] font-bold text-[#061910]0 uppercase tracking-widest text-center">
                  Homepage Content Studio
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
