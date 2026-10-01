import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Sign in" };

/** Sends an already signed-in admin to the dashboard. Reads the session, so it streams. */
async function RedirectIfSignedIn() {
  if (await getCurrentUser()) redirect("/admin");
  return null;
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0a2219] p-6 sm:p-8 shadow-2xl">
        <h1 className="font-display text-2xl font-black text-white">Admin sign in</h1>
        <p className="text-sm text-zinc-400 mt-1 mb-6">Manage the website&apos;s content.</p>
        <LoginForm />
      </div>
    </main>
  );
}
