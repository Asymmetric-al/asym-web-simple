export interface PlacedNode {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

export interface WirePath {
  readonly from: string;
  readonly to: string;
  readonly d: string;
  readonly length: number;
}

export interface GraphLayout {
  readonly placed: readonly PlacedNode[];
  readonly wires: readonly WirePath[];
  readonly height: number;
  readonly isCompact: boolean;
}

interface ElbowSegment {
  readonly d: string;
  readonly length: number;
}

interface PlacementResult {
  readonly placed: readonly PlacedNode[];
  readonly byId: ReadonlyMap<string, PlacedNode>;
  readonly height: number;
  readonly isCompact: boolean;
  readonly channel: number;
}

const NODE_HEIGHT = 64;
const TILE_HEIGHT = 76;
const BEND = 10;
const ACCEL = 260;
const MIN_CANVAS_HEIGHT = 256;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const easeCosine = (t: number): number =>
  0.5 - 0.5 * Math.cos(Math.PI * clamp(t, 0, 1));

export const travelled = (elapsed: number, velocity: number): number => {
  if (elapsed <= 0) {
    return 0;
  }
  if (elapsed < ACCEL) {
    return (velocity * elapsed * elapsed) / (2 * ACCEL);
  }
  return velocity * (elapsed - ACCEL / 2);
};

export const travelTime = (length: number, velocity: number): number => {
  if (velocity <= 0) {
    return 0;
  }
  if (length <= (velocity * ACCEL) / 2) {
    return Math.sqrt((2 * ACCEL * length) / velocity);
  }
  return length / velocity + ACCEL / 2;
};

const round = (value: number): number => Math.round(value * 100) / 100;

const elbowPath = (
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  turn: number,
  isVertical: boolean
): ElbowSegment => {
  if (!isVertical) {
    const dy = ey - sy;
    if (Math.abs(dy) < 0.5) {
      return {
        d: `M ${round(sx)} ${round(sy)} H ${round(ex)}`,
        length: Math.abs(ex - sx),
      };
    }
    const r = Math.max(
      0,
      Math.min(BEND, Math.abs(dy) / 2, turn - sx, ex - turn)
    );
    const s = Math.sign(dy);
    return {
      d: `M ${round(sx)} ${round(sy)} H ${round(turn - r)} A ${r} ${r} 0 0 ${s > 0 ? 1 : 0} ${round(turn)} ${round(sy + s * r)} V ${round(ey - s * r)} A ${r} ${r} 0 0 ${s > 0 ? 0 : 1} ${round(turn + r)} ${round(ey)} H ${round(ex)}`,
      length: Math.abs(ex - sx) + Math.abs(dy) - 4 * r + Math.PI * r,
    };
  }
  const dx = ex - sx;
  if (Math.abs(dx) < 0.5) {
    return {
      d: `M ${round(sx)} ${round(sy)} V ${round(ey)}`,
      length: Math.abs(ey - sy),
    };
  }
  const r = Math.max(
    0,
    Math.min(BEND, Math.abs(dx) / 2, turn - sy, ey - turn)
  );
  const s = Math.sign(dx);
  return {
    d: `M ${round(sx)} ${round(sy)} V ${round(turn - r)} A ${r} ${r} 0 0 ${s > 0 ? 0 : 1} ${round(sx + s * r)} ${round(turn)} H ${round(ex - s * r)} A ${r} ${r} 0 0 ${s > 0 ? 1 : 0} ${round(ex)} ${round(turn + r)} V ${round(ey)}`,
    length: Math.abs(ey - sy) + Math.abs(dx) - 4 * r + Math.PI * r,
  };
};

interface GraphAdjacency {
  readonly outgoing: ReadonlyMap<string, readonly string[]>;
  readonly indegree: ReadonlyMap<string, number>;
}

const buildAdjacency = (
  ids: readonly string[],
  valid: readonly (readonly [string, string])[]
): GraphAdjacency => {
  const outgoing = new Map<string, string[]>();
  const indegree = new Map<string, number>();
  for (const id of ids) {
    outgoing.set(id, []);
    indegree.set(id, 0);
  }
  for (const [from, to] of valid) {
    outgoing.get(from)?.push(to);
    indegree.set(to, (indegree.get(to) ?? 0) + 1);
  }
  return { indegree, outgoing };
};

const buildColumns = (
  ids: readonly string[],
  valid: readonly (readonly [string, string])[]
): readonly (readonly string[])[] => {
  const { outgoing, indegree } = buildAdjacency(ids, valid);
  const level = new Map<string, number>();
  const queue: string[] = [];
  const remaining = new Map(indegree);
  for (const id of ids) {
    level.set(id, 0);
    if ((indegree.get(id) ?? 0) === 0) {
      queue.push(id);
    }
  }

  let cursor = 0;
  while (cursor < queue.length) {
    const id = queue[cursor];
    cursor += 1;
    const nextIds = id ? outgoing.get(id) : undefined;
    if (!id || !nextIds) {
      continue;
    }
    const nextLevel = (level.get(id) ?? 0) + 1;
    for (const next of nextIds) {
      level.set(next, Math.max(level.get(next) ?? 0, nextLevel));
      const left = (remaining.get(next) ?? 0) - 1;
      remaining.set(next, left);
      if (left === 0) {
        queue.push(next);
      }
    }
  }

  let maxLevel = 0;
  for (const id of ids) {
    maxLevel = Math.max(maxLevel, level.get(id) ?? 0);
  }
  const columns: string[][] = Array.from({ length: maxLevel + 1 }, () => []);
  for (const id of ids) {
    columns[level.get(id) ?? 0]?.push(id);
  }
  return columns;
};

const placeHorizontal = (
  columns: readonly (readonly string[])[],
  width: number,
  pad: number,
  usable: number,
  fitWidth: number,
  preferred: number
): PlacementResult => {
  const depth = columns.length;
  const w = clamp(Math.min(preferred, fitWidth), 120, 220);
  let maxRows = 1;
  for (const column of columns) {
    maxRows = Math.max(maxRows, column.length);
  }
  const gapY = 16;
  const height = Math.max(
    maxRows * NODE_HEIGHT + (maxRows - 1) * gapY + 48,
    MIN_CANVAS_HEIGHT
  );
  const span = depth > 1 ? (usable - w) / (depth - 1) : 0;
  const channel = Math.max(0, span - w);
  const placed: PlacedNode[] = [];
  const byId = new Map<string, PlacedNode>();

  for (const [colIdx, column] of columns.entries()) {
    const x = depth > 1 ? pad + colIdx * span : (width - w) / 2;
    for (const [rowIdx, id] of column.entries()) {
      const y =
        height / 2 +
        (rowIdx - (column.length - 1) / 2) * (NODE_HEIGHT + gapY) -
        NODE_HEIGHT / 2;
      const item: PlacedNode = { id, w, x, y, h: NODE_HEIGHT };
      placed.push(item);
      byId.set(id, item);
    }
  }

  return { byId, channel, height, placed, isCompact: false };
};

const placeVertical = (
  columns: readonly (readonly string[])[],
  width: number,
  usable: number,
  preferred: number
): PlacementResult => {
  let widest = 1;
  for (const column of columns) {
    widest = Math.max(widest, column.length);
  }
  const gap = 10;
  const natural = Math.min(
    preferred + 40,
    (usable - (widest - 1) * gap) / widest
  );
  const isCompact = natural < 172;
  const h = isCompact ? TILE_HEIGHT : NODE_HEIGHT;
  const gapY = 26;
  const height = Math.max(
    columns.length * h + (columns.length - 1) * gapY + 28,
    MIN_CANVAS_HEIGHT
  );
  const uniform = clamp(natural, 88, 280);
  const placed: PlacedNode[] = [];
  const byId = new Map<string, PlacedNode>();

  for (const [colIdx, column] of columns.entries()) {
    const w = isCompact
      ? uniform
      : clamp(
          Math.min(
            preferred + 40,
            (usable - (column.length - 1) * gap) / column.length
          ),
          88,
          280
        );
    const totalWidth = column.length * w + (column.length - 1) * gap;
    const left = (width - totalWidth) / 2;
    for (const [rowIdx, id] of column.entries()) {
      const item: PlacedNode = {
        h,
        id,
        w,
        x: left + rowIdx * (w + gap),
        y: 14 + colIdx * (h + gapY),
      };
      placed.push(item);
      byId.set(id, item);
    }
  }

  return { byId, height, isCompact, placed, channel: gapY };
};

export const arrangeGraph = (
  ids: readonly string[],
  edges: readonly (readonly [string, string])[],
  width: number,
  preferred: number
): GraphLayout => {
  const known = new Set(ids);
  const valid: (readonly [string, string])[] = [];
  for (const edge of edges) {
    if (known.has(edge[0]) && known.has(edge[1]) && edge[0] !== edge[1]) {
      valid.push(edge);
    }
  }

  const columns = buildColumns(ids, valid);
  const depth = columns.length;
  const pad = width < 480 ? 12 : 16;
  const usable = Math.max(0, width - pad * 2);
  const gapX = 36;
  const fitWidth = depth > 1 ? (usable - (depth - 1) * gapX) / depth : usable;
  const isHorizontal = fitWidth >= 142;

  const placement = isHorizontal
    ? placeHorizontal(columns, width, pad, usable, fitWidth, preferred)
    : placeVertical(columns, width, usable, preferred);

  const wires: WirePath[] = [];
  for (const [from, to] of valid) {
    const a = placement.byId.get(from);
    const b = placement.byId.get(to);
    if (!a || !b) {
      continue;
    }
    if (isHorizontal) {
      const sx = a.x + a.w;
      const ex = b.x;
      const turn = ex - Math.min(placement.channel, Math.max(0, ex - sx)) / 2;
      wires.push({
        from,
        to,
        ...elbowPath(sx, a.y + a.h / 2, ex, b.y + b.h / 2, turn, false),
      });
    } else {
      const sy = a.y + a.h;
      const ey = b.y;
      const turn = ey - Math.min(placement.channel, Math.max(0, ey - sy)) / 2;
      wires.push({
        from,
        to,
        ...elbowPath(a.x + a.w / 2, sy, b.x + b.w / 2, ey, turn, true),
      });
    }
  }

  return {
    height: placement.height,
    isCompact: placement.isCompact,
    placed: placement.placed,
    wires,
  };
};

export const collectRelatedNodeIds = (
  hoveredId: string,
  wires: readonly WirePath[]
): ReadonlySet<string> => {
  const visited = new Set<string>([hoveredId]);
  const walk = (id: string, isForward: boolean): void => {
    for (const wire of wires) {
      let next: string | null = null;
      if (isForward && wire.from === id) {
        next = wire.to;
      } else if (!isForward && wire.to === id) {
        next = wire.from;
      }
      if (!next || visited.has(next)) {
        continue;
      }
      visited.add(next);
      walk(next, isForward);
    }
  };
  walk(hoveredId, true);
  walk(hoveredId, false);
  return visited;
};
