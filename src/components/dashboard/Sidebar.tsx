import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  BarChart3, 
  Users, 
  Sliders, 
  Layers, 
  Briefcase, 
  Video, 
  BookOpen, 
  Mail, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  Globe
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  openSearch: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed,
  openSearch 
}: SidebarProps) {
  const navigate = useNavigate();

  // Exact 10 sections requested by user
  const navItems = [
    { id: "hero", label: "Hero Banner", icon: Sparkles, desc: "Intro name, tagline & visuals" },
    { id: "stats", label: "Statistics", icon: BarChart3, desc: "Authority & key metric boxes" },
    { id: "about", label: "Biography/About", icon: Users, desc: "Detailed bio & testimonials" },
    { id: "skills", label: "Skills Matrix", icon: Sliders, desc: "Stack proficiencies levels" },
    { id: "services", label: "Services Catalog", icon: Layers, desc: "Freelance packages we offer" },
    { id: "projects", label: "Portfolio Projects", icon: Briefcase, desc: "Blueprints & live demos" },
    { id: "videos", label: "Video Showcase", icon: Video, desc: "Video walkthroughs list" },
    { id: "blogs", label: "Articles/Blog", icon: BookOpen, desc: "Writeups, trends & articles" },
    { id: "contact", label: "Contact Info", icon: Mail, desc: "Email, links & socials" },
    { id: "settings", label: "Site Settings", icon: Settings, desc: "SEO metadata & configs" },
  ];

  return (
    <aside 
      id="dashboard-sidebar"
      className={`bg-[#061910] border-r border-white/10 flex flex-col justify-between transition-all duration-300 relative z-30 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full overflow-y-auto scrollbar-none">
        {/* Sidebar Header: Premium Portfolio CMS branding */}
        <div className={`p-4 border-b border-white/10 flex items-center justify-between gap-2.5 min-h-[64px] shrink-0`}>
          {!isCollapsed ? (
            <div className="flex items-center gap-2.5 py-1">
              <div className="w-7 h-7 bg-gradient-to-tr from-[#0b2e24] to-[#133c31] border border-[#cbf341]/20 rounded-lg text-[#cbf341] font-black flex items-center justify-center text-xs select-none shadow-sm shadow-[#cbf341]/10">
                P
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-xs tracking-tight text-white">Portfolio CMS</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#cbf341] leading-none mt-0.5">Content Studio</span>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <div 
                onClick={() => setIsCollapsed(false)}
                className="w-7 h-7 bg-gradient-to-tr from-[#0b2e24] to-[#133c31] border border-[#cbf341]/20 rounded-lg text-[#cbf341] font-black flex items-center justify-center text-xs shadow-xs cursor-pointer select-none mx-auto"
              >
                P
              </div>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <div className="p-3">
          {!isCollapsed && (
            <div className="px-3 mb-2 text-left">
              <span className="font-mono text-[9px] font-bold text-[#061910]0 uppercase tracking-widest block font-sans">Homepage Sections</span>
            </div>
          )}
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center rounded-xl py-2.5 cursor-pointer transition-all duration-150 ${
                    isCollapsed ? "justify-center px-1" : "px-3 gap-3"
                  } ${
                    isActive 
                      ? "bg-[#0b2b1d] text-[#cbf341] font-bold border-l-2 border-[#cbf341]" 
                      : "text-[#cbf341] hover:text-white hover:bg-white/5 font-medium"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={15} className={`shrink-0 transition-colors ${isActive ? "text-[#cbf341]" : "text-[#cbf341]"}`} />
                  {!isCollapsed && (
                    <div className="min-w-0 text-left">
                      <span className="block font-sans text-xs tracking-tight truncate leading-none">{item.label}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Highlighted Live Preview Section */}
        <div className="p-3 mt-auto border-t border-white/10 shrink-0">
          <button
            id="sidebar-nav-portfolio-home"
            onClick={() => navigate("/")}
            className={`w-full flex items-center rounded-xl py-2.5 px-3 cursor-pointer transition-all dynamic-btn bg-[#cbf341] text-[#061910] hover:bg-[#b2d932] shadow-md shadow-[#cbf341]/10 ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
            title="View Live Website"
          >
            <Globe className="text-[#061910] shrink-0 animate-pulse" size={15} />
            {!isCollapsed && (
              <div className="min-w-0 flex-1 text-left flex items-center justify-between">
                <span className="block font-sans text-xs font-bold tracking-tight truncate leading-none">View Live Website</span>
                <ArrowUpRight size={12} className="text-[#061910] shrink-0" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Collapse Action Handler */}
      <div className="p-3 border-t border-white/10 shrink-0 flex items-center justify-center">
        {!isCollapsed ? (
          <button
            id="collapse-sidebar-btn"
            onClick={() => setIsCollapsed(true)}
            className="w-full flex items-center justify-center gap-1 py-1 text-[10px] uppercase font-bold tracking-wider text-[#cbf341] hover:text-white cursor-pointer"
          >
            <ChevronLeft size={12} />
            <span>Collapse Menu</span>
          </button>
        ) : (
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1.5 border border-white/10 hover:bg-white/5 rounded-xl text-[#cbf341] hover:text-white transition-colors cursor-pointer"
            title="Expand menu sidebar"
          >
            <ChevronRight size={13} />
          </button>
        )}
      </div>
    </aside>
  );
}
