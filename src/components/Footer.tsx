import React, { useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { FooterSection, ContactSection } from "../types";

export default function Footer({ data, contactData }: { data?: FooterSection; contactData?: ContactSection }) {
  const [newsEmail, setNewsEmail] = useState("");
  const [success, setSuccess] = useState(false);
  
  const copyrightText = `© [2025] BRIQ'S. All rights reserved. Designed by BRIQ'S. Powered by Webflow.`;
  const emailVal = contactData?.email || "support@domain.com";
  const phoneVal = contactData?.phone || "+12 (00) 345 67890";
  const addressVal = contactData?.address || "45 Oak St. Springfield, IL";

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSuccess(true);
    setNewsEmail("");
    setTimeout(() => {
      setSuccess(false);
    }, 4500);
  };

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#contact" },
    { label: "Blogs", href: "#blog" },
  ];

  const supportLinks = [
    { label: "Teams", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact us", href: "#contact" },
  ];

  const utilitiesLinks = [
    { label: "Style Guide", href: "", staticOnly: true },
    { label: "Instructions", href: "", staticOnly: true },
    { label: "Licenses", href: "", staticOnly: true },
    { label: "Change Log", href: "", staticOnly: true },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
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
      }
    }
  };

  return (
    <footer
      id="footer-root"
      className="bg-[#061910] text-white transition-colors duration-300 pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-12 md:pb-16 relative overflow-visible px-0"
    >
      <div className="w-[92%] sm:w-[85%] lg:w-[80%] mx-auto relative">
        
        {/* Floating Contact Bar */}
        <div 
          id="floating-contact-bar"
          className="relative lg:absolute -mb-8 lg:mb-0 lg:-top-[60px] lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-[95%] xl:w-[90%] z-20 bg-[#214332] rounded-3xl py-6 px-5 sm:px-8 lg:px-10 shadow-xl border border-white/5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-4 items-center">

            {/* Column 1: Logo - full width centered on mobile */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-center gap-3 justify-center lg:justify-start lg:border-r border-white/10 pb-5 lg:pb-0 lg:pr-6 border-b lg:border-b-0">
              <div className="relative w-10 h-10 text-[#cbf341] shrink-0">
                <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M 30.6 9.4 A 15 15 0 1 0 30.6 29.6" />
                  <path d="M 27.4 12.6 A 10.5 10.5 0 1 0 27.4 27.4" />
                  <path d="M 24.2 15.8 A 6 6 0 1 0 24.2 24.2" strokeWidth="2.2" />
                  <circle cx="20" cy="20" r="1.8" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-black tracking-wider text-white text-xl leading-none">
                  BRIQ'S
                </span>
                <span className="font-sans text-[7px] font-bold tracking-[0.2em] text-white/70 uppercase leading-none mt-1">
                  MARKETING AGENCY
                </span>
              </div>
            </div>

            {/* Column 2: Phone */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left lg:border-r border-white/10 lg:px-6 min-w-0">
              <div className="w-9 h-9 rounded-lg border border-[#cbf341]/30 flex items-center justify-center text-[#cbf341] shrink-0 bg-[#0a291b]/30">
                <Phone size={16} strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 overflow-hidden">
                <span className="text-[10px] sm:text-[11px] text-zinc-300 font-medium leading-none">Call Us On</span>
                <a href={`tel:${phoneVal}`} className="font-display text-xs sm:text-sm font-bold text-white hover:text-[#cbf341] transition-colors block leading-tight truncate" title={phoneVal}>
                  {phoneVal}
                </a>
              </div>
            </div>

            {/* Column 3: Email */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left lg:border-r border-white/10 lg:px-6 min-w-0">
              <div className="w-9 h-9 rounded-lg border border-[#cbf341]/30 flex items-center justify-center text-[#cbf341] shrink-0 bg-[#0a291b]/30">
                <Mail size={16} strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 overflow-hidden">
                <span className="text-[10px] sm:text-[11px] text-zinc-300 font-medium leading-none">Email Us</span>
                <a href={`mailto:${emailVal}`} className="font-display text-xs sm:text-sm font-bold text-white hover:text-[#cbf341] transition-colors block leading-tight truncate" title={emailVal}>
                  {emailVal}
                </a>
              </div>
            </div>

            {/* Column 4: Address - full width centered on mobile */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left pt-5 lg:pt-0 border-t lg:border-t-0 border-white/10 lg:px-6 min-w-0 overflow-hidden">
              <div className="w-9 h-9 rounded-lg border border-[#cbf341]/30 flex items-center justify-center text-[#cbf341] shrink-0 bg-[#0a291b]/30">
                <MapPin size={16} strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 overflow-hidden">
                <span className="text-[10px] sm:text-[11px] text-zinc-300 font-medium leading-none">Our Address</span>
                <span className="font-display text-xs sm:text-sm font-bold text-white block leading-tight truncate" title={addressVal}>
                  {addressVal}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Container */}
        <div 
          id="main-footer-card"
          className="bg-gradient-to-b from-[#0b2e24] to-[#133c31] border border-white/10 rounded-2xl sm:rounded-3xl lg:rounded-[32px] pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-10 px-5 sm:px-8 md:px-10 lg:px-16 shadow-2xl relative z-10 min-h-[350px] flex flex-col justify-between"
        >
          {/* Footer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-12 border-b border-white/10">
            
            {/* Left section: Newsletter & Socials */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left">
              <div className="space-y-3">
                <h3 className="font-display font-black text-2xl lg:text-3xl text-white tracking-tight leading-tight">
                  Subscribe Newsletter
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-md font-sans mx-auto lg:mx-0">
                  Get the latest news, updates, and exclusive content delivered straight to your inbox.
                </p>
              </div>

              {/* Newsletter Form */}
              <form onSubmit={handleNewsSubmit} className="relative max-w-sm w-full mx-auto lg:mx-0">
                {!success ? (
                  <div className="relative flex items-center">
                    <input
                      id="newsletter-email-input"
                      type="email"
                      required
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-[#0b251e] border border-white/10 rounded-2xl py-3.5 pl-5 pr-14 text-base md:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#cbf341]/50 focus:ring-1 focus:ring-[#cbf341]/50 transition-all font-sans font-medium"
                    />
                    <button
                      id="newsletter-submit-btn"
                      type="submit"
                      className="w-9 h-9 rounded-xl bg-[#cbf341] text-[#0b2e24] flex items-center justify-center absolute right-1.5 hover:bg-[#bce039] transition-all cursor-pointer shadow-md"
                    >
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                ) : (
                  <div
                    id="newsletter-success-container"
                    className="flex items-center gap-2.5 p-3.5 bg-[#0b251e] rounded-2xl border border-[#cbf341]/20 text-xs text-[#cbf341] shadow-lg w-full"
                  >
                    <CheckCircle size={14} className="text-[#cbf341] shrink-0" />
                    <span>Subscribed successfully!</span>
                  </div>
                )}
              </form>

              {/* Social Channels */}
              <div className="space-y-3 mt-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-zinc-400 text-center lg:text-left">
                  Find Us:
                </h4>
                <div className="flex gap-2.5 justify-center lg:justify-start">
                  {/* Instagram */}
                  <span
                    title="Instagram — link coming soon"
                    className="w-9 h-9 rounded-full bg-[#0b251e] border border-white/10 text-zinc-500 flex items-center justify-center shadow-sm cursor-not-allowed select-none"
                    aria-label="Instagram (coming soon)"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                    </svg>
                  </span>
                  {/* LinkedIn */}
                  <span
                    title="LinkedIn — link coming soon"
                    className="w-9 h-9 rounded-full bg-[#0b251e] border border-white/10 text-zinc-500 flex items-center justify-center shadow-sm cursor-not-allowed select-none"
                    aria-label="LinkedIn (coming soon)"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </span>
                  {/* X (Twitter) */}
                  <span
                    title="X — link coming soon"
                    className="w-9 h-9 rounded-full bg-[#0b251e] border border-white/10 text-zinc-500 flex items-center justify-center shadow-sm cursor-not-allowed select-none"
                    aria-label="X (coming soon)"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </span>
                  {/* Pinterest */}
                  <span
                    title="Pinterest — link coming soon"
                    className="w-9 h-9 rounded-full bg-[#0b251e] border border-white/10 text-zinc-500 flex items-center justify-center shadow-sm cursor-not-allowed select-none"
                    aria-label="Pinterest (coming soon)"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.007-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.211-.174.257-.402.15-1.503-.699-2.44-2.895-2.44-4.652 0-3.79 2.757-7.269 7.935-7.269 4.166 0 7.4 2.97 7.4 6.942 0 4.14-2.611 7.472-6.233 7.472-1.219 0-2.364-.633-2.757-1.38l-.75 2.853c-.27 1.04-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                    </svg>
                  </span>
                  {/* TikTok */}
                  <span
                    title="TikTok — link coming soon"
                    className="w-9 h-9 rounded-full bg-[#0b251e] border border-white/10 text-zinc-500 flex items-center justify-center shadow-sm cursor-not-allowed select-none"
                    aria-label="TikTok (coming soon)"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.52-4.06-1.47-.73-.59-1.32-1.35-1.72-2.22-.05 1.78-.02 3.56-.04 5.34-.04 2.67-.88 5.43-2.92 7.15-2.02 1.73-4.96 2.25-7.5 1.55-2.58-.69-4.83-2.72-5.54-5.29-.79-2.85-.02-6.12 2.06-8.16 1.83-1.83 4.54-2.42 7.02-1.7v4.09c-1.35-.45-2.88-.13-3.92.83-1.12 1.01-1.47 2.74-1.04 4.19.4 1.34 1.7 2.38 3.1 2.49 1.63.15 3.32-.82 3.86-2.36.27-.71.32-1.48.3-2.23l-.04-11.45z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Right section: Links (Quick Links, Support, Utilities) */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-4 sm:gap-4 md:gap-8 text-left">
              {/* Column 1: Quick Links */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#cbf341] uppercase tracking-wider">
                  Quick Links
                </h4>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {quickLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="font-medium text-xs sm:text-sm text-zinc-350 hover:text-[#cbf341] transition-colors leading-relaxed hover:underline min-h-[28px] flex items-center"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2: Support */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#cbf341] uppercase tracking-wider">
                  Support
                </h4>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {supportLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="font-medium text-xs sm:text-sm text-zinc-350 hover:text-[#cbf341] transition-colors leading-relaxed hover:underline min-h-[28px] flex items-center"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 3: Utilities */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#cbf341] uppercase tracking-wider">
                  Utilities
                </h4>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {utilitiesLinks.map((item) =>
                    item.staticOnly ? (
                      <span
                        key={item.label}
                        title="Coming soon"
                        className="font-medium text-xs sm:text-sm text-zinc-500 cursor-not-allowed select-none leading-relaxed min-h-[28px] flex items-center"
                      >
                        {item.label}
                      </span>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className="font-medium text-xs sm:text-sm text-zinc-350 hover:text-[#cbf341] transition-colors leading-relaxed hover:underline min-h-[28px] flex items-center"
                      >
                        {item.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Area (Divider + Copyright) */}
          <div className="pt-6 sm:pt-8 text-center border-t border-white/10">
            <span className="font-sans text-[11px] sm:text-xs text-zinc-500 tracking-wide font-medium block max-w-xs sm:max-w-none mx-auto leading-relaxed px-2">
              {copyrightText}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
