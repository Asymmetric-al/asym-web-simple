import type { ReactNode } from "react";

// Warm, sculptural modernist composition derived from the asym mark's Stem, Sweep, and Arch: layered matte botanical, warm sand, and terracotta architectural planes expressing asymmetric leverage without wireframes or fake product UI.
export const AsymmetricFieldHero = (): ReactNode => (
  <div className="border-rule-strong bg-[var(--sculpt-canvas)] relative overflow-hidden rounded-[26px] border shadow-[var(--shadow-card)]">
    <svg
      viewBox="0 0 640 480"
      fill="none"
      role="img"
      aria-label="Warm modernist architectural sculpture derived from the asym mark: sunlit sand, soft clay, sage, and deep botanical curved forms opening smoothly across the frame to express outsized impact from focused care."
      className="sculpt-reveal block aspect-[4/3] w-full select-none"
    >
      <defs>
        <clipPath id="asym-hero-frame">
          <rect x="20" y="20" width="600" height="440" rx="22" />
        </clipPath>
        <linearGradient
          id="asym-hero-base"
          x1="20"
          y1="20"
          x2="620"
          y2="460"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--card)" />
          <stop offset="100%" stopColor="var(--sculpt-sand)" />
        </linearGradient>
      </defs>

      <g clipPath="url(#asym-hero-frame)">
        {/* Continuous sunlit sand-to-alabaster base so every layer seats cleanly */}
        <rect
          x="20"
          y="20"
          width="600"
          height="440"
          fill="url(#asym-hero-base)"
        />

        {/* Soft warm clay horizon arch sweeping across the upper frame */}
        <path
          d="M 20 20 H 620 V 206 C 514 148, 388 128, 256 144 C 154 156, 78 186, 20 226 Z"
          fill="var(--sculpt-clay)"
          fillOpacity="0.72"
        />

        {/* Broad sunlit sage plane opening gracefully across the right two-thirds */}
        <path
          d="M 218 20 H 620 V 460 H 196 C 204 340, 212 184, 218 20 Z"
          fill="var(--sculpt-sage)"
        />

        {/* Grounding left sand column echoing the focused vertical Stem */}
        <path
          d="M 20 186 C 84 156, 152 146, 224 152 V 460 H 20 Z"
          fill="var(--sculpt-sand)"
          fillOpacity="0.78"
        />

        {/* Monumental deep Botanical Forest sweeping arch derived from MARK_SWEEP_PATH */}
        <path
          d="M 232 20 H 316 C 272 78, 256 144, 272 214 C 296 318, 408 370, 620 372 V 460 H 352 C 254 460, 198 394, 198 296 V 132 C 198 78, 208 44, 232 20 Z"
          fill="var(--sculpt-sage-deep)"
        />

        {/* Soft carved daylight ribbon giving subtle ceramic relief across the sweep */}
        <path
          d="M 288 176 C 344 268, 456 320, 620 322 V 364 C 442 362, 326 306, 270 212 Z"
          fill="var(--card)"
          fillOpacity="0.24"
        />

        {/* Warm terracotta datum bridge connecting focused effort to broad reach */}
        <path
          d="M 20 218 A 66 66 0 0 1 86 152 H 554 A 66 66 0 0 1 620 218"
          stroke="var(--sculpt-clay-deep)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Delicate luminous reach arc rising gently into the open right field */}
        <path
          d="M 232 152 C 344 152, 464 198, 566 296"
          stroke="var(--card)"
          strokeOpacity="0.62"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Calm sculptural stone anchoring the stem-datum meeting point */}
        <circle cx="222" cy="152" r="12" fill="var(--card)" />
        <circle cx="222" cy="152" r="5.5" fill="var(--sculpt-clay-deep)" />
      </g>

      {/* Quiet sculptural inner plate hairline */}
      <rect
        x="20"
        y="20"
        width="600"
        height="440"
        rx="22"
        stroke="var(--rule-strong)"
        strokeWidth="1.25"
      />
    </svg>
  </div>
);

// Warm minimal geometric facets cropped from the asym mark to anchor the three human-outcome cards.
export const PerspectiveFacet = ({
  variant,
}: {
  readonly variant: "donor" | "field" | "office";
}): ReactNode => (
  <span className="bg-record inline-flex size-10 shrink-0 items-center justify-center rounded-2xl">
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="size-5"
    >
      {variant === "donor" ? (
        <>
          <path
            d="M 11 4 V 16 A 8 8 0 0 0 19 24"
            stroke="var(--foreground)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="11" cy="10" r="3" fill="var(--signal)" />
        </>
      ) : null}
      {variant === "field" ? (
        <>
          <path
            d="M 5 21 C 9 11, 16 7, 23 7"
            stroke="var(--signal)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 5 21 C 11 16, 17 14, 23 14"
            stroke="var(--foreground)"
            strokeOpacity="0.45"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <circle cx="22" cy="7" r="2.75" fill="var(--human)" />
        </>
      ) : null}
      {variant === "office" ? (
        <>
          <path
            d="M 4 17 A 6 6 0 0 1 10 11 H 18 A 6 6 0 0 1 24 17"
            stroke="var(--signal)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="10" cy="11" r="2.25" fill="var(--foreground)" />
          <circle cx="18" cy="11" r="2.25" fill="var(--foreground)" />
        </>
      ) : null}
    </svg>
  </span>
);
