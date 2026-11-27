import {
  Check,
  Database,
  FileText,
  Gift,
  Layers,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { PipelineSlot } from "@/components/site/home/deferred-widget-slots";
import type {
  PipelineIconKey,
  PipelineProps,
} from "@/components/site/reactbits/pipeline-interactive";
import type { ReactNode } from "react";

export type {
  PipelineIconKey,
  PipelineNode,
  PipelineProps,
} from "@/components/site/reactbits/pipeline-interactive";

const PIPELINE_ICONS: Record<PipelineIconKey, typeof Database> = {
  database: Database,
  shield: ShieldCheck,
  sparkles: Sparkles,
  check: Check,
  file: FileText,
  layers: Layers,
  gift: Gift,
  send: Send,
  users: Users,
};

export const Pipeline = (props: PipelineProps): ReactNode => {
  const { nodes, className = "" } = props;
  const summary = nodes
    .map((node) => `${node.title} (${node.description})`)
    .join(", then ");

  return (
    <PipelineSlot {...props}>
      <div
        role="img"
        aria-label={`Grounded AI workflow: ${summary}`}
        className={`rb-pipeline-root border-night-rule bg-[var(--vision-art-bg)] min-h-64 overflow-hidden rounded-3xl border ${className}`}
      >
        <div className="grid gap-3 p-5 sm:grid-cols-2">
          {nodes.map((node) => {
            const Icon = PIPELINE_ICONS[node.icon];
            return (
              <div
                key={node.id}
                className="border-night-rule bg-[var(--vision-art-plane-1)] flex items-center gap-3 rounded-xl border px-3.5 py-3"
              >
                <span className="bg-[var(--vision-art-plane-2)] text-night-accent inline-flex size-8 shrink-0 items-center justify-center rounded-lg">
                  <Icon
                    className="size-4"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-night-foreground truncate font-sans text-xs font-semibold">
                    {node.title}
                  </p>
                  <p className="text-night-muted truncate font-mono text-xs">
                    {node.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PipelineSlot>
  );
};
