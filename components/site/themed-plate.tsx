/* eslint-disable @next/next/no-img-element, react-doctor/nextjs-no-img-element -- The plates ship as pre-encoded 640w/1200w WebP files, so they are served as-is instead of being recompressed at request time. */
import type { ReactNode } from "react";

type PlateName = "three-hands-plate" | "human-seal-plate";
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

Both images are lazy so the browser never downloads the hidden theme edition.
`priority` adds one media-scoped preload per color scheme for the hero plate so
system-default visitors preload only their active edition. `data-theme-plate`
lets `ThemeToggle` warm the hidden edition using the exact `srcset` and `sizes`
the browser will render when toggled.
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
        decoding="async"
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
        decoding="async"
        data-theme-plate="dark"
        className="hidden h-full w-full object-cover dark:block"
      />
    </>
  );
};
