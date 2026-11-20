import type { ReactNode } from "react";

export type EditorialGlyphKind = "receipt" | "permissions" | "approval";

// Monoline archival object drawings styled in the 1.5px stroke language of the asym mark, encoding the three core architectural principles without generic icon sets.
export const EditorialGlyph = ({
  kind,
  className = "size-12 shrink-0",
}: {
  readonly kind: EditorialGlyphKind;
  readonly className?: string;
}): ReactNode => {
  if (kind === "receipt") {
    return (
      <svg
        viewBox="0 0 52 52"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className={className}
      >
        <path
          d="M11 8.5H41V43.5L36.5 40.5L32 43.5L27.5 40.5L23 43.5L18.5 40.5L14 43.5L11 41.5V8.5Z"
          stroke="var(--glyph-stroke)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M18 16H34"
          stroke="var(--ink)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M18 23H30"
          stroke="var(--pine)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M18 30H34"
          stroke="var(--ink)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M14 16V30"
          stroke="var(--pine)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="14" cy="16" r="2" fill="var(--pine)" />
        <circle cx="14" cy="23" r="2" fill="var(--pine)" />
        <circle cx="14" cy="30" r="2" fill="var(--pine)" />
      </svg>
    );
  }

  if (kind === "permissions") {
    return (
      <svg
        viewBox="0 0 52 52"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className={className}
      >
        <rect
          x="7"
          y="10"
          width="38"
          height="32"
          rx="3"
          stroke="var(--glyph-stroke)"
          strokeWidth="1.5"
        />
        <path d="M26 10V42" stroke="var(--glyph-stroke)" strokeWidth="1.5" />
        <path
          d="M12 18H21M12 24H20M12 30H18"
          stroke="var(--pine)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M31 18H40"
          stroke="var(--ink)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <rect
          x="30.5"
          y="22.5"
          width="10"
          height="9"
          rx="1.5"
          stroke="var(--draft)"
          strokeWidth="1.5"
          strokeDasharray="2.5 2.5"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect
        x="8"
        y="9"
        width="30"
        height="34"
        rx="3"
        stroke="var(--glyph-stroke)"
        strokeWidth="1.5"
      />
      <path
        d="M14 17H32M14 23H26"
        stroke="var(--draft)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      <rect
        x="21"
        y="26"
        width="23"
        height="13"
        rx="2.5"
        transform="rotate(-5 21 26)"
        fill="var(--vermilion-soft)"
        stroke="var(--vermilion)"
        strokeWidth="1.75"
      />
      <path
        d="M27.5 32.5L30.2 35L36.8 28.8"
        stroke="var(--vermilion)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
