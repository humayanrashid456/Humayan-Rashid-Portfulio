import type { ReactNode } from "react";

/** Standalone section pages: clear the fixed navbar, which the homepage hero does itself. */
export default function PagesLayout({ children }: { children: ReactNode }) {
  return <div className="pt-16 sm:pt-20">{children}</div>;
}
