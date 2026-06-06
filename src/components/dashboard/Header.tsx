import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, Search, Sun, Moon, Sparkles, ChevronRight, Menu, 
  X, CheckCircle, AlertTriangle, ShieldCheck, HelpCircle, Terminal 
} from "lucide-react";
import { loadCMSData } from "../../lib/cmsState";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  openSearch: () => void;
  openMobileMenu: () => void;
}

interface AlertNotification {
  id: string;
  type: "success" | "warn" | "info";
  message: string;
  time: string;
  read: boolean;
}

export default function Header({ 
  activeTab,
  setActiveTab,
  theme, 
  onToggleTheme, 
  openSearch,
  openMobileMenu
}: HeaderProps) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSshModal, setShowSshModal] = useState(false);
  
  const [cmsData, setCmsData] = useState(loadCMSData());

  useEffect(() => {
    const handleCMSUpdate = () => setCmsData(loadCMSData());
    window.addEventListener("portfolio-cms-update", handleCMSUpdate);
    return () => window.removeEventListener("portfolio-cms-update", handleCMSUpdate);
  }, []);

  const [notifications, setNotifications] = useState<AlertNotification[]>([
    { id: "notif_1", type: "success", message: "Database replica Tokyo successfully synched.", time: "4 mins ago", read: false },
    { id: "notif_2", type: "warn", message: "Stripe webhook delayed queue response: retrying...", time: "18 mins ago", read: false },
    { id: "notif_3", type: "info", message: "SSL renewal certificate: updated auto-apply.", time: "1 hour ago", read: true }
  ]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const userName = cmsData.hero?.name || "Admin User";
  const userEmail = cmsData.contact?.email || "admin@portfolio.com";
  const profileImage = cmsData.about?.profileImage;
  const initials = userName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() || "HR";

  return (
    <header className="bg-[#0b2e24]/85 backdrop-blur-md border-b border-white/10 h-16 px-4 flex items-center justify-between sticky top-0 z-20 shadow-3xs text-white">
      
      {/* Breadcrumb section */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger hamburger */}
        <button
          id="mobile-hamburger-btn"
          onClick={openMobileMenu}
          className="p-1 px-1.5 md:hidden border border-white/10 rounded bg-[#0b2b1d]/50 hover:bg-white/5 w-7 h-7 text-zinc-300 hover:text-white transition-colors select-none shrink-0 cursor-pointer"
        >
          <Menu size={16} />
        </button>

        <div className="flex items-center gap-1.5 text-xs text-[#cbf341] font-sans font-medium">
          <span>Portfolio Studio</span>
          <ChevronRight size={12} className="shrink-0 text-white/20" />
          <span className="text-white font-bold capitalize truncate">
            {activeTab === "hero" ? "Hero Banner" : activeTab === "stats" ? "Statistics" : activeTab === "about" ? "Biography / About" : activeTab === "skills" ? "Skills Matrix" : activeTab === "services" ? "Services Catalog" : activeTab === "projects" ? "Portfolio Projects" : activeTab === "videos" ? "Video Showcase" : activeTab === "blogs" ? "Articles / Blog" : activeTab === "contact" ? "Contact Info" : activeTab === "settings" ? "Site Settings" : activeTab}
          </span>
        </div>
      </div>

      {/* Global Navbar commands selectors */}
      <div className="flex items-center gap-2.5">
        
        {/* Theme select slider */}
        <button
          id="navbar-theme-toggle-btn"
          onClick={onToggleTheme}
          className="p-2 border border-white/10 hover:bg-white/5 rounded-xl text-[#cbf341] hover:text-white cursor-pointer select-none transition-colors"
          title={theme === "dark" ? "Toggle light mode theme" : "Toggle dark mode theme"}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notifications Alert Popover bell */}
        <div className="relative">
          <button
            id="navbar-notifications-btn"
            onClick={toggleNotifications}
            className="p-2 border border-white/10 hover:bg-white/5 rounded-xl text-[#cbf341] hover:text-white cursor-pointer select-none transition-colors relative"
          >
            <Bell size={15} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cbf341] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cbf341]"></span>
              </span>
            )}
          </button>

          {/* Alert Dropdown popup */}
          {showNotifications && (
            <>
              <div id="notif-overlay" className="fixed inset-0 z-40 cursor-default" onClick={() => setShowNotifications(false)} />
              <div 
                id="notif-dropdown"
                className="absolute right-0 top-11 w-72 sm:w-80 bg-[#072418] border border-white/10 rounded-xl shadow-xl py-3 z-50 text-xs font-sans mt-1 overflow-hidden"
              >
                <div className="px-4 pb-2 border-b border-white/10 flex items-center justify-between">
                  <span className="font-bold text-white">Live system logs</span>
                  {unreadCount > 0 && (
                    <button
                      id="notif-read-all-btn"
                      onClick={markAllRead}
                      className="text-[10px] text-[#cbf341] font-bold hover:underline select-none cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-white/5 select-none max-h-[250px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-3.5 flex gap-2.5 items-start font-sans leading-relaxed transition-colors ${
                        notif.read ? "opacity-60 bg-transparent" : "bg-[#cbf341]/10"
                      }`}
                    >
                      <span className={`p-1 rounded mt-0.5 shrink-0 ${
                        notif.type === "success" 
                          ? "bg-emerald-500/10 text-emerald-400" 
                          : notif.type === "warn" 
                          ? "bg-amber-500/10 text-amber-400" 
                          : "bg-blue-500/10 text-blue-400"
                      }`}>
                        {notif.type === "success" ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-zinc-355 mt-0.5 font-medium leading-snug text-left">
                          {notif.message}
                        </p>
                        <span className="text-[9.5px] text-[#061910]0 block mt-1 font-semibold text-left">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 pt-2.5 border-t border-white/5 text-center">
                  <button
                    onClick={() => alert("Deep auditing logs loaded successfully.")}
                    className="text-[10px] text-[#cbf341] hover:text-white font-bold hover:underline cursor-pointer"
                  >
                    View diagnostic journal
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Card dropdown selector */}
        <div className="relative">
          <button
            id="navbar-profile-btn"
            onClick={toggleProfileMenu}
            className="flex items-center gap-2 p-1 border border-white/10 hover:bg-white/5 rounded-xl cursor-pointer select-none transition-colors"
          >
            <div className="w-7 h-7 bg-[#0b2b1d] border border-white/10 text-[#cbf341] rounded-lg flex items-center justify-center font-sans font-black text-xs select-none overflow-hidden">
              {(profileImage && (profileImage.startsWith("http") || profileImage.startsWith("data:"))) ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>
          </button>

          {/* Profile list Menu popover */}
          {showProfileMenu && (
            <>
              <div id="profile-overlay" className="fixed inset-0 z-40 cursor-default" onClick={() => setShowProfileMenu(false)} />
              <div 
                id="profile-dropdown"
                className="absolute right-0 top-10 w-48 bg-[#072418] border border-white/10 rounded-xl shadow-xl py-2.5 z-50 text-xs font-sans mt-1 overflow-hidden"
              >
                <div className="px-3.5 py-1.5 border-b border-white/5 text-left">
                  <span className="block font-bold text-white truncate">{userName}</span>
                  <span className="block text-[10.5px] text-[#cbf341] mt-0.5 truncate select-all">{userEmail}</span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveTab("settings");
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-white/5 text-zinc-300 hover:text-white cursor-pointer"
                  >
                    Workspace Details
                  </button>
                  <button
                    onClick={() => {
                      setShowSshModal(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-white/5 text-zinc-300 hover:text-white cursor-pointer"
                  >
                    Your SSH Keys
                  </button>
                </div>

                <div className="border-t border-white/5 pt-1.5 px-3.5">
                  <button
                    onClick={() => navigate("/")}
                    className="w-full text-left py-1 text-red-400 hover:text-red-300 font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* SSH Keys Modal */}
      {showSshModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer" onClick={() => setShowSshModal(false)} />
          <div className="bg-[#072418] border border-white/10 rounded-2xl p-6 max-w-md w-full relative z-10 shadow-2xl flex flex-col gap-4 text-white">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-[#cbf341]" />
                <h3 className="font-sans font-bold text-sm text-white">SSH Keys Management</h3>
              </div>
              <button onClick={() => setShowSshModal(false)} className="text-[#cbf341] hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>
            
            <p className="text-xs text-[#cbf341] text-left">
              Manage your public SSH keys for secure access to the portfolio deployment pipeline and repository.
            </p>
            
            <div className="bg-[#061910] border border-white/5 rounded-lg p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <span className="text-[11px] font-bold text-zinc-200 block">MacBook Pro (Primary)</span>
                  <span className="text-[9px] font-mono text-[#061910]0 block mt-1">SHA256:4t7a.../8xk</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold rounded-full">Active</span>
              </div>
              <div className="text-[10px] text-[#061910]0 border-t border-white/5 pt-2 text-left">
                Added on: Oct 12, 2024
              </div>
            </div>

            <button className="w-full py-2.5 bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] font-bold text-xs rounded-xl transition-colors cursor-pointer">
              Generate New Key
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
