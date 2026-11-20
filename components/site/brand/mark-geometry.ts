/**
Measured centerline geometry of the official asym mark (`public/brand/asym-mark-dark.png`).
Outer frame sits at x 102..921, y 65..961 (aspect 820:897, 42px stroke in 1024px space).
- Datum: arched crossbar at 29% from top curving down into the sides.
- Stem & Sweep: vertical divider at 42% from left sweeping elliptically into the bottom edge.
*/
export const MARK_VIEWBOX = "102 65 820 897";

export const MARK_FRAME_RECT = {
  x: 123,
  y: 86,
  width: 777.5,
  height: 854,
  rx: 169,
} as const;

export const MARK_DATUM_PATH =
  "M123 452A130 130 0 0 1 253 322H770.5A130 130 0 0 1 900.5 452";

export const MARK_SWEEP_PATH =
  "M588 86A140 140 0 0 0 448 226V540A292 400 0 0 0 740 940";
