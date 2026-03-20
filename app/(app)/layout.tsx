import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SiteChrome } from "@/components/site/site-chrome";
import type { ReactNode } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,var(--glow-primary),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-[-12rem] -z-10 w-[24rem] bg-[radial-gradient(circle,var(--glow-accent),transparent_70%)] blur-2xl"
      />

      <SiteChrome />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
