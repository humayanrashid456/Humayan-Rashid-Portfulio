/**
 * Admin design tokens. Every pairing meets WCAG AA on the admin backgrounds
 * (#061910 page, #0a2219 card, #05110b field):
 *   body text zinc-50/200/300 ≥ 11:1 · secondary zinc-400 ≥ 6.4:1 (min 4.5)
 *   field border zinc-500 ≥ 3.5:1 (min 3 for control boundaries) · errors red-400 ≥ 5.8:1
 * zinc-500 and darker are for borders only, never for text.
 */
export const inputClass =
  "w-full rounded-lg bg-[#05110b] border border-zinc-500 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-400 transition-colors hover:border-zinc-400 focus:outline-none focus:border-[#cbf341] focus:ring-2 focus:ring-[#cbf341]/30 aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-400/30";

export const labelClass = "block text-xs font-semibold text-zinc-200 mb-1.5";
export const helpClass = "text-xs text-zinc-400 mt-1";
export const errorClass = "text-xs text-red-400 mt-1";

export const buttonClass =
  "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

export const primaryButton = `${buttonClass} bg-[#cbf341] text-[#061910] hover:bg-[#b2d932]`;
export const secondaryButton = `${buttonClass} border border-zinc-500 text-zinc-100 hover:border-zinc-300 hover:bg-white/5`;
export const dangerButton = `${buttonClass} border border-red-400/60 text-red-300 hover:bg-red-500/10`;
