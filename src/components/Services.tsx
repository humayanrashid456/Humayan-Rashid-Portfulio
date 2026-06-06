import React from "react";
import { motion } from "motion/react";
import { Megaphone, Search, MousePointerClick, ChevronLeft, ChevronRight } from "lucide-react";
import { Service } from "../types";
const socialMediaImg = "/src/assets/images/social_media_team.png";
const seoAnalysisImg = "/src/assets/images/seo_analysis_team.png";
const ppcAdvertisingImg = "/src/assets/images/ppc_advertising_team.png";

interface ServicesProps {
  openBookingModal: () => void;
  data?: Service[];
}

export default function Services({ openBookingModal, data }: ServicesProps) {
  // Define screenshot services structure as default
  const servicesList = [
    {
      id: "social-media",
      title: "Social Media Management",
      description: "Boost your website's visibility on Google through keyword research, on-page optimization, and backlink strategies.",
      image: socialMediaImg,
      icon: <Megaphone className="w-5 h-5 text-[#cbf341]" />
    },
    {
      id: "seo",
      title: "Search Engine Optimization (SEO)",
      description: "Boost your website's visibility on Google through keyword research, on-page optimization, and backlink strategies.",
      image: seoAnalysisImg,
      icon: <Search className="w-5 h-5 text-[#cbf341]" />
    },
    {
      id: "ppc",
      title: "Pay-Per-Click Advertising (PPC)",
      description: "Drive targeted traffic to your site with cost-effective ad campaigns on Google Ads and social media.",
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
              className="group flex flex-col p-6 sm:p-8 rounded-[2rem] bg-[#0c2419] border border-[#143d2a] shadow-lg hover:border-[#cbf341]/30 transition-colors duration-300"
            >
              {/* Rounded square icon holder */}
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-transparent border border-[#cbf341]/30 flex items-center justify-center text-[#cbf341] mb-8">
                {srv.icon}
              </div>

              {/* Service Title */}
              <h3 className="font-display text-2xl sm:text-[28px] font-bold text-white leading-tight mb-6">
                {srv.title}
              </h3>

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
            aria-label="Previous service"
          >
            <ChevronLeft size={18} className="w-5 h-5" />
          </button>
          <button
            onClick={openBookingModal}
            className="w-11 h-11 sm:w-10 sm:h-10 rounded-full border border-[#cbf341]/25 hover:border-[#cbf341] text-white hover:text-[#cbf341] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next service"
          >
            <ChevronRight size={18} className="w-5 h-5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
