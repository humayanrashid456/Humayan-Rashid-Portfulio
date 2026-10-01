"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "motion/react";
import { Github, ExternalLink, Code2, Globe, Compass, Cpu, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import FilterPills from "@/components/ui/FilterPills";
import ViewAllLink from "@/components/ui/ViewAllLink";
import type { HomeContent } from "@/lib/content/home";
import type { ProjectData } from "@/lib/data/types";

interface PortfolioProjectsProps {
  heading: HomeContent["portfolio"];
  data: ProjectData[];
  viewAllHref?: string;
}

export default function PortfolioProjects({ heading, data, viewAllHref }: PortfolioProjectsProps) {
  const router = useRouter();
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
          <m.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a291b] border border-[#cbf341]/25 text-[#cbf341] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <span>{heading.eyebrow}</span>
          </m.div>

          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-3xl mb-8"
          >
            {heading.title}
          </m.h2>
          {heading.subtitle && <p className="text-zinc-400 text-sm sm:text-base -mt-4 mb-8 max-w-2xl">{heading.subtitle}</p>}

          {/* Quick Cat Selector */}
          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-auto max-w-full flex justify-center"
          >
            <FilterPills
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              label="Filter projects by category"
              renderIcon={(cat) => cat !== "All" && getCategoryIcon(cat)}
              className="w-full md:w-auto"
            />
          </m.div>
        </div>

        {/* Responsive Grid layout */}
        <m.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => {
              return (
                <m.div
                  layout
                  key={proj.slug}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onClick={() => router.push(`/projects/${proj.slug}`)}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/projects/${proj.slug}`);
                    }
                  }}
                  className="group flex flex-col justify-between p-6 rounded-3xl bg-[#072418] border border-white/5 shadow-xl hover:scale-[1.02] hover:border-[#cbf341]/25 cursor-pointer transition-all duration-300"
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Image Frame with Overlay */}
                      <div className="aspect-[16/10] relative overflow-hidden rounded-2xl bg-[#0a291b] border border-white/5 mb-6">
                        <Image
                          src={proj.coverImage.url}
                          alt={proj.coverImage.alt}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                          className="object-cover group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#061910]/95 via-[#061910]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                          <div className="flex gap-2 w-full">
                            {proj.repoUrl && (
                              <a
                                href={proj.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
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
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
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
                        {proj.repoUrl && (
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
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
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-mono text-[9px] font-bold uppercase text-[#cbf341] hover:underline flex items-center gap-1"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </m.div>
              );
            })}
          </AnimatePresence>
        </m.div>

        {/* Empty State checks */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-16 md:py-20 bg-[#072418] rounded-3xl border border-dashed border-white/10 px-4">
            <Code2 size={40} className="mx-auto text-zinc-500 mb-4 animate-bounce" />
            <h4 className="font-display font-semibold text-white text-lg">No blueprints deployed yet</h4>
            <p className="text-sm text-zinc-400 mt-1">Check back soon or create some in your CMS settings!</p>
          </div>
        )}

        {/* Bottom Navigation Arrows (Consistent with Services Section) */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 mt-10 sm:mt-14 lg:mt-16"
        >
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#cbf341] text-white hover:text-[#cbf341] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#cbf341] text-white hover:text-[#cbf341] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight size={18} />
          </button>
        </m.div>

        {viewAllHref && <ViewAllLink href={viewAllHref} label="View All Projects" />}
      </div>
    </section>
  );
}
