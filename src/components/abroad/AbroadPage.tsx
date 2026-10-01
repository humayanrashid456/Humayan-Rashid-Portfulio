"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, type Variants } from "motion/react";
import {
  GraduationCap, Users, Building2, Globe, ShieldCheck,
  Phone, ClipboardCheck, Plane, BookOpen, Award,
  ArrowLeft, Sun, Moon, ArrowRight, Check, Sparkles, Star,
  MessageSquare, TrendingUp, Target, Network, BadgeCheck,
  Briefcase, FileText, Mic, Wallet, ChevronRight,
} from "lucide-react";
import BrandMark from "@/components/layout/BrandMark";
import { useTheme } from "@/hooks/useTheme";
import AbroadLeadForm from "./AbroadLeadForm";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const countries = [
  { name: "Australia",     code: "au", tagline: "World-class Education" },
  { name: "United Kingdom", code: "gb", tagline: "Heritage Universities" },
  { name: "Canada",        code: "ca", tagline: "PR Pathways" },
  { name: "USA",           code: "us", tagline: "Top Global Rankings" },
  { name: "Germany",       code: "de", tagline: "Tuition-Free Studies" },
  { name: "Ireland",       code: "ie", tagline: "Tech & Innovation Hub" },
  { name: "Malaysia",      code: "my", tagline: "Affordable Excellence" },
];

const services = [
  { icon: BookOpen,       title: "University Admission",  desc: "Apply to 300+ top-ranked universities worldwide with end-to-end application support." },
  { icon: ClipboardCheck, title: "Visa Processing",       desc: "Documentation, filing and interview prep for a 95% visa success rate." },
  { icon: Wallet,         title: "Scholarship Guidance",  desc: "Discover merit and need-based funding to dramatically lower study costs." },
  { icon: FileText,       title: "SOP Assistance",        desc: "Personalized Statements of Purpose crafted by expert editors." },
  { icon: Mic,            title: "Interview Preparation", desc: "Mock interviews and live coaching for admission & visa officers." },
  { icon: Plane,          title: "Pre-Departure Support", desc: "Travel, accommodation, forex and orientation—handled for you." },
];

const whyChooseUs = [
  { icon: BadgeCheck,  title: "Experienced Counselors",   desc: "10+ years guiding students to global universities with one-on-one mentorship." },
  { icon: Network,     title: "Global University Network", desc: "Direct partnerships with 300+ institutions across 7 countries." },
  { icon: ShieldCheck, title: "Transparent Process",     desc: "Zero hidden charges, clear timelines, and real-time application tracking." },
  { icon: TrendingUp,  title: "High Visa Success Rate",  desc: "A proven 95% visa approval track record with thousands of students placed." },
];

const stats = [
  { icon: Users,       value: "5,000+", label: "Students\nAssisted" },
  { icon: Building2,   value: "300+",  label: "Universities\nPartnered" },
  { icon: Globe,       value: "7",     label: "Countries\nCovered" },
  { icon: ShieldCheck, value: "95%",   label: "Visa Success\nRate" },
];

const processSteps = [
  { num: "01", title: "Free Counseling",  desc: "Understand your goals, budget and eligibility." },
  { num: "02", title: "University Shortlist", desc: "Match with the best-fit programs and countries." },
  { num: "03", title: "Application & SOP", desc: "Submit polished applications on your behalf." },
  { num: "04", title: "Visa & Departure", desc: "Get visa approved and fly with confidence." },
];

interface AbroadPageProps {
  logoTitle: string;
  logoSubtitle?: string;
  copyright: string;
}

export default function AbroadPage({ logoTitle, logoSubtitle, copyright }: AbroadPageProps) {
  const { theme, toggleTheme } = useTheme();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [preselectedCountry, setPreselectedCountry] = useState<string | null>(null);

  const openBookingModal = () => {
    setPreselectedCountry(null);
    setIsBookingOpen(true);
  };

  const handleCountrySelect = (countryName: string) => {
    setPreselectedCountry(countryName);
    setIsBookingOpen(true);
  };

  const handleFormClose = () => {
    setIsBookingOpen(false);
    setPreselectedCountry(null);
  };


  return (
    <div className="min-h-screen bg-[#061910] text-white font-sans transition-colors duration-300 relative overflow-x-hidden">
      {/* Ambient background blobs matching the rest of the site */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25 leading-none transition-all duration-700 bg-[var(--color-primary-vibrant)]" />
        <div className="absolute top-[1200px] right-10 w-[450px] h-[450px] rounded-full blur-[150px] opacity-[0.15] transition-all duration-700 bg-[var(--color-primary-saturated)]" />
        <div className="absolute inset-0 gradient-mesh" />
      </div>

      {/* ── Sticky Header (custom, minimal for the /abroad route) ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#061910]/95 border-b border-[var(--color-border)] shadow-lg backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
              aria-label="Back to home"
            >
              <BrandMark title={logoTitle} subtitle={logoSubtitle} titleClassName="font-display" />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full border border-white/10 hover:border-[#cbf341]/30 text-zinc-300 hover:text-[#cbf341] text-xs font-semibold tracking-wide transition-all"
              >
                <ArrowLeft size={13} />
                <span>Back to Home</span>
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2.5 rounded-full border border-[#cbf341]/25 bg-[#0a291b] hover:bg-[#0b2b1d] text-[#cbf341] cursor-pointer transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <button
                type="button"
                onClick={openBookingModal}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] font-bold text-xs sm:text-[13px] tracking-wider flex items-center gap-2 shadow-lg shadow-[#cbf341]/10 transition-all duration-200 cursor-pointer"
              >
                <Phone size={14} className="fill-current sm:hidden" />
                <Phone size={15} className="fill-current hidden sm:inline" />
                <span>Book Free Counseling</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <div className="relative z-10">
        {/* ═══════════════════════════════════════════════════════
            1. HERO SECTION
            ═══════════════════════════════════════════════════════ */}
        <section className="relative pt-28 sm:pt-32 md:pt-40 lg:pt-44 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.07)_0%,transparent_70%)]" />
            <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.05)_0%,transparent_70%)]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
              {/* Left: Content */}
              <m.div
                initial="hidden"
                animate="show"
                className="lg:col-span-7"
              >
                <m.div
                  variants={fadeUp}
                  custom={0}
                  className="inline-flex items-center gap-2 bg-[#cbf341]/10 border border-[#cbf341]/20 px-4 py-1.5 rounded-full mb-6"
                >
                  <Sparkles size={14} className="text-[#cbf341]" />
                  <span className="text-[10px] sm:text-xs font-bold text-[#cbf341] tracking-widest uppercase">Study Abroad Program</span>
                </m.div>

                <m.h1
                  variants={fadeUp}
                  custom={1}
                  className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] leading-[1.05] tracking-tight text-white mb-6"
                >
                  Study Abroad{" "}
                  <span className="text-[#cbf341] relative inline-block">
                    With Confidence
                    <span className="absolute -bottom-1.5 left-0 w-full h-[3px] bg-gradient-to-r from-[#cbf341]/70 to-transparent rounded-full" />
                  </span>
                </m.h1>

                <m.p
                  variants={fadeUp}
                  custom={2}
                  className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8 max-w-2xl"
                >
                  From university admission to visa approval, we guide students
                  every step of the way.
                </m.p>

                <m.div
                  variants={fadeUp}
                  custom={3}
                  className="flex flex-wrap items-center gap-4 mb-10"
                >
                  <button
                    type="button"
                    onClick={openBookingModal}
                    className="bg-[#cbf341] hover:bg-[#b5da3a] text-[#061910] px-7 sm:px-9 py-4 rounded-xl font-black text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-[1.03] shadow-lg shadow-[#cbf341]/20 w-full sm:w-auto justify-center"
                  >
                    <Phone size={18} className="fill-current" />
                    Book Free Counseling
                  </button>
                  <a
                    href="#countries"
                    className="flex items-center gap-2 px-5 sm:px-6 py-4 rounded-xl font-bold text-sm sm:text-base text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 w-full sm:w-auto justify-center"
                  >
                    Explore Destinations
                    <ChevronRight size={16} />
                  </a>
                </m.div>

                {/* Trust strip */}
                <m.div
                  variants={fadeUp}
                  custom={4}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 max-w-2xl"
                >
                  {stats.map((s, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full border border-[#cbf341]/30 flex items-center justify-center shrink-0">
                        <s.icon size={16} className="text-[#cbf341]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-lg sm:text-xl font-black text-[#cbf341] leading-none mb-0.5">{s.value}</p>
                        <p className="text-[10px] text-white/80 font-medium whitespace-pre-line leading-tight">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </m.div>
              </m.div>

              {/* Right: Decorative Visual Card */}
              <m.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5"
              >
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a2618] via-[#081d13] to-[#071a10] shadow-2xl shadow-[#cbf341]/10 p-6 sm:p-8">
                  {/* Decorative rings */}
                  <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full border border-[#cbf341]/20" />
                  <div className="absolute -top-5 -right-5 w-32 h-32 rounded-full border border-[#cbf341]/15" />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.1)_0%,transparent_70%)]" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#cbf341] flex items-center justify-center shadow-xl shadow-[#cbf341]/20 mb-5">
                      <GraduationCap size={40} className="text-[#061910] sm:hidden" strokeWidth={2.2} />
                      <GraduationCap size={48} className="text-[#061910] hidden sm:block" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight mb-3">
                      Your Global Journey <br className="hidden sm:block" /> Starts Here
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed max-w-sm mb-6">
                      Personalized guidance, transparent process, and 95% visa
                      success — all under one roof.
                    </p>

                    <div className="w-full grid grid-cols-2 gap-2.5 text-left">
                      {[
                        { icon: Check, text: "Free 1-on-1 Counseling" },
                        { icon: Check, text: "No Hidden Charges" },
                        { icon: Check, text: "End-to-End Support" },
                        { icon: Check, text: "95% Visa Success" },
                      ].map((b, i) => (
                        <div key={i} className="flex items-center gap-2 bg-[#072418] border border-white/5 rounded-xl px-3 py-2.5">
                          <b.icon size={14} className="text-[#cbf341] shrink-0" />
                          <span className="text-[11px] sm:text-xs font-semibold text-white">{b.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            2. COUNTRIES SECTION
            ═══════════════════════════════════════════════════════ */}
        <section
          id="countries"
          className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-10 sm:mb-12 lg:mb-16">
              <m.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[8px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-widest mb-4"
              >
                <Globe size={12} />
                <span>Top Destinations</span>
              </m.div>

              <m.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-2xl"
              >
                Choose Your <span className="text-[#cbf341]">Study Destination</span>
              </m.h2>

              <m.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl mt-4"
              >
                We work with top-ranked universities across 7 countries to help
                you find the perfect fit for your career and lifestyle.
              </m.p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {countries.map((c, i) => (
                <m.button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountrySelect(c.name)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`Apply to study in ${c.name}`}
                  className="group relative text-left bg-gradient-to-br from-[#0a2618] to-[#072418] border border-white/5 hover:border-[#cbf341]/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-[#cbf341]/15 cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cbf341]/50"
                >
                  {/* Hover glow accent */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(203,243,65,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex items-center gap-3 mb-4">
                    <div className="w-12 h-8 sm:w-14 sm:h-9 overflow-hidden rounded-md border border-white/10 shadow-sm shrink-0 group-hover:border-[#cbf341]/30 transition-colors">
                      <Image
                        src={`https://flagcdn.com/w80/${c.code}.png`}
                        alt={c.name}
                        width={80}
                        height={53}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-bold text-white text-sm sm:text-base leading-tight truncate group-hover:text-[#cbf341] transition-colors">
                        {c.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-zinc-400 truncate">{c.tagline}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex items-center gap-1.5 text-[#cbf341] text-[11px] sm:text-xs font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
                    <span>Start Application</span>
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </m.button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            3. SERVICES SECTION
            ═══════════════════════════════════════════════════════ */}
        <section
          id="services-abroad"
          className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.04)_0%,transparent_70%)]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="flex flex-col items-center text-center mb-10 sm:mb-12 lg:mb-16">
              <m.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[8px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-widest mb-4"
              >
                <Briefcase size={12} />
                <span>What We Offer</span>
              </m.div>

              <m.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-2xl"
              >
                End-to-End <span className="text-[#cbf341]">Study Abroad</span> Services
              </m.h2>

              <m.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl mt-4"
              >
                From the first counseling session to stepping on campus, we
                handle every step so you can focus on your future.
              </m.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {services.map((s, i) => (
                <m.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-gradient-to-br from-[#0c2419] to-[#0a2618] border border-[#143d2a] hover:border-[#cbf341]/30 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#cbf341]/5 overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#cbf341]/10 border border-[#cbf341]/25 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <s.icon size={22} className="text-[#cbf341]" />
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-tight mb-3 group-hover:text-[#cbf341] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            4. WHY CHOOSE US
            ═══════════════════════════════════════════════════════ */}
        <section
          id="why-choose"
          className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-white/[0.03]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="flex flex-col items-center text-center mb-10 sm:mb-12 lg:mb-16">
              <m.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[8px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-widest mb-4"
              >
                <Target size={12} />
                <span>Why Choose Us</span>
              </m.div>

              <m.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-2xl"
              >
                Built on <span className="text-[#cbf341]">Trust,</span> Driven by Results
              </m.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {whyChooseUs.map((w, i) => (
                <m.div
                  key={w.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group text-center bg-[#0a2618]/60 backdrop-blur-sm border border-white/5 hover:border-[#cbf341]/30 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-[#cbf341]/10 border border-[#cbf341]/25 flex items-center justify-center mb-5 group-hover:bg-[#cbf341] group-hover:border-[#cbf341] transition-all duration-300">
                    <w.icon size={28} className="text-[#cbf341] group-hover:text-[#061910] transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-tight mb-2.5">
                    {w.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {w.desc}
                  </p>
                </m.div>
              ))}
            </div>

            {/* Process strip */}
            <div className="mt-14 sm:mt-16 lg:mt-20">
              <div className="text-center mb-8 sm:mb-10">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#cbf341] font-bold mb-2">
                  Our 4-Step Process
                </p>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                  A Clear Path From Dream to Departure
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {processSteps.map((p, i) => (
                  <m.div
                    key={p.num}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="relative bg-[#072418] border border-white/5 rounded-2xl p-5 sm:p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[#cbf341] font-black text-lg sm:text-xl leading-none">
                        {p.num}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-[#cbf341]/40 to-transparent" />
                    </div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-white mb-1.5">
                      {p.title}
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            5. SUCCESS STATISTICS
            ═══════════════════════════════════════════════════════ */}
        <section
          id="stats"
          className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col items-center text-center mb-10 sm:mb-12 lg:mb-16">
              <m.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[8px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-widest mb-4"
              >
                <Award size={12} />
                <span>Proven Results</span>
              </m.div>

              <m.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-2xl"
              >
                Our <span className="text-[#cbf341]">Success</span> in Numbers
              </m.h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {stats.map((s, i) => (
                <m.div
                  key={s.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden bg-gradient-to-br from-[#0a2618] to-[#072418] border border-white/5 hover:border-[#cbf341]/30 rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#cbf341]/5"
                >
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#cbf341]/10 border border-[#cbf341]/25 flex items-center justify-center mb-4">
                      <s.icon size={26} className="text-[#cbf341]" />
                    </div>
                    <p className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#cbf341] leading-none mb-2">
                      {s.value}
                    </p>
                    <p className="text-zinc-300 text-xs sm:text-sm font-semibold whitespace-pre-line leading-tight">
                      {s.label}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>

            {/* Testimonial-style endorsement strip */}
            <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {[
                { name: "Ayesha K.",  country: "United Kingdom", text: "From SOP to visa, the team made everything stress-free." },
                { name: "Rahim S.",    country: "Canada",         text: "Got my Canada study permit on the first attempt — highly recommended." },
                { name: "Maria T.",    country: "Australia",      text: "Scholarship guidance alone saved me $20,000. Best decision ever." },
              ].map((t, i) => (
                <m.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="bg-[#0a2618]/60 border border-white/5 rounded-2xl p-5 sm:p-6"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="fill-[#cbf341] text-[#cbf341]" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#cbf341] flex items-center justify-center text-[#061910] font-black text-xs shrink-0">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-bold leading-tight">{t.name}</p>
                      <p className="text-[#cbf341] text-[10px] font-semibold tracking-wider uppercase">Student · {t.country}</p>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            6. CONSULTATION CTA SECTION (Conversion-focused)
            ═══════════════════════════════════════════════════════ */}
        <section
          id="consultation-cta"
          className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-[#cbf341]/25 bg-gradient-to-br from-[#0a2618] via-[#0b2b1d] to-[#072418] p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-[#cbf341]/10"
            >
              {/* Decorative glows */}
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.15)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.12)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cbf341] to-transparent" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#cbf341]/15 border border-[#cbf341]/30 px-4 py-1.5 rounded-full mb-6">
                  <MessageSquare size={14} className="text-[#cbf341]" />
                  <span className="text-[10px] sm:text-xs font-bold text-[#cbf341] tracking-widest uppercase">Limited Slots This Week</span>
                </div>

                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.1] tracking-tight mb-5 max-w-3xl mx-auto">
                  Ready to Start Your <span className="text-[#cbf341]">Global Education</span> Journey?
                </h2>

                <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
                  Book a free 30-minute counseling session with our senior
                  advisors. Get a personalized roadmap, university shortlist,
                  and scholarship estimate — absolutely free.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <button
                    type="button"
                    onClick={openBookingModal}
                    className="w-full sm:w-auto bg-[#cbf341] hover:bg-[#b5da3a] text-[#061910] px-9 sm:px-12 py-4 sm:py-5 rounded-xl font-black text-base sm:text-lg flex items-center gap-2.5 justify-center transition-all hover:scale-[1.03] shadow-xl shadow-[#cbf341]/30"
                  >
                    <Phone size={20} className="fill-current" />
                    Book Free Counseling
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-zinc-300">
                  {[
                    "No Credit Card Required",
                    "30-Minute Free Session",
                    "100% Confidential",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-1.5">
                      <Check size={14} className="text-[#cbf341]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* ── Slim Footer / Back-to-home bar ── */}
        <footer className="border-t border-white/5 bg-[#05110b]/60 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 text-[#cbf341] shrink-0">
                <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M 30.6 9.4 A 15 15 0 1 0 30.6 29.6" />
                  <path d="M 27.4 12.6 A 10.5 10.5 0 1 0 27.4 27.4" />
                  <path d="M 24.2 15.8 A 6 6 0 1 0 24.2 24.2" strokeWidth="2.2" />
                  <circle cx="20" cy="20" r="1.8" fill="currentColor" />
                </svg>
              </div>
              <span className="font-display font-bold text-white text-sm tracking-wider">I AM HUMAYAN</span>
            </div>

            <p className="text-zinc-500 text-xs sm:text-sm text-center">
              {copyright} · Study Abroad Program
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#cbf341] text-xs sm:text-sm font-semibold transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Home</span>
            </Link>
          </div>
        </footer>
      </div>

      <AbroadLeadForm
        isOpen={isBookingOpen}
        onClose={handleFormClose}
        initialCountry={preselectedCountry ?? undefined}
      />
    </div>
  );
}
