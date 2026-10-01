import AdminSkeleton from "@/components/admin/AdminSkeleton";

/**
 * Fallback for a full page load. Client navigations between admin pages don't use
 * it (the panel layout is shared), so each page also wraps its own data in <Suspense>.
 */
export default function AdminLoading() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-56 rounded-lg bg-white/5 animate-pulse" />
      <AdminSkeleton />
    </div>
  );
}
