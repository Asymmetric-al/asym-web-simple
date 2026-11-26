import { notFound } from "next/navigation";
import { Suspense } from "react";
import { QaErrorTrigger } from "./error-trigger";

export const metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "QA Error Harness",
};

async function QaErrorTriggerLoader({
  searchParams,
}: {
  readonly searchParams: Promise<{ trigger?: string }>;
}) {
  const params = await searchParams;
  return <QaErrorTrigger shouldThrowInitially={params.trigger === "1"} />;
}

export default function QaErrorHarnessPage({
  searchParams,
}: {
  readonly searchParams: Promise<{ trigger?: string }>;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <QaErrorTriggerLoader searchParams={searchParams} />
    </Suspense>
  );
}
