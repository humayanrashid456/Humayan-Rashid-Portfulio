import React from "react";
import { motion } from "motion/react";
import { Check, Phone, ArrowUpRight, FileText, Users, DollarSign, Layers, RefreshCw } from "lucide-react";
import { AboutSection, Skill } from "../types";

interface AboutProps {
  data?: AboutSection;
  customSkills?: Skill[];
}

export default function About({ data, customSkills }: AboutProps) {
  const aboutPresentationImg = "/src/assets/images/about_us_presentation.png";

  const features = [
    "Tailored Strategies for Every Business",
    "Comprehensive Service Offerings",
    "Results-Driven Digital Growth"
  ];

  const stats = [
    {
      value: "900+",
      label: "Successful Projects",
      icon: <FileText className="w-5 h-5 text-[#cbf341]" />
    },
    {
      value: "98%",
      label: "Client Satisfaction Rate",
      icon: <Users className="w-5 h-5 text-[#cbf341]" />
    },
    {
      value: "$10M+",
      label: "Revenue Generated",
      icon: <DollarSign className="w-5 h-5 text-[#cbf341]" />
    },
    {
      value: "25+",
      label: "Industry Platforms",
      icon: <Layers className="w-5 h-5 text-[#cbf341]" />
    }
  ];

  const marqueeItems = [
    "Research & Analysis",
    "Search Engine Optimization",
    "Digital Marketing",
    "Social Media Marketing",
    "Content Marketing",
    "Branding Services"
  ];

  // Quadruple items to ensure absolute seamless overflow marquee loop on larger viewports
  const doubleMarquee = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section
      id="about"
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#061910] text-[#fafafa] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Section: Text & Image */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-20">
          
          {/* Left Column */}
          <div className="flex-1 w-full">
            {/* Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <span>About Us</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] mb-6 max-w-xl"
            >
              Expert Digital Marketing Solutions For Every Size
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-10 max-w-xl"
            >
              Digital marketing agencies are versatile partners, offering customized strategies that cater to diverse business goals, whether for burgeoning startups or established corporations.
            </motion.p>

            {/* Feature Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#0c2619] p-6 sm:p-8 rounded-[2rem] border border-[#143d2a] max-w-xl shadow-lg"
            >
              <ul className="space-y-4 mb-8">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-transparent border border-[#cbf341] flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#cbf341]" />
                    </div>
                    <span className="text-white text-sm font-medium">{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("portfolio:open-booking"));
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#cbf341] hover:bg-[#b8de3b] text-[#061910] font-bold rounded-full transition-colors flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Get In Touch
                </button>
                <div className="flex items-center gap-2 text-white">
                  <Phone className="w-4 h-4 text-[#cbf341]" />
                  <span className="font-bold text-sm tracking-wide">+12 (00) 356 7890</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="w-full h-full min-h-[400px] lg:min-h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-[#cbf341]/10">
              <img
                src={aboutPresentationImg}
                alt="Team working together"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto pt-8 border-t border-white/5">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-[#0a291b] border border-[#cbf341]/25 flex items-center justify-center mt-1">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-1">
                  {stat.value}
                </span>
                <span className="text-zinc-400 text-xs sm:text-sm font-medium">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="mt-20 w-full overflow-hidden bg-[#0a291b]/50 border-y border-[#cbf341]/10 py-3 sm:py-4">
        <div className="flex w-fit animate-[marquee_20s_linear_infinite]">
          {doubleMarquee.map((item, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-8 px-4 sm:px-6 whitespace-nowrap">
              <RefreshCw className="w-4 h-4 text-[#cbf341]" />
              <span className="text-white text-xs sm:text-sm font-bold tracking-wider">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
