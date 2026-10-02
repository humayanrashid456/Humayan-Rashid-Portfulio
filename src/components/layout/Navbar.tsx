"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ArrowUpRight, Workflow, Layers, Sparkles, Globe, Mail, BookOpen, Video } from "lucide-react";
import { useBooking } from "@/components/providers/BookingProvider";
import BrandMark from "./BrandMark";

interface NavbarProps {
  logoTitle: string;
  logoSubtitle?: string;
}

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  desc?: string;
}

interface MenuItem {
  label: string;
  /** Omitted for a dropdown that only groups other pages. */
  href?: string;
  dropdownItems?: DropdownItem[];
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    dropdownItems: [
      { label: "Our Story", href: "/about", icon: <Sparkles size={14} />, desc: "Humayan's journey & values" },
      { label: "Working Process", href: "/process", icon: <Workflow size={14} />, desc: "How we deliver projects" },
      { label: "Benefits", href: "/benefits", icon: <Layers size={14} />, desc: "Why clients choose us" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/projects" },
  {
    label: "Pages",
    dropdownItems: [
      { label: "Blog", href: "/blog", icon: <BookOpen size={14} />, desc: "Articles & insights" },
      { label: "Videos", href: "/videos", icon: <Video size={14} />, desc: "Showcase & walkthroughs" },
      { label: "Contact", href: "/contact", icon: <Mail size={14} />, desc: "Get in touch" },
      { label: "Study Abroad", href: "/abroad", icon: <Globe size={14} />, desc: "International program" },
    ],
  },
];

const matchesPath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

const isItemActive = (pathname: string, item: MenuItem) =>
  (item.href !== undefined && matchesPath(pathname, item.href)) ||
  (item.dropdownItems ?? []).some((sub) => matchesPath(pathname, sub.href));

export default function Navbar({ logoTitle, logoSubtitle }: NavbarProps) {
  const { openBooking: openBookingModal } = useBooking();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const closeMenus = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => setOpenDropdown((prev) => (prev === label ? null : label));

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
          
          <Link
            id="nav-logo"
            href="/"
            onClick={closeMenus}
            className="flex items-center gap-2 sm:gap-2.5 group min-w-0"
            aria-label={`${logoTitle}, home`}
          >
            <BrandMark title={logoTitle} subtitle={logoSubtitle} />
          </Link>

          {/* Desktop Navigation Link Pills */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
            <div className="bg-[#122e20]/65 border border-white/5 backdrop-blur-md rounded-2xl px-6 py-3 flex items-center gap-4.5 shadow-md">
              {MENU_ITEMS.map((item, index) => {
                const isActive = isItemActive(pathname, item);
                const hasDropdown = !!item.dropdownItems;
                const isOpenDD = openDropdown === item.label && hasDropdown;
                const className = `text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap transition-colors flex items-center gap-1 duration-200 cursor-pointer ${
                  isActive ? "text-[#cbf341] font-bold" : "text-white/80 hover:text-[#cbf341]"
                }`;
                const content = (
                  <>
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        size={12}
                        className={`text-white/50 mt-0.5 transition-transform duration-200 ${
                          isOpenDD ? "rotate-180 text-[#cbf341]" : ""
                        }`}
                      />
                    )}
                  </>
                );
                return (
                  <React.Fragment key={item.label}>
                    {index > 0 && <div className="h-3.5 w-[1px] bg-white/10" />}
                    <div
                      className="relative"
                      onMouseEnter={() => hasDropdown && handleDropdownEnter(item.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={closeMenus}
                          aria-current={pathname === item.href ? "page" : undefined}
                          className={className}
                        >
                          {content}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleDropdown(item.label)}
                          aria-expanded={!!isOpenDD}
                          className={className}
                        >
                          {content}
                        </button>
                      )}

                      {/* Dropdown panel */}
                      <AnimatePresence>
                        {isOpenDD && item.dropdownItems && (
                          <m.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-[#0a2219]/95 backdrop-blur-md border border-[#cbf341]/20 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-50"
                          >
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a2219] border-l border-t border-[#cbf341]/20 rotate-45" />
                            <div className="py-2">
                              {item.dropdownItems.map((sub) => (
                                <Link
                                  key={`${item.label}-${sub.label}`}
                                  href={sub.href}
                                  onClick={closeMenus}
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
                                </Link>
                              ))}
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </nav>

          {/* Desktop Actions bar */}
          <div className="hidden lg:flex items-center gap-3">
            <m.button
              id="desktop-cta-book"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={openBookingModal}
              className="px-6 py-3 rounded-full bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] font-bold text-xs sm:text-[13px] tracking-wider flex items-center gap-2 shadow-lg shadow-[#cbf341]/10 transition-all duration-200 cursor-pointer"
            >
              <ArrowUpRight size={15} strokeWidth={2.5} />
              <span>Book A Call</span>
            </m.button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0 ml-2">
            <button
              id="hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border border-[#cbf341]/25 bg-[#0a291b] text-[#cbf341] hover:text-white hover:bg-[#0b2b1d] transition-colors cursor-pointer min-h-[40px] min-w-[40px]"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
            >
              {isOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-gradient-to-br from-[#061910] to-[#0b2b1d] border-b border-[#cbf341]/20 overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="px-4 sm:px-5 py-6 flex flex-col gap-4 max-h-[calc(100dvh-80px)] overflow-y-auto">
              <div className="flex flex-col gap-1 font-display">
                {MENU_ITEMS.map((item, index) => {
                  const isActive = isItemActive(pathname, item);
                  const hasDropdown = !!item.dropdownItems;
                  const isExpanded = openDropdown === item.label && hasDropdown;
                  const className = `flex-1 px-4 py-3.5 text-sm font-bold rounded-xl text-left transition-all flex items-center justify-between min-h-[44px] ${
                    isActive
                      ? "bg-gradient-to-r from-[#cbf341]/20 to-[#b2d932]/20 border border-[#cbf341]/30 text-[#cbf341]"
                      : "text-white/70 hover:bg-[#0a291b]/60 hover:text-white"
                  }`;
                  const content = (
                    <>
                      <span>{item.label}</span>
                      {isActive && <div className="w-1.5 h-1.5 bg-[#cbf341] rounded-full animate-pulse" />}
                    </>
                  );
                  return (
                    <div key={item.label} className="flex flex-col">
                      <m.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="flex items-stretch gap-1"
                      >
                        {item.href ? (
                          <Link
                            href={item.href}
                            onClick={closeMenus}
                            aria-current={pathname === item.href ? "page" : undefined}
                            className={className}
                          >
                            {content}
                          </Link>
                        ) : (
                          <button type="button" onClick={() => toggleDropdown(item.label)} className={className}>
                            {content}
                          </button>
                        )}
                        {hasDropdown && (
                          <button
                            type="button"
                            onClick={() => toggleDropdown(item.label)}
                            aria-label={`Toggle ${item.label} submenu`}
                            className="px-3 rounded-xl text-white/70 hover:text-[#cbf341] hover:bg-[#0a291b]/60 transition-all"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#cbf341]" : ""}`}
                            />
                          </button>
                        )}
                      </m.div>

                      {/* Mobile submenu */}
                      <AnimatePresence>
                        {isExpanded && item.dropdownItems && (
                          <m.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden ml-3 mt-1 mb-2 border-l border-[#cbf341]/20 pl-3"
                          >
                            <div className="flex flex-col gap-0.5">
                              {item.dropdownItems.map((sub) => (
                                <Link
                                  key={`${item.label}-mobile-${sub.label}`}
                                  href={sub.href}
                                  onClick={closeMenus}
                                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs text-zinc-300 hover:text-[#cbf341] hover:bg-[#0a291b]/40 transition-colors min-h-[40px]"
                                >
                                  <span className="text-[#cbf341] shrink-0">{sub.icon}</span>
                                  <span className="font-semibold">{sub.label}</span>
                                </Link>
                              ))}
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <m.button
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
              </m.button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
