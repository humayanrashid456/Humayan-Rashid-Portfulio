import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Briefcase, Github, ExternalLink, Code2, Layers, CheckCircle2, Sparkles,
} from "lucide-react";
import { Project } from "../types";
import { loadCMSData } from "../lib/cmsState";
import { DetailShell } from "./BlogDetail";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);

  useEffect(() => {
    const data = loadCMSData();
    const projects = data.projects || [];
    const found = projects.find((p) => p.id === id) || null;
    setProject(found);
    if (found) {
      setRelated(projects.filter((p) => p.id !== id).slice(0, 3));
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!project) {
    return (
      <DetailShell
        title="Project Not Found"
        subtitle="The case study you're looking for doesn't exist or has been moved."
        backHref="/#portfolio"
      >
        <div />
      </DetailShell>
    );
  }

  return (
    <DetailShell
      title={project.title}
      subtitle={project.description}
      backHref="/#portfolio"
      eyebrow={project.category}
      eyebrowIcon={<Briefcase size={12} />}
      coverImage={project.image}
      actions={
        <>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
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
              rel="noreferrer"
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
          <h3 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-[#cbf341]" />
            Project Overview
          </h3>
          <p className="text-zinc-300 text-base leading-relaxed">
            {project.description} This case study outlines the architecture,
            tooling, and engineering tradeoffs that made {project.title} a
            production-ready deliverable — covering every layer from UI polish
            to deployment automation.
          </p>
        </section>

        <section>
          <h3 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <Layers size={18} className="text-[#cbf341]" />
            Technology Stack
          </h3>
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

        <section>
          <h3 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#cbf341]" />
            Key Highlights
          </h3>
          <ul className="space-y-2.5 text-zinc-300 text-sm">
            {[
              "Production-grade TypeScript with strict type safety",
              "Component-driven architecture for long-term scalability",
              "Optimized bundle sizes and Core Web Vitals",
              "Pixel-perfect responsive layouts across breakpoints",
              "Documentation & handover-ready codebase",
            ].map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-[#cbf341] shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section className="pt-8 border-t border-white/10">
            <h3 className="font-display font-black text-xl text-white mb-5">
              More Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/projects/${r.id}`}
                  className="group block bg-[#0a2219] border border-white/5 hover:border-[#cbf341]/30 rounded-2xl overflow-hidden transition"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#072418]">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-[#cbf341] uppercase tracking-widest">
                      {r.category}
                    </span>
                    <h4 className="font-display font-bold text-white text-sm mt-1.5 group-hover:text-[#cbf341] transition-colors line-clamp-2">
                      {r.title}
                    </h4>
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
