import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { BookingProvider } from "@/components/providers/BookingProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { themeInitScript } from "@/hooks/useTheme";
import { getSiteSettings } from "@/lib/data/settings";
import { SITE_URL } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { brand, seo } = await getSiteSettings();
  const title = seo.title || `${brand.name} | Web Design, SEO & Automation`;
  const description =
    seo.description ||
    `${brand.name} helps local businesses grow with high-converting web design, SEO and automation.`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${brand.name}` },
    description,
    authors: [{ name: brand.name }],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      siteName: brand.name,
      title,
      description,
      ...(seo.ogImage ? { images: [seo.ogImage.url] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const viewport: Viewport = {
  themeColor: "#061910",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`dark ${fontVariables}`} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="font-sans antialiased bg-[#061910] text-[#fafafa]">
        <MotionProvider>
          <BookingProvider>{children}</BookingProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
