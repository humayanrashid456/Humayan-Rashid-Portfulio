import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** "View all" button under a homepage preview section, linking to its full page. */
export default function ViewAllLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="flex justify-center mt-10 sm:mt-12">
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#cbf341]/30 hover:border-[#cbf341] bg-[#0a291b] text-[#cbf341] font-bold text-xs sm:text-sm tracking-wider transition-colors"
      >
        <span>{label}</span>
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
