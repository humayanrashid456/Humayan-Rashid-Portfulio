import type { Metadata } from "next";
import { Suspense } from "react";
import AdminSkeleton from "@/components/admin/AdminSkeleton";
import PageHeader from "@/components/admin/PageHeader";
import SchemaForm from "@/components/admin/form/SchemaForm";
import { saveSiteSettings } from "@/lib/actions/admin/home";
import { SETTINGS_FORM } from "@/lib/admin/form-configs";
import { getAdminSettings } from "@/lib/admin/queries";

export const metadata: Metadata = { title: "Site settings" };

async function SettingsForm() {
  const value = await getAdminSettings();
  return <SchemaForm fields={SETTINGS_FORM} initialValue={value} onSave={saveSiteSettings} />;
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Site settings" description="Used across every page: the navbar, footer, contact section and search results." />
      <Suspense fallback={<AdminSkeleton rows={5} />}>
        <SettingsForm />
      </Suspense>
    </>
  );
}
