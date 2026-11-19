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
      <Header />
      {children}
      <Footer />
    </div>
  );
}
