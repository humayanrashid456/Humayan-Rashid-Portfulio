import React from "react";
import { motion } from "motion/react";
import { Compass, Palette, Settings, TrendingUp } from "lucide-react";

export default function WorkingProcess() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We start by understanding your business, goals, and audience to craft a tailored marketing roadmap.",
      icon: <Compass className="w-5 h-5 text-[#cbf341]" />,
    },
    {
      number: "02",
      title: "Creative Planning",
      description: "Our team designs compelling content, campaigns, and visuals aligned with your brand's voice.",
      icon: <Palette className="w-5 h-5 text-[#cbf341]" />,
    },
    {
      number: "03",
      title: "Execution & Optimization",
      description: "We launch, manage, and continuously refine every campaign for maximum impact and ROI.",
      icon: <Settings className="w-5 h-5 text-[#cbf341]" />,
    },
    {
      number: "04",
      title: "Reporting & Growth",
      description: "You receive transparent reports and insights as we scale results and evolve with your goals.",
      icon: <TrendingUp className="w-5 h-5 text-[#cbf341]" />,
    },
  ];

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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <span>Working Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl"
          >
            Our Step-By-Step Approach
          </motion.h2>
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[440px] aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-2xl z-10 bg-[#072418]"
          >
            <img
              src="/src/assets/images/working_process_team.png"
              alt="Our Step-By-Step collaboration team"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#061910]/10 mix-blend-multiply" />
          </motion.div>

          {/* Step 1: Discovery & Strategy */}
          <motion.div
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
          </motion.div>

          {/* Step 4: Reporting & Growth */}
          <motion.div
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
          </motion.div>

          {/* Step 2: Creative Planning */}
          <motion.div
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
          </motion.div>

          {/* Step 3: Execution & Optimization */}
          <motion.div
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
          </motion.div>

        </div>

        {/* Mobile & Tablet Responsive Layout (1-column Stack) */}
        <div className="block lg:hidden space-y-8 sm:space-y-10 md:space-y-12">
          {/* Centered Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-[400px] aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-xl mx-auto bg-[#072418]"
          >
            <img
              src="/src/assets/images/working_process_team.png"
              alt="Our Step-By-Step collaboration team"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Sequential Steps Cards Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {steps.map((step, idx) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
