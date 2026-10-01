/** Placeholder shown while an admin page's session-checked data streams in. */
export default function AdminSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading" className="animate-pulse space-y-3">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-20 rounded-xl bg-white/5" />
      ))}
    </div>
  );
}
