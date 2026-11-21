/* eslint-disable react-doctor/nextjs-no-img-element -- The plates ship as pre-encoded 480w/800w/1200w AVIF + WebP files, so they are served as-is instead of being recompressed at request time. */
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
    avifSrcSet: `${stem}-480.avif 480w, ${stem}-800.avif 800w, ${stem}.avif ${PLATE_WIDTH}w`,
    src: `${stem}.webp`,
    webpSrcSet: `${stem}-480.webp 480w, ${stem}-640.webp 640w, ${stem}-800.webp 800w, ${stem}.webp ${PLATE_WIDTH}w`,
  };
};

/**
The light and dark editions of one engraved plate.

Only the hero plate (`priority={true}`) loads eagerly with `fetchPriority="high"`
and `<link rel="preload" as="image" type="image/avif">` matched to the visitor's
color scheme so Slow 4G mobile devices download the compact 480w/800w AVIF
candidate immediately. Below-the-fold plates and hidden dark editions stay
`loading="lazy"` so light visitors never contend with off-screen art.
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
            type="image/avif"
            imageSrcSet={light.avifSrcSet}
            imageSizes={sizes}
            media="(prefers-color-scheme: light)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            type="image/avif"
            imageSrcSet={dark.avifSrcSet}
            imageSizes={sizes}
            media="(prefers-color-scheme: dark)"
            fetchPriority="high"
          />
        </>
      ) : null}
      <picture className="block h-full w-full dark:hidden">
        <source type="image/avif" srcSet={light.avifSrcSet} sizes={sizes} />
        <img
          src={light.src}
          srcSet={light.webpSrcSet}
          sizes={sizes}
          alt={alt}
          width={PLATE_WIDTH}
          height={PLATE_HEIGHT}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          data-theme-plate="light"
          data-priority={priority ? "true" : undefined}
          className="block h-full w-full object-cover"
        />
      </picture>
      <picture className="hidden h-full w-full dark:block">
        <source type="image/avif" srcSet={dark.avifSrcSet} sizes={sizes} />
        <img
          src={dark.src}
          srcSet={dark.webpSrcSet}
          sizes={sizes}
          alt={alt}
          width={PLATE_WIDTH}
          height={PLATE_HEIGHT}
          loading="lazy"
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          data-theme-plate="dark"
          data-priority={priority ? "true" : undefined}
          className="block h-full w-full object-cover"
        />
      </picture>
    </>
  );
};
