/* eslint-disable @next/next/no-img-element, react-doctor/nextjs-no-img-element -- The plates ship as pre-encoded 640w/1200w WebP files, so they are served as-is instead of being recompressed at request time. */
import type { ReactNode } from "react";

type PlateName =
  | "three-hands-plate"
  | "human-seal-plate"
  | "archive-ledger-plate";
type PlateTheme = "light" | "dark";

const PLATE_WIDTH = 1200;
const PLATE_HEIGHT = 900;

const plateSources = (name: PlateName, theme: PlateTheme) => {
  const stem = theme === "dark" ? `/art/${name}-dark` : `/art/${name}`;
  return {
    src: `${stem}.webp`,
    srcSet: `${stem}-640.webp 640w, ${stem}.webp ${PLATE_WIDTH}w`,
  };
};

/**
The light and dark editions of one engraved plate.

`loading="lazy"` keeps the `display: none` opposite-theme edition from
downloading on initial load, while `priority` pairs media-scoped preloads with
`fetchPriority="high"` and `decoding="sync"` so the visible hero plate paints
immediately once bytes arrive. `data-theme-plate` lets `ThemeToggle` warm the
hidden edition before a click or touch tap using the exact `srcset` and `sizes`.
*/
export const ThemedPlate = ({
  name,
  alt,
  sizes,
  priority = false,
}: {
  readonly name: PlateName;
  readonly alt: string;
  readonly sizes: string;
  readonly priority?: boolean;
}): ReactNode => {
  const light = plateSources(name, "light");
  const dark = plateSources(name, "dark");

  return (
    <>
      {priority ? (
        <>
          <link
            rel="preload"
            as="image"
            imageSrcSet={light.srcSet}
            imageSizes={sizes}
            media="(prefers-color-scheme: light)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            imageSrcSet={dark.srcSet}
            imageSizes={sizes}
            media="(prefers-color-scheme: dark)"
            fetchPriority="high"
          />
        </>
      ) : null}
      <img
        src={light.src}
        srcSet={light.srcSet}
        sizes={sizes}
        alt={alt}
        width={PLATE_WIDTH}
        height={PLATE_HEIGHT}
        loading="lazy"
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        data-theme-plate="light"
        className="block h-full w-full object-cover dark:hidden"
      />
      <img
        src={dark.src}
        srcSet={dark.srcSet}
        sizes={sizes}
        alt={alt}
        width={PLATE_WIDTH}
        height={PLATE_HEIGHT}
        loading="lazy"
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        data-theme-plate="dark"
        className="hidden h-full w-full object-cover dark:block"
      />
    </>
  );
};
