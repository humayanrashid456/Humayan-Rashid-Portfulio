import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "../types";
import {
  Play, Monitor, Search, MapPin, Settings, Tag,
  CheckCircle2, Phone,
  Award, Globe, LineChart, MessageSquare,
  Clock, PhoneCall, Target, Shield, ArrowRight, Star
} from "lucide-react";

interface HeroProps {
  openBookingModal: () => void;
  data?: HeroSection;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero({ openBookingModal, data }: HeroProps) {
  const introVideoUrl = data?.introVideoUrl;
  const videoThumbnail = "/src/assets/images/video_banner.jpg";

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-14 sm:pb-20 bg-[#061910] text-white overflow-hidden min-h-[92vh] flex flex-col justify-center"
    >
      {/* Ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.06)_0%,rgba(6,25,16,0)_70%)]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(203,243,65,0.04)_0%,rgba(6,25,16,0)_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* ─── Main 2-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-y-12 lg:gap-x-[100px]">

          {/* ── Left: Video Card (Col 5) ── */}
          <motion.div
            className="lg:col-span-5 relative w-full"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
          >
            <div className="bg-gradient-to-br from-[#0a2618] to-[#071c12] rounded-2xl border border-white/5 shadow-2xl shadow-[#cbf341]/5 overflow-hidden w-full">

              {/* Video Container */}
              <div
                className="relative aspect-video w-full bg-[#05110b] cursor-pointer group"
                onClick={() => alert("Play Video clicked! Check the console for the video link.")}
              >
                {/* Intro Video Pulse Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#cbf341] animate-pulse" />
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">Intro Video</span>
                </div>

                {/* Video Player */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  {introVideoUrl ? (
                    (() => {
                      const isYoutube = introVideoUrl.includes("youtube.com") || introVideoUrl.includes("youtu.be");
                      if (isYoutube) {
                        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                        const match = introVideoUrl.match(regExp);
                        const videoId = (match && match[2].length === 11) ? match[2] : "";
                        if (videoId) {
                          return (
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&playsinline=1&modestbranding=1&rel=0&showinfo=0`}
                              className="w-full h-[140%] -translate-y-[20%] object-cover pointer-events-none opacity-80"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          );
                        }
                      }
                      return (
                        <video
                          src={introVideoUrl}
                          autoPlay muted loop playsInline
                          className="w-full h-full object-contain opacity-90"
                          poster={videoThumbnail}
                        />
                      );
                    })()
                  ) : (
                    <img src={videoThumbnail} alt="Thumbnail" className="w-full h-full object-contain opacity-90" />
                  )}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[3px] border-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-black/50">
                    <Play size={28} className="fill-[#cbf341] text-[#cbf341] ml-1.5" />
                  </div>
                </div>
              </div>

              {/* Bottom Tabs */}
              <div
                className="px-4 py-4 bg-[#05110b] flex items-center justify-between border-t border-white/5 overflow-x-auto gap-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {[
                  { icon: Monitor, label: "WEBSITES" },
                  { icon: Search, label: "SEO" },
                  { icon: MapPin, label: "LOCAL SEO" },
                  { icon: Settings, label: "AUTOMATION" },
                  { icon: Tag, label: "BRANDING" },
                ].map((tab, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 min-w-fit opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                    <tab.icon size={18} className="text-[#cbf341]" />
                    <span className="text-[10px] font-bold tracking-widest text-white uppercase">{tab.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Caption below video */}
            <div className="mt-4 flex items-center gap-2 opacity-50 ml-2">
              <Clock size={14} />
              <span className="text-sm">90 Second Introduction</span>
            </div>
          </motion.div>

          {/* ── Right: Hero Content (Col 7) ── */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
          >


            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={3}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-black leading-[1.08] tracking-tight text-white mb-5"
            >
              Hi, I'm{" "}
              <span className="text-[#cbf341] relative">
                Humayan Rashid.
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#cbf341]/60 to-transparent rounded-full" />
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              custom={4}
              className="text-base sm:text-lg text-zinc-300 mb-8 max-w-xl leading-relaxed"
            >
              Helping USA Local Businesses grow through high-converting{" "}
              <span className="text-white font-semibold">Web Design</span>,{" "}
              <span className="text-white font-semibold">SEO</span> &amp;{" "}
              <span className="text-white font-semibold">Automation</span> — so you get more calls, leads and revenue.
            </motion.p>

            {/* Feature checklist */}
            <motion.div
              variants={fadeUp}
              custom={5}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8"
            >
              {[
                "High Converting Websites",
                "Automation & Funnels",
                "SEO & Local SEO",
                "Ongoing Growth Support",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-[#cbf341] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-zinc-200 font-medium leading-tight">{item}</span>
                </div>
              ))}
            </motion.div>



            {/* CTA Buttons */}
            <motion.div variants={fadeUp} custom={7} className="flex flex-wrap items-center gap-4">
              <button
                onClick={openBookingModal}
                className="bg-[#cbf341] hover:bg-[#b5da3a] text-[#061910] px-7 sm:px-9 py-4 rounded-xl font-black text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-[1.03] shadow-lg shadow-[#cbf341]/20 w-full sm:w-auto justify-center"
              >
                <Phone size={18} className="fill-current" />
                Book A Free Strategy Call
              </button>

              <button
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-5 py-4 rounded-xl font-bold text-sm sm:text-base text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200 w-full sm:w-auto justify-center"
              >
                View My Work
                <ArrowRight size={16} />
              </button>
            </motion.div>


          </motion.div>

        </div>

        {/* ─── Bottom Trust Bar ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 bg-[#081d13] border border-white/5 rounded-2xl px-6 py-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-6 text-sm text-zinc-300">
            {[
              { icon: Clock, text: "USA Time Zone Support" },
              { icon: PhoneCall, text: "Fast Response" },
              { icon: Target, text: "100% Focus on Results" },
              { icon: Shield, text: "Trusted by Local Businesses" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon size={20} className="text-[#cbf341] shrink-0" />
                <span className="font-medium text-white">{item.text}</span>
                {i < 3 && <div className="hidden sm:block w-px h-6 bg-white/10 ml-6" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer subtle text */}
        <div className="mt-10 flex items-center justify-center gap-4 opacity-60">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#cbf341]/50" />
          <span className="text-[10px] font-bold text-[#cbf341] uppercase tracking-widest">RESULTS THAT MATTER</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#cbf341]/50" />
        </div>

      </div>
    </section>
  );
}
