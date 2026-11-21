import type { ReactNode } from "react";

// Warm, sculptural modernist composition derived from the asym mark's Stem, Sweep, and Arch: layered matte botanical, warm sand, and terracotta architectural planes expressing asymmetric leverage without wireframes or fake product UI.
export const AsymmetricFieldHero = (): ReactNode => (
  <div className="border-rule bg-[var(--sculpt-canvas)] relative overflow-hidden rounded-3xl border shadow-[var(--shadow-card)]">
    <svg
      viewBox="0 0 640 480"
      fill="none"
      role="img"
      aria-label="Warm modernist architectural sculpture derived from the asym mark: sunlit sand, soft clay, sage, and deep botanical curved forms opening smoothly across the frame to express outsized impact from focused care."
      className="sculpt-reveal block aspect-[4/3] w-full"
    >
      <defs>
        <clipPath id="asym-hero-frame">
          <rect x="24" y="24" width="592" height="432" rx="30" />
        </clipPath>
        <linearGradient
          id="asym-hero-base"
          x1="24"
          y1="24"
          x2="616"
          y2="456"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--card)" />
          <stop offset="100%" stopColor="var(--sculpt-sand)" />
        </linearGradient>
      </defs>

      <g clipPath="url(#asym-hero-frame)">
        {/* Continuous sunlit sand-to-alabaster base so every layer seats cleanly */}
        <rect
          x="24"
          y="24"
          width="592"
          height="432"
          fill="url(#asym-hero-base)"
        />

        {/* Soft warm clay horizon arch sweeping across the upper frame */}
        <path
          d="M 24 24 H 616 V 206 C 514 148, 388 128, 256 144 C 154 156, 78 186, 24 226 Z"
          fill="var(--sculpt-clay)"
          fillOpacity="0.72"
        />

        {/* Broad sunlit sage plane opening gracefully across the right two-thirds */}
        <path
          d="M 218 24 H 616 V 456 H 196 C 204 340, 212 184, 218 24 Z"
          fill="var(--sculpt-sage)"
        />

        {/* Grounding left sand column echoing the focused vertical Stem */}
        <path
          d="M 24 186 C 84 156, 152 146, 224 152 V 456 H 24 Z"
          fill="var(--sculpt-sand)"
          fillOpacity="0.78"
        />

        {/* Monumental deep Botanical Forest sweeping arch derived from MARK_SWEEP_PATH */}
        <path
          d="M 232 24 H 316 C 272 78, 256 144, 272 214 C 296 318, 408 370, 616 372 V 456 H 352 C 254 456, 198 394, 198 296 V 132 C 198 78, 208 44, 232 24 Z"
          fill="var(--sculpt-sage-deep)"
        />

        {/* Soft carved daylight ribbon giving subtle ceramic relief across the sweep */}
        <path
          d="M 288 176 C 344 268, 456 320, 616 322 V 364 C 442 362, 326 306, 270 212 Z"
          fill="var(--card)"
          fillOpacity="0.24"
        />

        {/* Warm terracotta datum bridge connecting focused effort to broad reach */}
        <path
          d="M 24 218 A 66 66 0 0 1 90 152 H 550 A 66 66 0 0 1 616 218"
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

      {/* Quiet outer hairline framing the sunlit relief */}
      <rect
        x="24"
        y="24"
        width="592"
        height="432"
        rx="30"
        stroke="var(--rule-strong)"
        strokeWidth="1.25"
      />
    </svg>
  </div>
);

// Serene modernist overlapping horizon sculpture for the Deep Botanical Charcoal Vision band: warm layered botanical planes and a calm terracotta sunrise arc expressing clarity and multiplied reach.
export const AsymmetricAiField = (): ReactNode => (
  <div className="border-night-rule relative overflow-hidden rounded-3xl border bg-[#192b27]">
    <svg
      viewBox="0 0 560 320"
      fill="none"
      role="img"
      aria-label="Serene abstract landscape of layered deep botanical planes and warm terracotta horizon arcs opening smoothly from left to right, expressing calm clarity and multiplied reach."
      className="block aspect-[7/4] w-full"
    >
      <defs>
        <radialGradient
          id="asym-vision-glow"
          cx="24%"
          cy="72%"
          r="68%"
        >
          <stop offset="0%" stopColor="#3c665b" stopOpacity="0.72" />
          <stop offset="60%" stopColor="#223b35" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#192b27" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft ambient botanical warmth */}
      <rect x="0" y="0" width="560" height="320" fill="url(#asym-vision-glow)" />

      {/* Layered matte organic hills/arcs rising gently across the canvas */}
      <path
        d="M -20 230 C 120 156, 280 120, 580 144 V 340 H -20 Z"
        fill="#213933"
      />
      <path
        d="M -20 264 C 138 202, 316 172, 580 202 V 340 H -20 Z"
        fill="#2b4b43"
      />
      <path
        d="M -20 296 C 166 248, 356 230, 580 258 V 340 H -20 Z"
        fill="#396358"
      />

      {/* Soft morning horizon light ribbon sweeping into open reach */}
      <path
        d="M -16 248 C 118 242, 206 168, 336 138 C 424 118, 496 112, 576 114"
        stroke="#72cfb3"
        strokeOpacity="0.52"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Primary warm terracotta sweep echoing the asym horizon arch */}
      <path
        d="M -16 268 C 126 266, 204 188, 324 176 C 414 167, 492 168, 576 172"
        stroke="#f08265"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Gentle sunlit terracotta stone tucked calmly onto the sweep */}
      <circle cx="192" cy="214" r="24" fill="#f08265" fillOpacity="0.18" />
      <circle cx="192" cy="214" r="10" fill="#f08265" />
      <circle cx="192" cy="214" r="3.5" fill="#f7f6f2" />
    </svg>
  </div>
);

// Warm minimal geometric facets cropped from the asym mark to anchor the three human-outcome cards.
export const PerspectiveFacet = ({
  variant,
}: {
  readonly variant: "donor" | "field" | "office";
}): ReactNode => (
  <span className="bg-record inline-flex size-10 shrink-0 items-center justify-center rounded-xl">
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
