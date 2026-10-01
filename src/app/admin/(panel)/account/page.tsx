import type { Metadata } from "next";
import { Suspense } from "react";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import PageHeader from "@/components/admin/PageHeader";
import { verifySession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Account" };

async function SignedInEmail() {
  const user = await verifySession();
  return <>Signed in as {user.email}.</>;
}

export default function AccountPage() {
  return (
    <>
      <PageHeader
        title="Account"
        description={
          <Suspense fallback="Checking your session…">
            <SignedInEmail />
          </Suspense>
        }
      />
      <section className="max-w-md rounded-2xl border border-white/10 bg-[#0a2219] p-6">
        <h2 className="font-semibold text-white mb-4">Change password</h2>
        {/* Static form; its action verifies the session on submit. */}
        <ChangePasswordForm />
      </section>
    </>
  );
}
