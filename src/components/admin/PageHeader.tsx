import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({
  title,
  description,
  backHref,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  backHref?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-8">
      {backHref && (
        <Link href={backHref} className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-3">
          <ArrowLeft size={14} /> Back
        </Link>
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-white">{title}</h1>
          {description && <p className="text-sm text-zinc-400 mt-1 max-w-2xl">{description}</p>}
        </div>
        {actions}
      </div>
    </header>
  );
}
