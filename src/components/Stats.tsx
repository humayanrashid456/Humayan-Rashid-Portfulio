import { motion } from "motion/react";
import { FolderGit2, Users2, ShieldCheck, HeartHandshake, Globe } from "lucide-react";

import { StatItem } from "../types";

// helper to map stats items to specific visual highlights
const getStatIcon = (id: string, size: number) => {
  // Use id includes check to dynamically match custom added stats if id is custom
  if (id.includes("stat-1") || id.includes("projects") || id.includes("project")) {
    return <FolderGit2 size={size} className="text-zinc-800 dark:text-cyan-400" />;
  }
  if (id.includes("stat-2") || id.includes("clients") || id.includes("happy")) {
    return <Users2 size={size} className="text-zinc-800 dark:text-cyan-400" />;
  }
  if (id.includes("stat-3") || id.includes("experience") || id.includes("years")) {
    return <ShieldCheck size={size} className="text-zinc-800 dark:text-cyan-400" />;
  }
  if (id.includes("stat-4") || id.includes("countries") || id.includes("global") || id.includes("reached")) {
    return <Globe size={size} className="text-zinc-800 dark:text-cyan-400" />;
  }
  return <HeartHandshake size={size} className="text-zinc-800 dark:text-cyan-400" />;
};

export default function Stats({ data }: { data?: StatItem[] }) {
  const statsList = data || [];
  return (
    <section
      id="stats"
      className="py-16 md:py-20 bg-white dark:bg-[#09090b] border-y border-zinc-200/50 dark:border-zinc-800/40 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title and Intro header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-500 dark:text-cyan-400 font-bold mb-3">
            INTERESTING FACTS & CREDENTIALS
          </p>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight">
            Independent Metrics built on 6+ Years of Trust
          </h2>
        </div>

        {/* Stats Bento Grid elements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsList.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-100 dark:border-zinc-800/80 shadow-sm hover:shadow-cyan-950/20 hover:bg-white dark:hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between overflow-hidden glow-card"
            >
              {/* Abs hover bg glow effect */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                  {getStatIcon(stat.id, 20)}
                </div>

                {/* Big Metric with Space Grotesk display font */}
                <span className="block font-display text-4xl sm:text-5xl font-extrabold tracking-tighter text-zinc-950 dark:text-white mt-6 leading-none select-none">
                  {stat.value}
                </span>

                {/* Stat label */}
                <h3 className="font-display text-base font-semibold text-zinc-800 dark:text-zinc-200 mt-3">
                  {stat.label}
                </h3>
              </div>

              {/* Stat description details */}
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 leading-relaxed font-sans">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
