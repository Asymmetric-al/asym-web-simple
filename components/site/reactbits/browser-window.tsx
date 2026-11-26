import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface BrowserWindowProps {
  readonly url: string;
  readonly label?: string;
  readonly badge?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

interface UrlParts {
  readonly host: string;
  readonly path: string;
}

const splitUrl = (url: string): UrlParts => {
  const clean = url.replace(/^https?:\/\//u, "");
  const cut = clean.indexOf("/");
  return cut === -1
    ? { host: clean, path: "" }
    : { host: clean.slice(0, cut), path: clean.slice(cut) };
};

export const BrowserWindow = ({
  url,
  label,
  badge,
  className,
  children,
}: BrowserWindowProps): ReactNode => {
  const { host, path } = splitUrl(url);

  return (
    <div
      role="group"
      aria-label={label ?? `Browser window showing ${url}`}
      className={cn(
        "border-rule-strong bg-record/85 relative isolate flex w-full flex-col overflow-hidden rounded-2xl border shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="border-rule bg-record/65 relative flex h-11 shrink-0 items-center justify-between gap-3 border-b px-3.5 sm:px-4">
        <div aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
          <span className="bg-rule-strong size-2.5 rounded-full" />
          <span className="bg-rule-strong size-2.5 rounded-full" />
          <span className="bg-rule-strong size-2.5 rounded-full" />
        </div>

        <div className="border-rule bg-card text-muted-foreground flex h-7 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 font-mono text-xs sm:max-w-[26rem]">
          <Lock className="text-signal size-3 shrink-0" aria-hidden="true" />
          <span className="min-w-0 truncate" translate="no">
            <span className="text-foreground font-medium">{host}</span>
            <span>{path}</span>
          </span>
        </div>

        {badge ? (
          <span className="border-rule bg-card text-muted-foreground hidden shrink-0 items-center rounded-full border px-2.5 py-0.5 font-mono text-xs sm:inline-flex forced-colors:border-[CanvasText]">
            {badge}
          </span>
        ) : (
          <span aria-hidden="true" className="hidden w-12 shrink-0 sm:block" />
        )}
      </div>

      <div className="bg-record/70 p-2 sm:p-3">
        <div className="border-rule-strong bg-card relative isolate overflow-hidden rounded-xl border shadow-[var(--shadow-card)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BrowserWindow;
