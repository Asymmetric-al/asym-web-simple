import { notFound } from "next/navigation";
import { QaErrorTrigger } from "./error-trigger";

export const metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "QA Error Harness",
};

export default async function QaErrorHarnessPage({
  searchParams,
}: {
  readonly searchParams: Promise<{ trigger?: string }>;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const params = await searchParams;

  return <QaErrorTrigger shouldThrowInitially={params.trigger === "1"} />;
}
