import Link from "next/link";
import { Briefcase, CheckCircle2, Sparkles, Layers, ListChecks } from "lucide-react";
import ServiceIcon from "@/components/ui/ServiceIcon";
import type { ServiceData } from "@/lib/data/types";
import DetailShell from "./DetailShell";

const PROCESS_STEPS = [
  "Free discovery call to understand your goals and constraints",
  "Detailed proposal with fixed pricing and timeline",
  "Iterative design + development with weekly milestone reviews",
  "Production launch, monitoring, and ongoing support",
];

export default function ServiceDetail({ service, related }: { service: ServiceData; related: ServiceData[] }) {
  return (
    <DetailShell
      title={service.title}
      subtitle={service.description}
      backHref="/services"
      eyebrow="Service"
      eyebrowIcon={<Briefcase size={12} />}
      actions={
        <Link
          href="/contact"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] text-xs font-bold transition shadow-lg shadow-[#cbf341]/20"
        >
          <Sparkles size={14} />
          <span>Request This Service</span>
        </Link>
      }
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <ServiceIcon name={service.iconName} size={18} className="text-[#cbf341]" />
            What You Get
          </h2>
          <p className="text-zinc-300 text-base leading-relaxed">
            {service.description} Every engagement is scoped tightly with clear deliverables, milestone-driven
            timelines, and direct communication throughout the project lifecycle.
          </p>
        </section>

        {service.deliverables.length > 0 && (
          <section>
            <h2 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
              <ListChecks size={18} className="text-[#cbf341]" />
              Deliverables
            </h2>
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
          <h2 className="font-display font-black text-xl text-white mb-4 flex items-center gap-2">
            <Layers size={18} className="text-[#cbf341]" />
            How It Works
          </h2>
          <ol className="space-y-3 text-sm">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3 bg-[#0a2219] border border-white/5 rounded-xl p-3.5">
                <span className="font-mono font-black text-[#cbf341] text-sm shrink-0 mt-0.5">0{i + 1}</span>
                <span className="text-zinc-300">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {related.length > 0 && (
          <section className="pt-8 border-t border-white/10">
            <h2 className="font-display font-black text-xl text-white mb-5">Other Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group block bg-[#0a2219] border border-white/5 hover:border-[#cbf341]/30 rounded-2xl p-4 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#cbf341]/10 border border-[#cbf341]/20 flex items-center justify-center mb-3 group-hover:bg-[#cbf341] group-hover:text-[#061910] transition-colors">
                      <ServiceIcon name={r.iconName} size={18} className="text-[#cbf341] group-hover:text-[#061910]" />
                    </div>
                    <h3 className="font-display font-bold text-white text-sm group-hover:text-[#cbf341] transition-colors line-clamp-2">
                      {r.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-1.5 line-clamp-2">{r.description}</p>
                  </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </DetailShell>
  );
}
