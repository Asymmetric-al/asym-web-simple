"use client";

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
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  arrangeGraph,
  clamp,
  collectRelatedNodeIds,
  easeCosine,
  travelled,
  travelTime,
} from "@/components/site/reactbits/pipeline-layout";
import { useIsReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import type {
  GraphLayout,
  WirePath,
} from "@/components/site/reactbits/pipeline-layout";
import type { ReactNode, RefObject } from "react";

export type PipelineIconKey =
  | "database"
  | "shield"
  | "sparkles"
  | "check"
  | "file"
  | "layers"
  | "gift"
  | "send"
  | "users";

export interface PipelineNode {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly icon: PipelineIconKey;
  readonly tone?: "signal" | "human";
  readonly duration?: number;
}

export interface PipelineProps {
  readonly nodes: readonly PipelineNode[];
  readonly edges: readonly (readonly [string, string])[];
  readonly nodeWidth?: number;
  readonly speed?: number;
  readonly pace?: number;
  readonly rest?: number;
  readonly className?: string;
}

type NodeState = "idle" | "running" | "done";

const ENGINE_PHASE = {
  start: 0,
  run: 1,
  rest: 2,
  fade: 3,
  stopped: 4,
} as const;

type EnginePhaseValue = (typeof ENGINE_PHASE)[keyof typeof ENGINE_PHASE];

interface ActiveFlow {
  readonly edge: number;
  readonly start: number;
  readonly velocity: number;
}

interface PendingTimer {
  readonly id: string;
  readonly at: number;
  readonly kind: "start" | "finish";
}

interface EngineState {
  now: number;
  phase: EnginePhaseValue;
  since: number;
  until: number;
  states: Record<string, NodeState>;
  fill: number[];
  isSettled: boolean;
  isFading: boolean;
  received: Map<string, number>;
  timers: PendingTimer[];
  flows: ActiveFlow[];
  isDirty: boolean;
}

const HEAD = 28;
const FADE_MS = 640;
const SWAP_MS = 380;
const TRAVEL_MS = 680;

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

const createFreshEngine = (now: number): EngineState => ({
  now,
  phase: ENGINE_PHASE.start,
  since: now,
  until: now + 360,
  states: {},
  fill: [],
  isSettled: false,
  isFading: false,
  received: new Map<string, number>(),
  timers: [],
  flows: [],
  isDirty: true,
});

const advanceFlows = (
  engine: EngineState,
  wires: readonly WirePath[],
  incoming: ReadonlyMap<string, number>
): void => {
  const nextFlows: ActiveFlow[] = [];
  for (const flow of engine.flows) {
    const wire = wires[flow.edge];
    if (!wire) {
      continue;
    }
    const distance = travelled(engine.now - flow.start, flow.velocity);
    if (distance < wire.length) {
      engine.fill[flow.edge] = distance / wire.length;
      nextFlows.push(flow);
    } else {
      engine.fill[flow.edge] = 1;
      const count = (engine.received.get(wire.to) ?? 0) + 1;
      engine.received.set(wire.to, count);
      if (count >= (incoming.get(wire.to) ?? 0)) {
        engine.timers.push({
          id: wire.to,
          at: flow.start + travelTime(wire.length, flow.velocity) + 40,
          kind: "start",
        });
      }
    }
  }
  engine.flows = nextFlows;
};

const applyTimer = (
  engine: EngineState,
  timer: PendingTimer,
  node: PipelineNode | undefined,
  wires: readonly WirePath[],
  reach: number,
  velocity: number,
  tempo: number
): void => {
  if (!node) {
    return;
  }
  if (timer.kind === "start") {
    engine.states[node.id] = "running";
    engine.isDirty = true;
    const base = (node.duration ?? 980) * clamp(tempo, 0.2, 4);
    engine.timers.push({
      id: node.id,
      at: timer.at + base,
      kind: "finish",
    });
    return;
  }
  engine.states[node.id] = "done";
  engine.isDirty = true;
  const rate = reach / (TRAVEL_MS / clamp(velocity, 0.2, 4));
  if (rate <= 0) {
    return;
  }
  for (const [edgeIndex, wire] of wires.entries()) {
    if (wire.from === node.id) {
      engine.flows.push({
        edge: edgeIndex,
        start: timer.at,
        velocity: rate,
      });
    }
  }
};

const processTimers = (
  engine: EngineState,
  nodeById: ReadonlyMap<string, PipelineNode>,
  wires: readonly WirePath[],
  reach: number,
  velocity: number,
  tempo: number
): void => {
  let processed = 0;
  while (processed < 64 && engine.timers.length > 0) {
    processed += 1;
    engine.timers.sort((a, b) => a.at - b.at);
    const [timer] = engine.timers;
    if (!timer || timer.at > engine.now) {
      break;
    }
    engine.timers = engine.timers.slice(1);
    applyTimer(
      engine,
      timer,
      nodeById.get(timer.id),
      wires,
      reach,
      velocity,
      tempo
    );
  }
};

const beginRunPhase = (
  engine: EngineState,
  now: number,
  list: readonly PipelineNode[],
  wires: readonly WirePath[],
  incoming: ReadonlyMap<string, number>
): void => {
  engine.phase = ENGINE_PHASE.run;
  engine.since = now;
  engine.until = now;
  engine.received = new Map<string, number>();
  engine.fill = wires.map(() => 0);
  engine.flows = [];
  engine.timers = [];
  engine.isSettled = false;
  for (const node of list) {
    engine.states[node.id] = "idle";
  }
  engine.isDirty = true;
  let rootIndex = 0;
  for (const node of list) {
    if ((incoming.get(node.id) ?? 0) > 0) {
      continue;
    }
    engine.timers.push({
      id: node.id,
      at: now + 200 + rootIndex * 140,
      kind: "start",
    });
    rootIndex += 1;
  }
};

const advanceFadePhase = (
  engine: EngineState,
  now: number,
  list: readonly PipelineNode[],
  wires: readonly WirePath[]
): void => {
  if (
    now >= engine.since + SWAP_MS &&
    list.some((node) => (engine.states[node.id] ?? "idle") !== "idle")
  ) {
    for (const node of list) {
      engine.states[node.id] = "idle";
    }
    engine.isDirty = true;
  }
  if (now < engine.until) {
    return;
  }
  engine.fill = wires.map(() => 0);
  engine.isSettled = false;
  engine.isFading = false;
  engine.isDirty = true;
  engine.phase = ENGINE_PHASE.start;
  engine.since = now;
  engine.until = now + 360;
};

const stepEngine = (
  engine: EngineState,
  dt: number,
  list: readonly PipelineNode[],
  nodeById: ReadonlyMap<string, PipelineNode>,
  wires: readonly WirePath[],
  incoming: ReadonlyMap<string, number>,
  reach: number,
  velocity: number,
  tempo: number,
  pauseMs: number
): void => {
  engine.now += dt;
  const { now } = engine;

  if (engine.phase === ENGINE_PHASE.start && now >= engine.until) {
    beginRunPhase(engine, now, list, wires, incoming);
  }

  if (engine.phase === ENGINE_PHASE.rest && now >= engine.until) {
    engine.phase = ENGINE_PHASE.fade;
    engine.since = now;
    engine.until = now + FADE_MS;
    engine.isFading = true;
    engine.isDirty = true;
  }

  if (engine.phase === ENGINE_PHASE.fade) {
    advanceFadePhase(engine, now, list, wires);
  }

  advanceFlows(engine, wires, incoming);
  processTimers(engine, nodeById, wires, reach, velocity, tempo);

  if (
    engine.phase !== ENGINE_PHASE.run ||
    engine.flows.length > 0 ||
    engine.timers.length > 0
  ) {
    return;
  }

  engine.phase = ENGINE_PHASE.rest;
  engine.since = now;
  engine.until = now + Math.max(0, pauseMs);
};

const PipelineNodeCard = ({
  node,
  state,
  isFading,
  isCompact,
  isFaded,
  isReducedMotion,
  bindNode,
  onHover,
}: {
  readonly node: PipelineNode;
  readonly state: NodeState;
  readonly isFading: boolean;
  readonly isCompact: boolean;
  readonly isFaded: boolean;
  readonly isReducedMotion: boolean;
  readonly bindNode: (el: HTMLDivElement | null) => void;
  readonly onHover: (id: string | null) => void;
}): ReactNode => {
  const Icon = PIPELINE_ICONS[node.icon];
  const isRunning = state === "running" && !isFading;
  const isDone = state === "done" && !isFading;
  let subline = node.description;
  if (isDone) {
    subline = node.status;
  } else if (isRunning) {
    subline = "Active";
  }

  return (
    <div
      ref={bindNode}
      data-state={isFading ? "idle" : state}
      data-tone={node.tone ?? "signal"}
      data-compact={isCompact ? "true" : undefined}
      data-faded={isFaded ? "true" : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          onHover(node.id);
        }
      }}
      onPointerLeave={() => {
        onHover(null);
      }}
      className="rb-pipeline-node"
    >
      {isReducedMotion ? null : (
        <span aria-hidden="true" className="rb-pipeline-beam">
          <span
            ref={(element) => {
              if (!element || element.dataset.spin === "1") {
                return;
              }
              element.dataset.spin = "1";
              element.animate?.(
                [
                  { transform: "rotate(0deg)" },
                  { transform: "rotate(360deg)" },
                ],
                { duration: 2400, iterations: Infinity }
              );
            }}
            className="rb-pipeline-beam-spin"
          />
          <span className="rb-pipeline-beam-mask" />
        </span>
      )}

      <div className="rb-pipeline-icon">
        <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
        <span aria-hidden="true" className="rb-pipeline-badge">
          <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
            <circle
              cx="8"
              cy="8"
              r="8"
              fill={
                node.tone === "human"
                  ? "var(--vision-art-arc)"
                  : "var(--night-accent)"
              }
            />
            <path
              d="M4.6 8.3l2.2 2.2 4.6-4.8"
              fill="none"
              stroke="var(--night)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className={cn("relative min-w-0", !isCompact && "flex-1")}>
        <p className="text-night-foreground truncate font-sans text-xs leading-snug font-semibold">
          {node.title}
        </p>
        {isCompact ? null : (
          <p
            className={cn(
              "mt-0.5 truncate font-mono text-xs leading-tight",
              isDone ? "text-night-foreground/85" : "text-night-muted"
            )}
          >
            {subline}
          </p>
        )}
      </div>
    </div>
  );
};

const PipelineStaticFallback = ({
  nodes,
}: {
  readonly nodes: readonly PipelineNode[];
}): ReactNode => (
  <div className="grid gap-3 p-5 sm:grid-cols-2">
    {nodes.map((node) => {
      const Icon = PIPELINE_ICONS[node.icon];
      return (
        <div
          key={node.id}
          className="border-night-rule flex items-center gap-3 rounded-xl border bg-[var(--vision-art-plane-1)] px-3.5 py-3"
        >
          <span className="text-night-accent inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--vision-art-plane-2)]">
            <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
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
);

interface PipelineLoopArgs {
  readonly rootRef: RefObject<HTMLDivElement | null>;
  readonly getEngine: () => EngineState;
  readonly settingsRef: RefObject<{
    readonly nodes: readonly PipelineNode[];
    readonly speed: number;
    readonly pace: number;
    readonly rest: number;
  }>;
  readonly nodeById: ReadonlyMap<string, PipelineNode>;
  readonly wires: readonly WirePath[];
  readonly incoming: ReadonlyMap<string, number>;
  readonly reach: number;
  readonly paint: () => void;
  readonly publish: () => void;
  readonly isReducedMotion: boolean;
  readonly layout: GraphLayout | null;
}

const usePipelineLoop = ({
  rootRef,
  getEngine,
  settingsRef,
  nodeById,
  wires,
  incoming,
  reach,
  paint,
  publish,
  isReducedMotion,
  layout,
}: PipelineLoopArgs): void => {
  useEffect(() => {
    const root = rootRef.current;
    let observer: IntersectionObserver | null = null;
    let viewportRef: (Window & typeof globalThis) | null = null;
    let wakeFn: (() => void) | null = null;
    let raf = 0;

    const onVisibility = (): void => {
      wakeFn?.();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (root && !isReducedMotion && layout) {
      const doc = root.ownerDocument;
      const viewport = doc.defaultView ?? window;
      viewportRef = viewport;
      let isTicking = false;
      let last = 0;
      let isVisible = false;

      const tick = (time: number): void => {
        raf = 0;
        isTicking = true;
        const dt = last ? Math.min(64, time - last) : 16;
        last = time;
        const s = settingsRef.current;
        stepEngine(
          getEngine(),
          dt,
          s.nodes,
          nodeById,
          wires,
          incoming,
          reach,
          s.speed,
          s.pace,
          s.rest
        );
        paint();
        publish();
        isTicking = false;
        const isRunning = getEngine().phase !== ENGINE_PHASE.stopped;
        if (isVisible && isRunning && !doc.hidden) {
          raf = viewport.requestAnimationFrame(tick);
        }
      };

      const wake = (): void => {
        const isStopped = getEngine().phase === ENGINE_PHASE.stopped;
        const isBusy = raf !== 0 || isTicking;
        if (isBusy || isStopped || !isVisible || doc.hidden) {
          return;
        }
        last = 0;
        raf = viewport.requestAnimationFrame(tick);
      };
      wakeFn = wake;

      observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries.some((entry) => entry.isIntersecting);
          if (isVisible) {
            wake();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(root);
    }

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      viewportRef?.cancelAnimationFrame(raf);
    };
  }, [
    getEngine,
    incoming,
    isReducedMotion,
    layout,
    nodeById,
    paint,
    publish,
    reach,
    rootRef,
    settingsRef,
    wires,
  ]);
};

interface PipelineSvgLayerProps {
  readonly svgRef: RefObject<SVGSVGElement | null>;
  readonly fillsRef: RefObject<SVGGElement | null>;
  readonly fillRefs: RefObject<(SVGPathElement | null)[]>;
  readonly headRefs: RefObject<(SVGPathElement | null)[]>;
  readonly gradientRefs: RefObject<(SVGLinearGradientElement | null)[]>;
  readonly uid: string;
  readonly width: number;
  readonly height: number;
  readonly wires: readonly WirePath[];
  readonly related: ReadonlySet<string> | null;
}

const PipelineSvgLayer = ({
  svgRef,
  fillsRef,
  fillRefs,
  headRefs,
  gradientRefs,
  uid,
  width,
  height,
  wires,
  related,
}: PipelineSvgLayerProps): ReactNode => (
  <svg
    ref={svgRef}
    aria-hidden="true"
    width={width}
    height={height}
    fill="none"
    className="rb-pipeline-svg"
  >
    <defs>
      {wires.map((wire, index) => (
        <linearGradient
          key={`${wire.from}-${wire.to}`}
          id={`${uid}-${index}`}
          ref={(element) => {
            gradientRefs.current[index] = element;
          }}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--night-accent)" stopOpacity={0} />
          <stop offset="0.55" stopColor="var(--night-accent)" />
          <stop offset="1" stopColor="var(--vision-art-arc)" />
        </linearGradient>
      ))}
    </defs>
    <g className="rb-pipeline-wire-base">
      {wires.map((wire) => (
        <path
          key={`${wire.from}-${wire.to}`}
          d={wire.d}
          stroke="var(--night-foreground)"
          strokeWidth={1.5}
        />
      ))}
    </g>
    <g ref={fillsRef}>
      {wires.map((wire, index) => {
        const isFaded =
          related !== null && !(related.has(wire.from) && related.has(wire.to));
        return (
          <g
            key={`${wire.from}-${wire.to}`}
            data-faded={isFaded ? "true" : undefined}
            className="rb-pipeline-wire-group"
          >
            <path
              ref={(element) => {
                fillRefs.current[index] = element;
              }}
              d={wire.d}
              pathLength={1}
              stroke="var(--night-accent)"
              strokeWidth={1.5}
              strokeDasharray="1 1"
              strokeDashoffset={1}
            />
            <path
              ref={(element) => {
                headRefs.current[index] = element;
              }}
              d={wire.d}
              pathLength={1}
              stroke={`url(#${uid}-${index})`}
              strokeWidth={2}
              strokeLinecap="round"
              className="rb-pipeline-wire-head"
            />
          </g>
        );
      })}
    </g>
  </svg>
);

const paintWireHead = (
  fill: SVGPathElement,
  head: SVGPathElement,
  gradient: SVGLinearGradientElement | null | undefined,
  progress: number,
  total: number,
  isMoving: boolean
): void => {
  if (!isMoving || total <= 0) {
    head.style.opacity = "0";
    return;
  }
  const distance = progress * total;
  const size = Math.min(0.6, HEAD / total);
  head.style.strokeDasharray = `${size} 2`;
  head.style.strokeDashoffset = String(size - progress);
  head.style.opacity = String(
    clamp(Math.min(distance / 12, (total - distance) / 18), 0, 1)
  );
  if (!gradient) {
    return;
  }
  const tail = fill.getPointAtLength(Math.max(0, distance - HEAD));
  const tip = fill.getPointAtLength(distance);
  gradient.setAttribute("x1", tail.x.toFixed(2));
  gradient.setAttribute("y1", tail.y.toFixed(2));
  gradient.setAttribute("x2", tip.x.toFixed(2));
  gradient.setAttribute("y2", tip.y.toFixed(2));
};

export const PipelineInteractive = ({
  nodes,
  edges,
  nodeWidth = 176,
  speed = 0.9,
  pace = 1,
  rest = 2600,
  className,
}: PipelineProps): ReactNode => {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const fillsRef = useRef<SVGGElement>(null);
  const fillRefs = useRef<(SVGPathElement | null)[]>([]);
  const headRefs = useRef<(SVGPathElement | null)[]>([]);
  const gradientRefs = useRef<(SVGLinearGradientElement | null)[]>([]);
  const lengthsRef = useRef<number[]>([]);
  const uid = `pl${useId().replaceAll(/[^a-zA-Z0-9_-]/gu, "")}`;
  const engineRef = useRef<EngineState | null>(null);
  const getEngine = useCallback((): EngineState => {
    let engine = engineRef.current;
    if (!engine) {
      engine = createFreshEngine(0);
      engineRef.current = engine;
    }
    return engine;
  }, []);

  const isReducedMotion = useIsReducedMotion();

  const [width, setWidth] = useState(0);
  const [view, setView] = useState<{
    readonly states: Record<string, NodeState>;
    readonly isFading: boolean;
  }>({ states: {}, isFading: false });
  const [hovered, setHovered] = useState<string | null>(null);

  const nodeIds = useMemo(() => nodes.map((node) => node.id), [nodes]);
  const nodeById = useMemo(() => {
    const map = new Map<string, PipelineNode>();
    for (const node of nodes) {
      map.set(node.id, node);
    }
    return map;
  }, [nodes]);

  const settingsRef = useRef({ nodes, speed, pace, rest });
  useEffect(() => {
    settingsRef.current = { nodes, speed, pace, rest };
  });

  useEffect(() => {
    const root = rootRef.current;
    let observer: ResizeObserver | null = null;
    if (root) {
      observer = new ResizeObserver((entries) => {
        const [entry] = entries;
        if (!entry) {
          return;
        }
        const nextWidth = Math.round(entry.contentRect.width);
        if (nextWidth > 0) {
          setWidth(nextWidth);
        }
      });
      observer.observe(root);
    }
    return () => {
      observer?.disconnect();
    };
  }, []);

  const layout = useMemo(
    () =>
      width <= 0
        ? null
        : arrangeGraph(nodeIds, edges, width, clamp(nodeWidth, 110, 240)),
    [nodeIds, edges, width, nodeWidth]
  );

  const wires = useMemo(() => layout?.wires ?? [], [layout]);

  const incoming = useMemo(() => {
    const counts = new Map<string, number>();
    for (const wire of wires) {
      counts.set(wire.to, (counts.get(wire.to) ?? 0) + 1);
    }
    return counts;
  }, [wires]);

  const reach = useMemo(() => {
    if (wires.length === 0) {
      return 0;
    }
    let total = 0;
    for (const wire of wires) {
      total += wire.length;
    }
    return total / wires.length;
  }, [wires]);

  const publish = useCallback(() => {
    const engine = getEngine();
    if (!engine.isDirty) {
      return;
    }
    engine.isDirty = false;
    setView({ states: { ...engine.states }, isFading: engine.isFading });
  }, [getEngine]);

  const paint = useCallback(() => {
    const engine = getEngine();
    const group = fillsRef.current;
    if (group) {
      group.style.opacity =
        engine.phase === ENGINE_PHASE.fade
          ? String(1 - easeCosine((engine.now - engine.since) / FADE_MS))
          : "1";
    }
    const moving = new Set(engine.flows.map((flow) => flow.edge));
    for (const [index, wire] of wires.entries()) {
      const fill = fillRefs.current[index];
      const head = headRefs.current[index];
      const gradient = gradientRefs.current[index];
      const progress = clamp(
        engine.fill[index] ?? (engine.isSettled ? 1 : 0),
        0,
        1
      );
      if (fill) {
        fill.style.strokeDashoffset = String(1 - progress);
      }
      if (!head || !fill) {
        continue;
      }
      const total = lengthsRef.current[index] || wire.length;
      paintWireHead(fill, head, gradient, progress, total, moving.has(index));
    }
  }, [getEngine, wires]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !layout) {
      return;
    }
    root.style.height = `${layout.height}px`;
    if (svgRef.current) {
      svgRef.current.style.top = "0px";
    }
    for (const placed of layout.placed) {
      const el = nodeRefs.current[placed.id];
      if (!el) {
        continue;
      }
      el.style.left = `${placed.x}px`;
      el.style.top = `${placed.y}px`;
      el.style.width = `${placed.w}px`;
      el.style.height = `${placed.h}px`;
    }
  }, [layout]);

  useLayoutEffect(() => {
    const engine = createFreshEngine(getEngine().now);
    engineRef.current = engine;
    if (!isReducedMotion) {
      return;
    }
    for (const id of nodeIds) {
      engine.states[id] = "done";
    }
    engine.isSettled = true;
    engine.phase = ENGINE_PHASE.stopped;
  }, [getEngine, nodeIds, isReducedMotion]);

  useLayoutEffect(() => {
    lengthsRef.current = wires.map((wire) => wire.length);
  }, [wires]);

  useLayoutEffect(() => {
    paint();
  }, [paint, nodeIds, isReducedMotion]);

  usePipelineLoop({
    rootRef,
    getEngine,
    settingsRef,
    nodeById,
    wires,
    incoming,
    reach,
    paint,
    publish,
    isReducedMotion,
    layout,
  });

  const related = useMemo(
    () => (hovered ? collectRelatedNodeIds(hovered, wires) : null),
    [hovered, wires]
  );

  const summary = nodes
    .map((node) => `${node.title} (${node.description})`)
    .join(", then ");

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={`Grounded AI workflow: ${summary}`}
      className={cn(
        "rb-pipeline-root border-night-rule min-h-64 overflow-hidden rounded-3xl border bg-[var(--vision-art-bg)]",
        className
      )}
    >
      {layout ? (
        <>
          <PipelineSvgLayer
            svgRef={svgRef}
            fillsRef={fillsRef}
            fillRefs={fillRefs}
            headRefs={headRefs}
            gradientRefs={gradientRefs}
            uid={uid}
            width={width}
            height={layout.height}
            wires={wires}
            related={related}
          />

          {layout.placed.map((item) => {
            const node = nodeById.get(item.id);
            if (!node) {
              return null;
            }
            const state: NodeState = isReducedMotion
              ? "done"
              : (view.states[item.id] ?? "idle");
            const isFaded = related !== null && !related.has(item.id);
            return (
              <PipelineNodeCard
                key={item.id}
                node={node}
                state={state}
                isFading={isReducedMotion ? false : view.isFading}
                isCompact={layout.isCompact}
                isFaded={isFaded}
                isReducedMotion={isReducedMotion}
                bindNode={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                onHover={(id) => {
                  setHovered(id);
                }}
              />
            );
          })}
        </>
      ) : (
        <PipelineStaticFallback nodes={nodes} />
      )}
    </div>
  );
};
