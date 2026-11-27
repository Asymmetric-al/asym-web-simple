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

export default function AppNotFound() {
  return <NotFoundMain />;
}
