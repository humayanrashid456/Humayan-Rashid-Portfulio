"use client";

import Image from "next/image";
import { m } from "motion/react";
import { Check, Phone, ArrowUpRight, RefreshCw } from "lucide-react";
import { useBooking } from "@/components/providers/BookingProvider";
import Icon from "@/components/ui/Icon";
import type { HomeContent } from "@/lib/content/home";

interface AboutProps {
  content: HomeContent["about"];
  phone: string;
}

export default function About({ content, phone }: AboutProps) {
  const { openBooking } = useBooking();
  const { features, stats } = content;

  // Quadruple items to ensure absolute seamless overflow marquee loop on larger viewports
  const doubleMarquee = [...content.marquee, ...content.marquee, ...content.marquee, ...content.marquee];

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
            <m.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <span>{content.eyebrow}</span>
            </m.div>

            {/* Title */}
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] mb-6 max-w-xl"
            >
              {content.title}
            </m.h2>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-10 max-w-xl"
            >
              {content.description}
            </m.p>

            {/* Feature Card */}
            <m.div
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
                  type="button"
                  onClick={openBooking}
                  className="w-full sm:w-auto px-6 py-3 bg-[#cbf341] hover:bg-[#b8de3b] text-[#061910] font-bold rounded-full transition-colors flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  {content.ctaLabel}
                </button>
                {phone && (
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2 text-white hover:text-[#cbf341] transition-colors">
                    <Phone className="w-4 h-4 text-[#cbf341]" />
                    <span className="font-bold text-sm tracking-wide">{phone}</span>
                  </a>
                )}
              </div>
            </m.div>
          </div>

          {/* Right Column: Image */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-[#cbf341]/10">
              <Image
                src={content.image.url}
                alt={content.image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </m.div>
          
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto pt-8 border-t border-white/5">
          {stats.map((stat, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-[#0a291b] border border-[#cbf341]/25 flex items-center justify-center mt-1">
                <Icon name={stat.icon} className="w-5 h-5 text-[#cbf341]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-1">
                  {stat.value}
                </span>
                <span className="text-zinc-400 text-xs sm:text-sm font-medium">
                  {stat.label}
                </span>
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Marquee Ticker */}
      {content.marquee.length > 0 && (
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
      )}
    </section>
  );
}
