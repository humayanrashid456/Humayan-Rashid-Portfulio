import type { Metadata } from "next";
import AbroadPage from "@/components/abroad/AbroadPage";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Study Abroad",
  description: "Free study-abroad consultation: university selection, applications and visa support.",
  alternates: { canonical: "/abroad" },
};

export default async function StudyAbroadPage() {
  const { brand, footer } = await getSiteSettings();
  return (
    <AbroadPage
      logoTitle={brand.logoTitle || brand.name}
      logoSubtitle={brand.logoSubtitle}
      copyright={footer.copyrightText}
    />
  );
}
