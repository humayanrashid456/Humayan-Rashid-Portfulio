import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Code2, Globe, Compass, Cpu, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "../types";

interface PortfolioProjectsProps {
  data: Project[];
}

export default function PortfolioProjects({ data }: PortfolioProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Dynamically extract categories that have active items
  const categories = ["All", ...Array.from(new Set(data.map((proj) => proj.category)))];

  const filteredProjects = selectedCategory === "All"
    ? data
    : data.filter((proj) => proj.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "web":
      case "web app":
      case "web apps":
      case "frontend":
        return <Globe size={13} />;
      case "design":
      case "ui/ux":
        return <Compass size={13} />;
      case "systems":
      case "backend":
      case "state engines":
        return <Cpu size={13} />;
      default:
        return <Layers size={13} />;
    }
  };

  // Fallback image helper if it's a picsum seed link to make it look premium
  const getProjectImage = (imagePath: string, index: number) => {
    if (imagePath.includes("picsum.photos") || !imagePath) {
      if (index === 0) return "/src/assets/images/case_study_team.png";
      if (index === 1) return "/src/assets/images/social_media_team.png";
      return "/src/assets/images/seo_analysis_team.png";
    }
    return imagePath;
  };

  return (
    <section
      id="portfolio"
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-[#061910] text-white transition-colors duration-300 relative overflow-hidden"
    >
      {/* Decorative concentric ring elements matching Hero & Services */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <span>Case Studies</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-3xl mb-8"
          >
            Our Recent Works & Case Studies
          </motion.h2>

          {/* Quick Cat Selector */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-1.5 p-1.5 bg-[#072418] rounded-full border border-white/5 backdrop-blur-sm"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider ${
                  selectedCategory === cat
                    ? "bg-[#cbf341] text-[#061910] shadow-md font-black"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat !== "All" && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Responsive Grid layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => {
              return (
                <motion.div
                  layout
                  key={proj.id}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col justify-between p-6 rounded-3xl bg-[#072418] border border-white/5 shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Image Frame with Overlay */}
                      <div className="aspect-[16/10] relative overflow-hidden rounded-2xl bg-[#0a291b] border border-white/5 mb-6">
                        <img
                          src={getProjectImage(proj.image, idx)}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#061910]/95 via-[#061910]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                          <div className="flex gap-2 w-full">
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2.5 px-3 rounded-xl bg-[#0a291b] hover:bg-[#113f2a] text-white border border-white/10 font-mono text-[10px] font-bold uppercase flex items-center justify-center gap-1.5 transition-all"
                              >
                                <Github size={12} className="text-[#cbf341]" />
                                <span>Code</span>
                              </a>
                            )}
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 py-2.5 px-3 rounded-xl bg-[#cbf341] hover:bg-[#bce039] text-[#061910] font-mono text-[10px] font-black uppercase flex items-center justify-center gap-1.5 transition-all animate-pulse"
                              >
                                <ExternalLink size={12} />
                                <span>Live Demo</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Category Label badge */}
                        <span className="absolute top-4 left-4 font-mono text-[9px] bg-[#061910]/90 text-[#cbf341] px-2.5 py-1 rounded-full border border-[#cbf341]/25 shadow-lg tracking-wider font-bold uppercase">
                          {proj.category}
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#cbf341] transition-colors duration-200">
                        {proj.title}
                      </h3>

                      {/* Description */}
                      <p className="text-zinc-400 text-sm mt-3 leading-relaxed font-sans">
                        {proj.description}
                      </p>
                    </div>

                    {/* Tech details and source link footer */}
                    <div className="mt-6 pt-5 border-t border-white/5">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[9px] bg-[#0a291b] text-zinc-300 px-2.5 py-1 rounded-full border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Fallback action links for touch screens */}
                      <div className="mt-4 flex sm:hidden items-center justify-between">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[9px] font-bold uppercase text-zinc-400 hover:text-white flex items-center gap-1"
                          >
                            <Github size={11} className="text-[#cbf341]" />
                            <span>Code</span>
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[9px] font-bold uppercase text-[#cbf341] hover:underline flex items-center gap-1"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State checks */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-20 bg-[#072418] rounded-3xl border border-dashed border-white/10 px-4">
            <Code2 size={40} className="mx-auto text-zinc-500 mb-4 animate-bounce" />
            <h4 className="font-display font-semibold text-white text-lg">No blueprints deployed yet</h4>
            <p className="text-sm text-zinc-400 mt-1">Check back soon or create some in your CMS settings!</p>
          </div>
        )}

        {/* Bottom Navigation Arrows (Consistent with Services Section) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 mt-10 sm:mt-14 lg:mt-16"
        >
          <button
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#cbf341] text-white hover:text-[#cbf341] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#cbf341] text-white hover:text-[#cbf341] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
