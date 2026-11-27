import {
  Geist_Mono,
  Instrument_Sans,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { Providers } from "@/components/providers";
import { SkipToContent } from "@/components/skip-to-content";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const displayFont = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const bodyFont = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const monoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#101214" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground min-h-dvh font-sans antialiased">
        <Providers>
          <SkipToContent />
          {children}
        </Providers>
      </body>
    </html>
  );
}
