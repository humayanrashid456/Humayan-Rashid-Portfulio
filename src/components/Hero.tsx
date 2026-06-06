import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, RotateCw } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { HeroSection } from "../types";

// Dynamic video resolver supporting local files, Base64 data URLs, custom media paths, and YouTube links/IDs
export function getVideoSource(idOrUrl: string): { isYoutube: boolean; src: string } {
  if (!idOrUrl) {
    return { isYoutube: true, src: "dQw4w9WgXcQ" };
  }
  
  const trimmed = idOrUrl.trim();

  // If it's a Base64 data URL, blob, or generic direct file signature
  if (
    trimmed.startsWith("data:") || 
    trimmed.startsWith("blob:") || 
    trimmed.endsWith(".mp4") || 
    trimmed.endsWith(".webm") || 
    trimmed.endsWith(".ogg")
  ) {
    return { isYoutube: false, src: trimmed };
  }

  // Matches YouTube URLs to extract the actual 11-char ID safely
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return { isYoutube: true, src: ytMatch[1] };
  }

  // If it looks like an ID with no special path symbols
  if (trimmed.length === 11 && !trimmed.includes("/") && !trimmed.includes(".")) {
    return { isYoutube: true, src: trimmed };
  }

  // External video file linked directly (fallback to direct player if it's standard HTTP/S link)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return { isYoutube: false, src: trimmed };
  }

  return { isYoutube: true, src: trimmed };
}

interface HeroProps {
  openBookingModal: () => void;
  data?: HeroSection;
}

export default function Hero({ openBookingModal, data }: HeroProps) {
  const [spin, setSpin] = useState(false);

  const heroDesc = data?.shortDesc || "Boost your business with tested online methods. Get more customers, increase sales, and stand out online—naturally and effectively. Let's grow together!";
  const ctaText = data?.ctaPrimaryText || "Get free Consultation";

  const services = ["Custom Websites", "AI Agents", "Marketing Systems"];

  const triggerSpin = () => {
    setSpin(true);
    setTimeout(() => setSpin(false), 600);
  };

return (
    <section
      id="home"
      className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-14 sm:pb-16 md:pb-20 lg:pb-24 overflow-hidden bg-gradient-to-br from-[#061910] to-[#0b2b1d] text-white transition-colors duration-300"
    >
      {/* Ambient gradients and concentric rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="absolute w-[800px] h-[800px] sm:w-[1200px] sm:h-[1200px] rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.08)_0%,rgba(6,25,16,0)_65%)] sm:block hidden" />
        <div className="absolute w-[300px] h-[300px] sm:hidden border border-[#cbf341]/10" />
        <div className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full border border-[#cbf341]/10 sm:block hidden" />
        <div className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full border border-[#cbf341]/10 sm:block hidden" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#122e20]/65 border border-white/5 text-[#cbf341] text-[11px] sm:text-xs lg:text-[13px] font-semibold tracking-wide mb-5 sm:mb-6 backdrop-blur-md"
          >
            <span>We are world top marketing agency</span>
          </motion.div>

          {/* Heading — Premium editorial serif, primary visual focus */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black tracking-tight text-white text-[26px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] leading-[1.15] max-w-full sm:max-w-4xl px-2 sm:px-4"
          >
            Humayan Helps Businesses
          </motion.h1>

          {/* Subheading — static "Grow With →" (editorial serif) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 sm:mt-7 flex items-center justify-center gap-x-3 text-white font-editorial font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]"
          >
            <span className="whitespace-nowrap">Grow With</span>
            <ArrowRight
              aria-hidden="true"
              className="w-[0.6em] h-[0.6em] -mb-[0.1em] text-white"
              strokeWidth={2}
            />
          </motion.div>

          {/* Typing animation — gradient, centered, no layout shift */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-2 sm:mt-3 font-display font-bold tracking-tight text-base sm:text-lg md:text-xl lg:text-2xl leading-tight"
          >
            <span
              className="inline-grid justify-items-center"
              style={{ gridTemplateColumns: "minmax(0, 1fr)" }}
            >
              <span
                aria-hidden="true"
                className="invisible whitespace-nowrap pointer-events-none select-none"
                style={{ gridArea: "1 / 1" }}
              >
                Marketing Systems
              </span>
              <span
                className="flex items-baseline justify-center whitespace-nowrap"
                style={{ gridArea: "1 / 1" }}
              >
                <TypeAnimation
                    sequence={services.flatMap((s) => [s, 1800])}
                    wrapper="span"
                    cursor={false}
                    speed={55}
                    deletionSpeed={45}
                    repeat={Infinity}
                    className="!inline-block !m-0 !p-0 whitespace-nowrap align-baseline font-extrabold"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #ff8a3d 0%, #ff4d8d 50%, #a855f7 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                      fontWeight: 800,
                    }}
                  />
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] rounded-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, #ff8a3d 0%, #ff4d8d 50%, #a855f7 100%)",
                    animation: "rtb-cursor-blink 1s steps(1) infinite",
                  }}
                />
              </span>
            </span>
          </motion.div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-[13px] sm:text-base md:text-base leading-relaxed mt-5 sm:mt-6 px-3 sm:px-4 max-w-full sm:max-w-2xl"
          >
            {heroDesc}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-7 sm:mt-8 px-4 sm:px-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openBookingModal}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#cbf341] bg-transparent hover:bg-[#cbf341] text-white hover:text-[#061910] font-bold text-sm sm:text-sm tracking-wider shadow-xl shadow-[#cbf341]/10 transition-all cursor-pointer active:scale-95"
            >
              <ArrowUpRight size={15} strokeWidth={2.5} />
              <span>{ctaText}</span>
            </motion.button>
          </motion.div>

          {/* Partners Board */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full px-4 mt-12 sm:mt-16 lg:mt-20 relative border border-white/10 bg-[#122e20]/25 backdrop-blur-md rounded-[24px] py-7 sm:py-8 lg:py-9 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center max-w-5xl sm:max-w-6xl lg:max-w-4xl mx-auto"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#122e20]/90 border border-white/10 text-[10px] sm:text-xs font-medium text-white/80 flex items-center gap-2 whitespace-nowrap shadow-lg backdrop-blur-md justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cbf341]" />
              <span>Trusted by top companies worldwide</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#cbf341]" />
            </div>

            {/* Partners */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-4 sm:gap-y-5 lg:gap-y-6 w-full text-white/60 select-none px-2 sm:px-4 mt-2">
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <span className="font-serif font-black text-lg sm:text-xl tracking-tight">Brandora</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <div className="w-4 h-4 rounded-full border-2 border-white/60 flex items-center justify-center text-[7px] font-bold text-white/60 leading-none">L</div>
                <span className="font-sans font-bold text-base sm:text-lg tracking-wide">Lumovia</span>
              </div>
              <div className="flex items-center hover:text-white transition-colors cursor-default">
                <span className="font-sans font-black tracking-widest text-sm sm:text-base">MARKABLY</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <svg className="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="font-display font-extrabold text-base sm:text-lg tracking-wider">Nexora</span>
              </div>
              <div className="flex items-center hover:text-white transition-colors cursor-default">
                <span className="font-serif italic font-semibold text-base sm:text-lg tracking-tight">Adthentic</span>
              </div>
              <div className="flex items-center gap-1 hover:text-white transition-colors cursor-default">
                <span className="font-sans font-black text-base sm:text-lg">Optivise</span>
              </div>
            </div>

            {/* Refresh button */}
            <button
              onClick={triggerSpin}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-[#cbf341] text-[#061910] hover:bg-[#b2d932] shadow-lg shadow-[#cbf341]/25 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
              aria-label="Refresh partners"
            >
              <RotateCw size={16} strokeWidth={2} className={`transition-transform duration-500 ${spin ? "rotate-180" : ""}`} />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
