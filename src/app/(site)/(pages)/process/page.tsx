import type { Metadata } from "next";
import WorkingProcess from "@/components/sections/WorkingProcess";
import { getHomeContent } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Working Process",
  description: "The step-by-step process I follow to plan, build and launch every project.",
  alternates: { canonical: "/process" },
};

export default async function ProcessPage() {
  const home = await getHomeContent();
  return <WorkingProcess content={home.process} />;
}
