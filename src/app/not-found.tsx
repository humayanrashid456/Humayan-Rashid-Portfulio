import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-5 px-4 text-center bg-[#061910] text-white">
      <span className="font-mono text-xs font-bold text-[#cbf341] uppercase tracking-widest">404</span>
      <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight">Page not found</h1>
      <p className="text-zinc-400 text-sm sm:text-base max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#cbf341] hover:bg-[#b2d932] text-[#061910] font-bold text-sm transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
