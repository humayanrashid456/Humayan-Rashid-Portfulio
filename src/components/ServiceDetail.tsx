import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Briefcase, CheckCircle2, Sparkles, Layers, ListChecks,
  Code2, Palette, Search, ShoppingBag, Compass, Activity, Wrench,
} from "lucide-react";
import { Service } from "../types";
import { loadCMSData } from "../lib/cmsState";
import { DetailShell } from "./BlogDetail";

const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Code: Code2,
  Palette: Palette,
  Search: Search,
  ShoppingBag: ShoppingBag,
  Compass: Compass,
  Activity: Activity,
};

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [related, setRelated] = useState<Service[]>([]);

  useEffect(() => {
    const data = loadCMSData();
    const services = data.services || [];
    const found = services.find((s) => s.id === id) || null;
    setService(found);
    if (found) {
      setRelated(services.filter((s) => s.id !== id).slice(0, 3));
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!service) {
    return (
      <DetailShell
        title="Service Not Found"
        subtitle="The service you're looking for doesn't exist or has been moved."
        backHref="/#services"
      >
        <div />
      </DetailShell>
    );
  }

  const Icon = ICON_MAP[service.iconName] || Wrench;

  return (
    <DetailShell
      title={service.title}
      subtitle={service.description}
      backHref="/#services"
      eyebrow="Service"
      eyebrowIcon={<Briefcase size={12} />}
      actions={
        <Link
          to="/#contact"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-xs font-bold transition shadow-lg shadow-[#cbf341]/20"
        >
          <Sparkles size={14} />
          <span>Request This Service</span>
        </Link>
      }
    >
      <div className="space-y-10">
        <section>
          <h3 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <Icon size={18} className="text-[#cbf341]" />
            What You Get
          </h3>
          <p className="text-zinc-300 text-base leading-relaxed">
            {service.description} Every engagement is scoped tightly with clear
            deliverables, milestone-driven timelines, and direct communication
            throughout the project lifecycle.
          </p>
        </section>

        {service.deliverables && service.deliverables.length > 0 && (
          <section>
            <h3 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
              <ListChecks size={18} className="text-[#cbf341]" />
              Deliverables
            </h3>
            <ul className="space-y-2.5 text-zinc-300 text-sm">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-[#cbf341] shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h3 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <Layers size={18} className="text-[#cbf341]" />
            How It Works
          </h3>
          <ol className="space-y-3 text-sm">
            {[
              "Free discovery call to understand your goals and constraints",
              "Detailed proposal with fixed pricing and timeline",
              "Iterative design + development with weekly milestone reviews",
              "Production launch, monitoring, and ongoing support",
            ].map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-3 bg-[#0a2219] border border-white/5 rounded-xl p-3.5"
              >
                <span className="font-mono font-black text-[#cbf341] text-sm shrink-0 mt-0.5">
                  0{i + 1}
                </span>
                <span className="text-zinc-300">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {related.length > 0 && (
          <section className="pt-8 border-t border-white/10">
            <h3 className="font-display font-black text-xl text-white mb-5">
              Other Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => {
                const RIcon = ICON_MAP[r.iconName] || Wrench;
                return (
                  <Link
                    key={r.id}
                    to={`/services/${r.id}`}
                    className="group block bg-[#0a2219] border border-white/5 hover:border-[#cbf341]/30 rounded-2xl p-4 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#cbf341]/10 border border-[#cbf341]/20 flex items-center justify-center mb-3 group-hover:bg-[#cbf341] group-hover:text-[#061910] transition-colors">
                      <RIcon size={18} className="text-[#cbf341] group-hover:text-[#061910]" />
                    </div>
                    <h4 className="font-display font-bold text-white text-sm group-hover:text-[#cbf341] transition-colors line-clamp-2">
                      {r.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1.5 line-clamp-2">
                      {r.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </DetailShell>
  );
}
