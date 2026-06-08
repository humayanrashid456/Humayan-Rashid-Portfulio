import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Megaphone, Search, MousePointerClick, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Service } from "../types";
const socialMediaImg = "/src/assets/images/social_media_team.png";
const seoAnalysisImg = "/src/assets/images/seo_analysis_team.png";
const ppcAdvertisingImg = "/src/assets/images/ppc_advertising_team.png";

interface ServicesProps {
  openBookingModal: () => void;
  data?: Service[];
}

export default function Services({ openBookingModal, data }: ServicesProps) {
  const navigate = useNavigate();

  // Define screenshot services structure as default — IDs must align with CMS data.ts
  const servicesList = [
    {
      id: "web-dev",
      title: "Web Development",
      description: "Custom visual experiences built using standard React, TypeScript, and high-performance server logic. Focused on structural design patterns and optimized bundle sizes.",
      image: socialMediaImg,
      icon: <Megaphone className="w-5 h-5 text-[#cbf341]" />
    },
    {
      id: "seo-opt",
      title: "SEO Optimization",
      description: "Comprehensive audits, speed diagnostics, and core structural metadata integrations designed to rise to the top of Google indices.",
      image: seoAnalysisImg,
      icon: <Search className="w-5 h-5 text-[#cbf341]" />
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      description: "Crafting immersive user flows, dynamic interactive states, and pixel-accurate wireframes designed to lock in visual dominance and improve metrics.",
      image: ppcAdvertisingImg,
      icon: <MousePointerClick className="w-5 h-5 text-[#cbf341]" />
    }
  ];

  return (
    <section
      id="services"
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#061910] text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Title Group header (Centered) */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[8px] sm:text-[10px] lg:text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <span>Our Services</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-full sm:max-w-2xl"
          >
            Our Digital Services To Grow Your Brand
          </motion.h2>
        </div>

        {/* Card Deck Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {servicesList.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              onClick={() => navigate(`/services/${srv.id}`)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(`/services/${srv.id}`);
                }
              }}
              className="group flex flex-col p-6 sm:p-8 rounded-[2rem] bg-[#0c2419] border border-[#143d2a] shadow-lg hover:border-[#cbf341]/30 cursor-pointer transition-colors duration-300"
            >
              {/* Rounded square icon holder */}
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-transparent border border-[#cbf341]/30 flex items-center justify-center text-[#cbf341] mb-8 group-hover:bg-[#cbf341]/10 transition-colors">
                {srv.icon}
              </div>

              {/* Service Title + arrow */}
              <div className="flex items-start justify-between gap-2 mb-6">
                <h3 className="font-display text-2xl sm:text-[28px] font-bold text-white leading-tight group-hover:text-[#cbf341] transition-colors">
                  {srv.title}
                </h3>
                <ArrowUpRight size={20} className="text-[#cbf341] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1.5" />
              </div>

              {/* Separator */}
              <div className="h-[1px] w-full bg-white/10 mb-6" />

              {/* Service Description text */}
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 flex-grow">
                {srv.description}
              </p>

              {/* Service Card Photographic Asset */}
              <div className="overflow-hidden rounded-2xl aspect-[4/3] w-full">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-row sm:flex-row items-center justify-center gap-3 mt-8 sm:mt-10 lg:mt-12"
        >
          <button
            onClick={openBookingModal}
            className="w-11 h-11 sm:w-10 sm:h-10 rounded-full border border-[#cbf341]/25 hover:border-[#cbf341] text-white hover:text-[#cbf341] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Book a consultation"
          >
            <ChevronLeft size={18} className="w-5 h-5" />
          </button>
          <button
            onClick={openBookingModal}
            className="w-11 h-11 sm:w-10 sm:h-10 rounded-full border border-[#cbf341]/25 hover:border-[#cbf341] text-white hover:text-[#cbf341] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Book a consultation"
          >
            <ChevronRight size={18} className="w-5 h-5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
