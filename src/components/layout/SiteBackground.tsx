/** Soft ambient glow shared by every public page. */
export default function SiteBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25 leading-none bg-[var(--color-primary-vibrant)]" />
      <div className="absolute top-[1200px] right-10 w-[450px] h-[450px] rounded-full blur-[150px] opacity-[0.15] bg-[var(--color-primary-saturated)]" />
      <div className="absolute inset-0 gradient-mesh" />
    </div>
  );
}
