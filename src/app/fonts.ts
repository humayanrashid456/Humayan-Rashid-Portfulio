import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

// Self-hosted at build time: no render-blocking request to Google, no layout shift.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const fontVariables = [inter, spaceGrotesk, jetbrainsMono].map((font) => font.variable).join(" ");
