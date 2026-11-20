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

The default light edition loads eagerly (`fetchPriority="high"` for the hero
plate, `fetchPriority="low"` below the fold) so Plate I paints immediately and
Plates II/III never appear blank on scroll or full-page captures. Dark editions
stay `loading="lazy"` (with a `prefers-color-scheme: dark` preload on the hero
plate) so light visitors never download hidden dark plates on first paint.
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
        <link
          rel="preload"
          as="image"
          imageSrcSet={dark.srcSet}
          imageSizes={sizes}
          media="(prefers-color-scheme: dark)"
          fetchPriority="high"
        />
      ) : null}
      <img
        src={light.src}
        srcSet={light.srcSet}
        sizes={sizes}
        alt={alt}
        width={PLATE_WIDTH}
        height={PLATE_HEIGHT}
        loading="eager"
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "low"}
        data-theme-plate="light"
        data-priority={priority ? "true" : undefined}
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
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        data-theme-plate="dark"
        data-priority={priority ? "true" : undefined}
        className="hidden h-full w-full object-cover dark:block"
      />
    </>
  );
};
