import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, Target, Shield, TrendingUp } from "lucide-react";

export default function Benefits() {
  const comparisonRows = [
    {
      id: "row-1",
      icon: <Target className="w-5 h-5 text-[#cbf341]" />,
      withHR: {
        title: "Results-Driven Focus",
        description: "Measurable outcomes like high ROI, verified leads, and absolute conversions—never vanity metrics.",
      },
      withoutHR: {
        title: "Vanity Metrics Only",
        description: "Focusing on surface-level clicks, traffic spikes, and impressions without actual revenue pipeline growth.",
      },
    },
    {
      id: "row-2",
      icon: <Shield className="w-5 h-5 text-[#cbf341]" />,
      withHR: {
        title: "Bespoke Premium Code",
        description: "Fluid React & Tailwind SPAs built from scratch for maximum speed, ranking, and audit scores.",
      },
      withoutHR: {
        title: "Bloated Templates",
        description: "Bloated theme layouts, heavy script plugins, and slow loading times that hurt organic SEO.",
      },
    },
    {
      id: "row-3",
      icon: <TrendingUp className="w-5 h-5 text-[#cbf341]" />,
      withHR: {
        title: "Direct Active Partnership",
        description: "Work directly with a veteran developer. Clear communication, daily updates, zero bureaucracy.",
      },
      withoutHR: {
        title: "Agency Bureaucracy",
        description: "Messages routed through account managers, causing developer blockages and delayed feedback.",
      },
    },
  ];

  return (
    <section
      id="benefits"
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#061910] text-white transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative concentric ring elements matching Hero & Services */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header centered */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <span>Why Choose Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl"
          >
            The Benefits Of Choosing Us
          </motion.h2>
        </div>

        {/* Comparison Table / Grid Container (Desktop View) */}
        <div className="hidden lg:block relative max-w-5xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/5 z-0" />

          {/* Column Headers */}
          <div className="grid grid-cols-12 gap-4 mb-8 text-center relative z-10">
            <div className="col-span-5 flex items-center justify-end gap-2 pr-6">
              <span className="font-display font-bold text-lg text-white">With HR</span>
              <CheckCircle2 size={18} className="text-[#cbf341]" />
            </div>
            <div className="col-span-2" />
            <div className="col-span-5 flex items-center justify-start gap-2 pl-6">
              <XCircle size={18} className="text-zinc-500" />
              <span className="font-display font-bold text-lg text-zinc-400">Without HR</span>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-8 relative z-10">
            {comparisonRows.map((row, idx) => (
              <div key={row.id} className="grid grid-cols-12 gap-4 items-center">
                
                {/* Left Card: With HR (Right Aligned Text) */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="col-span-5 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#072418] to-[#0a291b]/40 border border-white/5 hover:border-[#cbf341]/20 transition-all duration-300 text-right group"
                >
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#cbf341] transition-colors duration-200">
                    {row.withHR.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-3 leading-relaxed font-sans">
                    {row.withHR.description}
                  </p>
                </motion.div>

                {/* Center Icon Badge */}
                <div className="col-span-2 flex justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, delay: idx * 0.1 }}
                    className="w-12 h-12 rounded-full bg-[#0a291b] border border-[#cbf341]/20 flex items-center justify-center shadow-lg text-[#cbf341] relative z-10"
                  >
                    {row.icon}
                  </motion.div>
                </div>

                {/* Right Card: Without HR (Left Aligned Text) */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="col-span-5 p-6 sm:p-7 rounded-3xl bg-gradient-to-l from-[#072418]/60 to-[#0a291b]/10 border border-white/5 hover:border-white/10 transition-all duration-300 text-left"
                >
                  <h3 className="font-display font-bold text-lg text-zinc-350">
                    {row.withoutHR.title}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-3 leading-relaxed font-sans">
                    {row.withoutHR.description}
                  </p>
                </motion.div>

              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Responsive List (Vertical Stack) */}
        <div className="block lg:hidden space-y-8 sm:space-y-10 md:space-y-12">
          {comparisonRows.map((row, idx) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center gap-5 sm:gap-6"
            >
              {/* Row Icon Badge */}
              <div className="w-12 h-12 rounded-full bg-[#0a291b] border border-[#cbf341]/20 flex items-center justify-center shadow-md text-[#cbf341]">
                {row.icon}
              </div>

              {/* Side-by-Side Mobile Cards or Stacked */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* Positive (With HR) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#072418] border border-white/5 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <CheckCircle2 size={14} className="text-[#cbf341]" />
                    <span className="font-mono text-[9px] text-[#cbf341] tracking-widest font-black uppercase">WITH HR</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white">{row.withHR.title}</h3>
                  <p className="text-zinc-400 text-xs mt-2 leading-relaxed font-sans">{row.withHR.description}</p>
                </div>

                {/* Negative (Without HR) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#072418]/40 border border-white/5 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <XCircle size={14} className="text-zinc-500" />
                    <span className="font-mono text-[9px] text-zinc-500 tracking-widest font-bold uppercase">WITHOUT HR</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-zinc-400">{row.withoutHR.title}</h3>
                  <p className="text-zinc-500 text-xs mt-2 leading-relaxed font-sans">{row.withoutHR.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
