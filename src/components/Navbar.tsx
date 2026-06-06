import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Calendar, ChevronDown, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  openBookingModal: () => void;
  glowMode: "default" | "yellow" | "green";
  setGlowMode: (mode: "default" | "yellow" | "green") => void;
  logoUrl?: string;
  customName?: string;
}

export default function Navbar({ theme, toggleTheme, openBookingModal, glowMode, setGlowMode, logoUrl, customName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Company", href: "#company", hasDropdown: true },
    { label: "Services", href: "#services" },
    { label: "Pages", href: "#pages", hasDropdown: true },
    { label: "Works", href: "#works" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "services", "blog", "videos", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section === "home" ? "home" : section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(targetId);
      setIsOpen(false);
    }
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-panel ${
        scrolled
          ? "bg-[#061910]/95 border-b border-[var(--color-border)] shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          
          <a
            id="nav-logo"
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0 min-w-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 text-[#cbf341] shrink-0">
                <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  {/* Outer Arc */}
                  <path d="M 30.6 9.4 A 15 15 0 1 0 30.6 29.6" />
                  {/* Middle Arc */}
                  <path d="M 27.4 12.6 A 10.5 10.5 0 1 0 27.4 27.4" />
                  {/* Inner Arc */}
                  <path d="M 24.2 15.8 A 6 6 0 1 0 24.2 24.2" strokeWidth="2.2" />
                  {/* Center Dot */}
                  <circle cx="20" cy="20" r="1.8" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-sans font-black tracking-wider text-white text-base sm:text-lg leading-none uppercase truncate">
                  I AM HUMAYAN
                </span>
                <span className="font-sans text-[6px] sm:text-[7px] font-bold tracking-[0.2em] text-white/70 uppercase leading-none mt-1 truncate">
                  FROM TEXAS
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Link Pills */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1">
            <div className="bg-[#122e20]/65 border border-white/5 backdrop-blur-md rounded-2xl px-6 py-3 flex items-center gap-4.5 shadow-md">
              {menuItems.map((item, index) => (
                <React.Fragment key={item.label}>
                  {index > 0 && <div className="h-3.5 w-[1px] bg-white/10" />}
                  <a
                    href={item.href}
                    onClick={(e) => !item.hasDropdown && scrollToSection(e, item.href)}
                    className={`text-xs sm:text-[13px] font-semibold tracking-wide transition-colors flex items-center gap-1 duration-200 ${
                      activeSection === item.href.replace("#", "")
                        ? "text-[#cbf341] font-bold"
                        : "text-white/80 hover:text-[#cbf341]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown size={12} className="text-white/50 mt-0.5" />}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </nav>

          {/* Desktop Actions bar */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-[#cbf341]/25 bg-[#0a291b] hover:bg-[#0b2b1d] text-[#cbf341] cursor-pointer transition-colors"
              aria-label="Toggle system mode"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <motion.button
              id="desktop-cta-book"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={openBookingModal}
              className="px-6 py-3 rounded-full bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] font-bold text-xs sm:text-[13px] tracking-wider flex items-center gap-2 shadow-lg shadow-[#cbf341]/10 transition-all duration-200 cursor-pointer"
            >
              <ArrowUpRight size={15} strokeWidth={2.5} />
              <span>Book A Call</span>
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              id="mobile-theme-toggle"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-[#cbf341]/25 bg-[#0a291b] text-[#cbf341] cursor-pointer min-h-[40px] min-w-[40px]"
              aria-label="Toggle system mode"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              id="hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border border-[#cbf341]/25 bg-[#0a291b] text-[#cbf341] hover:text-white hover:bg-[#0b2b1d] transition-colors cursor-pointer min-h-[40px] min-w-[40px]"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-gradient-to-br from-[#061910] to-[#0b2b1d] border-b border-[#cbf341]/20 overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="px-4 sm:px-5 py-6 flex flex-col gap-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              <div className="flex flex-col gap-1 font-display">
                {menuItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <motion.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      key={item.label}
                      href={item.href}
                      onClick={(e) => !item.hasDropdown && scrollToSection(e, item.href)}
                      className={`px-4 py-3.5 text-sm font-bold rounded-xl text-left transition-all flex items-center justify-between min-h-[44px] ${
                        isActive
                          ? "bg-gradient-to-r from-[#cbf341]/20 to-[#b2d932]/20 border border-[#cbf341]/30 text-[#cbf341]"
                          : "text-white/70 hover:bg-[#0a291b]/60 hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <div className="w-1.5 h-1.5 bg-[#cbf341] rounded-full animate-pulse" />}
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <motion.button
                id="mobile-cta-book"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => {
                  setIsOpen(false);
                  openBookingModal();
                }}
                className="w-full py-3.5 px-5 rounded-full bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#cbf341]/10 transition-all cursor-pointer"
              >
                <ArrowUpRight size={15} strokeWidth={2.5} />
                <span>Book A Call</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
