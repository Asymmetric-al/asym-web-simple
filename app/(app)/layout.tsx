import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { ReactNode } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,var(--glow-primary),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-[-14rem] -z-10 w-[30rem] bg-[radial-gradient(ellipse_at_center,var(--glow-accent),transparent_72%)]"
      />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
