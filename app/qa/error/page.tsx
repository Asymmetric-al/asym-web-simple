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
  searchParams: Promise<{ trigger?: string }>;
}) {
  const params = await searchParams;

  return <QaErrorTrigger shouldThrowInitially={params.trigger === "1"} />;
}
