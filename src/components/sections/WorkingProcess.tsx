"use client";

import Image from "next/image";
import { m } from "motion/react";
import Icon from "@/components/ui/Icon";
import type { HomeContent } from "@/lib/content/home";

export default function WorkingProcess({ content }: { content: HomeContent["process"] }) {
  const steps = content.steps.map((step, i) => ({
    ...step,
    number: String(i + 1).padStart(2, "0"),
    icon: <Icon name={step.icon} className="w-5 h-5 text-[#cbf341]" />,
  }));

  return (
    <section
      id="process"
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#061910] text-white transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative ambient background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#cbf341]/2 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Title (Centered) */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-16">
          <m.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <span>{content.eyebrow}</span>
          </m.div>

          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl"
          >
            {content.title}
          </m.h2>
        </div>

        {/* Desktop Interactive Layout (Hidden on Mobile/Tablet) */}
        <div className="hidden lg:block relative w-full max-w-5xl mx-auto h-[620px]">
          
          {/* Connector Lines Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            {/* Left line: Step 1 icon to Image edge */}
            <path
              d="M 170,164 Q 231,164 292,225"
              fill="none"
              stroke="#cbf341"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-30"
            />
            {/* Right line: Step 4 icon to Image edge */}
            <path
              d="M 854,164 Q 793,164 732,225"
              fill="none"
              stroke="#cbf341"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-30"
            />
          </svg>

          {/* Central Image Card */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[440px] aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-2xl z-10 bg-[#072418]"
          >
            <Image
              src={content.image.url}
              alt={content.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#061910]/10 mix-blend-multiply" />
          </m.div>

          {/* Step 1: Discovery & Strategy */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-[120px] left-[20px] w-[240px] text-center flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#0a291b] border border-[#cbf341]/20 flex items-center justify-center shadow-lg mb-4 text-[#cbf341] z-20">
              {steps[0].icon}
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">{steps[0].title}</h3>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-[210px]">{steps[0].description}</p>
            <span className="font-display font-black text-4xl text-[#cbf341]/20 mt-4 block">{steps[0].number}</span>
          </m.div>

          {/* Step 4: Reporting & Growth */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-[120px] right-[20px] w-[240px] text-center flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#0a291b] border border-[#cbf341]/20 flex items-center justify-center shadow-lg mb-4 text-[#cbf341] z-20">
              {steps[3].icon}
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">{steps[3].title}</h3>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-[210px]">{steps[3].description}</p>
            <span className="font-display font-black text-4xl text-[#cbf341]/20 mt-4 block">{steps[3].number}</span>
          </m.div>

          {/* Step 2: Creative Planning */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-[410px] left-[220px] w-[240px] text-center flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#0a291b] border border-[#cbf341]/20 flex items-center justify-center shadow-lg mb-4 text-[#cbf341] z-20">
              {steps[1].icon}
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">{steps[1].title}</h3>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-[210px]">{steps[1].description}</p>
            <span className="font-display font-black text-4xl text-[#cbf341]/20 mt-4 block">{steps[1].number}</span>
          </m.div>

          {/* Step 3: Execution & Optimization */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-[410px] right-[220px] w-[240px] text-center flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#0a291b] border border-[#cbf341]/20 flex items-center justify-center shadow-lg mb-4 text-[#cbf341] z-20">
              {steps[2].icon}
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">{steps[2].title}</h3>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-[210px]">{steps[2].description}</p>
            <span className="font-display font-black text-4xl text-[#cbf341]/20 mt-4 block">{steps[2].number}</span>
          </m.div>

        </div>

        {/* Mobile & Tablet Responsive Layout (1-column Stack) */}
        <div className="block lg:hidden space-y-8 sm:space-y-10 md:space-y-12">
          {/* Centered Image */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[400px] aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-xl mx-auto bg-[#072418]"
          >
            <Image
              src={content.image.url}
              alt={content.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </m.div>

          {/* Sequential Steps Cards Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {steps.map((step, idx) => (
              <m.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-5 sm:p-6 rounded-3xl bg-[#072418] border border-white/5 relative"
              >
                <div className="w-11 h-11 rounded-full bg-[#0a291b] border border-[#cbf341]/20 flex items-center justify-center shadow-md mb-4 text-[#cbf341]">
                  {step.icon}
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed max-w-[240px]">{step.description}</p>
                <span className="font-display font-black text-4xl text-[#cbf341]/25 mt-4 block">{step.number}</span>
              </m.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
