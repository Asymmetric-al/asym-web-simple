import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { NotFoundMain } from "@/components/site/not-found-main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn’t exist on asym.app.",
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-x-clip">
      <div aria-hidden="true" className="page-atmosphere" />
      <Header />
      <NotFoundMain />
      <Footer />
    </div>
  );
}
