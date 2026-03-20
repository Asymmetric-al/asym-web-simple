const CORNER_PATH =
  "M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z";

/**
 * Fixed quarter-round corners inspired by the React Bits SaaS template frame language.
 * Sits below the header (z-38) so navigation remains unobstructed.
 */
export function SiteChrome() {
  const base =
    "pointer-events-none fixed z-[38] text-foreground/[0.06] max-lg:hidden dark:text-foreground/[0.09]";

  return (
    <>
      <svg
        className={`${base} top-3 left-3`}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d={CORNER_PATH} fill="currentColor" />
      </svg>
      <svg
        className={`${base} top-3 right-3 rotate-90`}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d={CORNER_PATH} fill="currentColor" />
      </svg>
      <svg
        className={`${base} bottom-3 left-3 -rotate-90`}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d={CORNER_PATH} fill="currentColor" />
      </svg>
      <svg
        className={`${base} bottom-3 right-3 rotate-180`}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d={CORNER_PATH} fill="currentColor" />
      </svg>
    </>
  );
}
