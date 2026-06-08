import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, ChevronDown, ArrowUpRight, Briefcase, Users, Workflow, Layers, Sparkles, Globe, Mail, BookOpen, Video, Cpu, Code2, Compass } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  openBookingModal: () => void;
  glowMode: "default" | "yellow" | "green";
  setGlowMode: (mode: "default" | "yellow" | "green") => void;
  logoUrl?: string;
  customName?: string;
}

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  desc?: string;
}

interface MenuItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export default function Navbar({ theme, toggleTheme, openBookingModal, glowMode, setGlowMode, logoUrl, customName }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const menuItems: MenuItem[] = [
    { label: "Home", href: "#home" },
    {
      label: "About Us",
      href: "#about",
      hasDropdown: true,
      dropdownItems: [
        { label: "Our Story", href: "#about", icon: <Sparkles size={14} />, desc: "Humayan's journey & values" },
        { label: "Working Process", href: "#process", icon: <Workflow size={14} />, desc: "How we deliver projects" },
        { label: "Benefits", href: "#benefits", icon: <Layers size={14} />, desc: "Why clients choose us" },
      ],
    },
    {
      label: "Company",
      href: "#company",
      hasDropdown: true,
      dropdownItems: [
        { label: "About", href: "#about", icon: <Users size={14} />, desc: "Biography & profile" },
        { label: "Process", href: "#process", icon: <Workflow size={14} />, desc: "Step-by-step workflow" },
        { label: "Benefits", href: "#benefits", icon: <Sparkles size={14} />, desc: "Strategic advantages" },
      ],
    },
    { label: "Services", href: "#services" },
    {
      label: "Pages",
      href: "#pages",
      hasDropdown: true,
      dropdownItems: [
        { label: "Home", href: "#home", icon: <Sparkles size={14} />, desc: "Landing experience" },
        { label: "Services", href: "#services", icon: <Briefcase size={14} />, desc: "What we offer" },
        { label: "Portfolio", href: "#portfolio", icon: <Layers size={14} />, desc: "Case studies" },
        { label: "Blog", href: "#blog", icon: <BookOpen size={14} />, desc: "Articles & insights" },
        { label: "Videos", href: "#videos", icon: <Video size={14} />, desc: "Showcase & walkthroughs" },
        { label: "Contact", href: "#contact", icon: <Mail size={14} />, desc: "Get in touch" },
        { label: "Study Abroad", href: "/abroad", icon: <Globe size={14} />, desc: "International program" },
      ],
    },
    {
      label: "Works",
      href: "#works",
      hasDropdown: true,
      dropdownItems: [
        { label: "All Projects", href: "#portfolio", icon: <Layers size={14} />, desc: "Browse everything" },
        { label: "Web Apps", href: "#portfolio", icon: <Code2 size={14} />, desc: "Frontend showcases" },
        { label: "State Engines", href: "#portfolio", icon: <Cpu size={14} />, desc: "Backend systems" },
        { label: "Design Systems", href: "#portfolio", icon: <Compass size={14} />, desc: "UI/UX work" },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "services", "blog", "videos", "contact", "process", "benefits", "portfolio"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
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
      setOpenDropdown(null);
    }
  };

  const handleDropdownEnter = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
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
                  <path d="M 30.6 9.4 A 15 15 0 1 0 30.6 29.6" />
                  <path d="M 27.4 12.6 A 10.5 10.5 0 1 0 27.4 27.4" />
                  <path d="M 24.2 15.8 A 6 6 0 1 0 24.2 24.2" strokeWidth="2.2" />
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
              {menuItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "");
                const isOpenDD = openDropdown === item.label && item.hasDropdown;
                return (
                  <React.Fragment key={item.label}>
                    {index > 0 && <div className="h-3.5 w-[1px] bg-white/10" />}
                    <div
                      className="relative"
                      onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (item.hasDropdown) {
                            e.preventDefault();
                            setOpenDropdown((prev) => (prev === item.label ? null : item.label));
                          } else {
                            scrollToSection(e, item.href);
                          }
                        }}
                        className={`text-xs sm:text-[13px] font-semibold tracking-wide transition-colors flex items-center gap-1 duration-200 ${
                          isActive
                            ? "text-[#cbf341] font-bold"
                            : "text-white/80 hover:text-[#cbf341]"
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && (
                          <ChevronDown
                            size={12}
                            className={`text-white/50 mt-0.5 transition-transform duration-200 ${
                              isOpenDD ? "rotate-180 text-[#cbf341]" : ""
                            }`}
                          />
                        )}
                      </a>

                      {/* Dropdown panel */}
                      <AnimatePresence>
                        {isOpenDD && item.dropdownItems && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-[#0a2219]/95 backdrop-blur-md border border-[#cbf341]/20 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-50"
                          >
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a2219] border-l border-t border-[#cbf341]/20 rotate-45" />
                            <div className="py-2">
                              {item.dropdownItems.map((sub) => (
                                <a
                                  key={`${item.label}-${sub.label}`}
                                  href={sub.href}
                                  onClick={(e) => scrollToSection(e, sub.href)}
                                  className="flex items-start gap-2.5 px-3.5 py-2.5 hover:bg-[#cbf341]/10 transition-colors group/item"
                                >
                                  <span className="w-7 h-7 shrink-0 rounded-lg bg-[#0a291b] border border-[#cbf341]/15 flex items-center justify-center text-[#cbf341] group-hover/item:bg-[#cbf341] group-hover/item:text-[#061910] transition-colors">
                                    {sub.icon}
                                  </span>
                                  <span className="flex flex-col min-w-0">
                                    <span className="text-xs font-bold text-white group-hover/item:text-[#cbf341] transition-colors">
                                      {sub.label}
                                    </span>
                                    {sub.desc && (
                                      <span className="text-[10px] text-zinc-400 leading-tight mt-0.5 line-clamp-1">
                                        {sub.desc}
                                      </span>
                                    )}
                                  </span>
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </React.Fragment>
                );
              })}
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
                  const isExpanded = openDropdown === item.label && item.hasDropdown;
                  return (
                    <div key={item.label} className="flex flex-col">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="flex items-stretch gap-1"
                      >
                        <a
                          href={item.href}
                          onClick={(e) => {
                            if (item.hasDropdown) {
                              e.preventDefault();
                              setOpenDropdown((prev) => (prev === item.label ? null : item.label));
                            } else {
                              scrollToSection(e, item.href);
                            }
                          }}
                          className={`flex-1 px-4 py-3.5 text-sm font-bold rounded-xl text-left transition-all flex items-center justify-between min-h-[44px] ${
                            isActive
                              ? "bg-gradient-to-r from-[#cbf341]/20 to-[#b2d932]/20 border border-[#cbf341]/30 text-[#cbf341]"
                              : "text-white/70 hover:bg-[#0a291b]/60 hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          {isActive && <div className="w-1.5 h-1.5 bg-[#cbf341] rounded-full animate-pulse" />}
                        </a>
                        {item.hasDropdown && (
                          <button
                            onClick={() => setOpenDropdown((prev) => (prev === item.label ? null : item.label))}
                            aria-label={`Toggle ${item.label} submenu`}
                            className="px-3 rounded-xl text-white/70 hover:text-[#cbf341] hover:bg-[#0a291b]/60 transition-all"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#cbf341]" : ""}`}
                            />
                          </button>
                        )}
                      </motion.div>

                      {/* Mobile submenu */}
                      <AnimatePresence>
                        {isExpanded && item.dropdownItems && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden ml-3 mt-1 mb-2 border-l border-[#cbf341]/20 pl-3"
                          >
                            <div className="flex flex-col gap-0.5">
                              {item.dropdownItems.map((sub) => (
                                <a
                                  key={`${item.label}-mobile-${sub.label}`}
                                  href={sub.href}
                                  onClick={(e) => scrollToSection(e, sub.href)}
                                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs text-zinc-300 hover:text-[#cbf341] hover:bg-[#0a291b]/40 transition-colors min-h-[40px]"
                                >
                                  <span className="text-[#cbf341] shrink-0">{sub.icon}</span>
                                  <span className="font-semibold">{sub.label}</span>
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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
