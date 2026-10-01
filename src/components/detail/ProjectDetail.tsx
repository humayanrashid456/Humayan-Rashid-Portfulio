import Image from "next/image";
import Link from "next/link";
import { Briefcase, Github, ExternalLink, Code2, Layers, CheckCircle2, Sparkles } from "lucide-react";
import Markdown from "@/components/content/Markdown";
import type { ProjectData } from "@/lib/data/types";
import DetailShell from "./DetailShell";

const HIGHLIGHTS = [
  "Production-grade TypeScript with strict type safety",
  "Component-driven architecture for long-term scalability",
  "Optimized bundle sizes and Core Web Vitals",
  "Pixel-perfect responsive layouts across breakpoints",
  "Documentation & handover-ready codebase",
];

export default function ProjectDetail({ project, related }: { project: ProjectData; related: ProjectData[] }) {
  return (
    <DetailShell
      title={project.title}
      subtitle={project.description}
      backHref="/projects"
      eyebrow={project.category}
      eyebrowIcon={<Briefcase size={12} />}
      coverImage={project.coverImage}
      actions={
        <>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 bg-[#0a2219] text-zinc-300 hover:border-[#cbf341]/30 hover:text-white text-xs font-semibold transition"
            >
              <Github size={14} />
              <span>Source Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-xs font-bold transition"
            >
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          )}
        </>
      }
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#cbf341]" />
            Project Overview
          </h2>
          {project.body ? (
            <Markdown source={project.body} />
          ) : (
            <p className="text-zinc-300 text-base leading-relaxed">{project.description}</p>
          )}
        </section>

        {project.technologies.length > 0 && (
          <section>
            <h2 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
              <Layers size={18} className="text-[#cbf341]" />
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 bg-[#0a2219] border border-[#cbf341]/20 text-[#cbf341] px-3 py-1.5 rounded-full text-xs font-bold"
                >
                  <Code2 size={12} />
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#cbf341]" />
            Key Highlights
          </h2>
          <ul className="space-y-2.5 text-zinc-300 text-sm">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-[#cbf341] shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section className="pt-8 border-t border-white/10">
            <h2 className="font-display font-black text-xl text-white mb-5">More Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/projects/${r.slug}`}
                  className="group block bg-[#0a2219] border border-white/5 hover:border-[#cbf341]/30 rounded-2xl overflow-hidden transition"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#072418]">
                    <Image
                      src={r.coverImage.url}
                      alt={r.coverImage.alt}
                      fill
                      sizes="(min-width: 640px) 280px, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-[#cbf341] uppercase tracking-widest">{r.category}</span>
                    <h3 className="font-display font-bold text-white text-sm mt-1.5 group-hover:text-[#cbf341] transition-colors line-clamp-2">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </DetailShell>
  );
}
