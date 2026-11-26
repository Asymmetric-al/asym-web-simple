"use client";

import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/site/icons";
import { BrowserWindow } from "@/components/site/reactbits/browser-window";
import { siteConfig } from "@/lib/config";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CoreScreen {
  readonly id: string;
  readonly title: string;
  readonly shortLabel: string;
  readonly workspace: string;
  readonly appPath: string;
  readonly url: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly summary: string;
  readonly tags: readonly [string, string];
  readonly alt: string;
}

const CORE_SCREENS: readonly CoreScreen[] = [
  {
    id: "web-studio",
    title: "Web Studio",
    shortLabel: "Web Studio",
    workspace: "Mission Control",
    appPath: "apps/admin",
    url: "mission-control.asym.app/admin/web-studio",
    src: "/captures/web-studio.png",
    width: 1600,
    height: 900,
    summary:
      "Publish standard pages, missionary giving pages, project appeals, and ministry updates straight from Mission Control, connected to your live funds and visibility rules.",
    tags: ["Payload CMS", "Live funds"],
    alt: "Web Studio inside Mission Control showing creation cards for standard pages, missionary giving pages, project pages, and ministry updates alongside recently updated documents using Give Hope sample content.",
  },
  {
    id: "donor-portal",
    title: "Donor portal",
    shortLabel: "Donor portal",
    workspace: "Supporter workspace",
    appPath: "apps/donor",
    url: "givehope.org/donor",
    src: "/captures/donor-portal.png",
    width: 1440,
    height: 810,
    summary:
      "Supporters review year-to-date giving, manage recurring gifts, download receipts and annual tax statements, and read field updates in one self-service portal.",
    tags: ["Self-service", "Tax statements"],
    alt: "Donor portal showing year-to-date giving totals, active recurring support, a featured field update from Chiang Mai, and recent ministry updates using Give Hope sample content.",
  },
  {
    id: "public-website",
    title: "Public ministry website",
    shortLabel: "Public website",
    workspace: "Public website",
    appPath: "apps/donor",
    url: "givehope.org",
    src: "/captures/public-website.png",
    width: 1440,
    height: 810,
    summary:
      "Your organization’s public site and giving pages run on the same system as Mission Control, so appeals, missionary profiles, and updates stay current.",
    tags: ["Same database", "Direct giving"],
    alt: "Public ministry website homepage for the Give Hope demo tenant with the Hope is a verb headline, navigation for Mission, Deployments, Transparency, Ways to Give, and Give Now, plus deployed giving totals.",
  },
  {
    id: "missionary-updates",
    title: "Missionary updates",
    shortLabel: "Field updates",
    workspace: "Missionary workspace",
    appPath: "apps/missionary",
    url: "missionaries.asym.app/updates",
    src: "/captures/missionary-updates.png",
    width: 1600,
    height: 900,
    summary:
      "Missionaries draft and publish prayer requests, field stories, and partner updates from their workspace without exporting spreadsheets or juggling outside tools.",
    tags: ["Partner updates", "Privacy-safe"],
    alt: "Missionary workspace updates feed showing an update composer, follow requests panel, and a published Kajiado clinic update from Grace Okafor using Give Hope sample content.",
  },
];

const FEATURED_SIZES = "(max-width: 1024px) 100vw, 800px";
const THUMB_SIZES = "(max-width: 640px) 44vw, (max-width: 1024px) 22vw, 185px";

const ScreenMeta = ({
  screen,
  animate,
}: {
  readonly screen: CoreScreen;
  readonly animate: boolean;
}): ReactNode => (
  <div
    key={screen.id}
    className={cn("flex flex-col", animate && "surface-enter")}
  >
    <p className="text-signal font-mono text-xs font-medium">
      {screen.workspace} · <span translate="no">{screen.appPath}</span>
    </p>
    <h4 className="font-heading text-foreground mt-1.5 text-xl leading-snug font-semibold tracking-[-0.02em] sm:text-2xl">
      {screen.title}
    </h4>
    <p className="text-muted-foreground mt-2.5 text-sm leading-6 text-pretty">
      {screen.summary}
    </p>
    <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
      {screen.tags.map((tag) => (
        <span
          key={tag}
          className="border-rule bg-card text-muted-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs forced-colors:border-[CanvasText]"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const ThumbnailCardContent = ({
  screen,
  index,
}: {
  readonly screen: CoreScreen;
  readonly index: number;
}): ReactNode => (
  <>
    <span className="bg-record relative block aspect-video w-full overflow-hidden">
      <Image
        src={screen.src}
        alt=""
        width={screen.width}
        height={screen.height}
        loading="lazy"
        sizes={THUMB_SIZES}
        className="block h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
      />
    </span>
    <span className="border-rule bg-card flex items-center justify-between gap-1.5 border-t px-2.5 py-2">
      <span className="text-foreground truncate font-sans text-xs font-medium">
        {screen.shortLabel}
      </span>
      <span
        aria-hidden="true"
        className="text-muted-foreground group-data-selected:text-signal shrink-0 font-mono text-xs tabular-nums"
      >
        0{index + 1}
      </span>
    </span>
  </>
);

const controlButtonClass =
  "border-rule-strong bg-card text-foreground focus-visible:ring-ring focus-visible:ring-offset-record inline-flex size-11 cursor-pointer items-center justify-center rounded-full border transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent sm:size-9 [@media(hover:hover)_and_(pointer:fine)]:hover:border-signal-border [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal forced-colors:border-[CanvasText]";

const staticControlClass =
  "border-rule-strong bg-card text-muted-foreground inline-flex size-11 items-center justify-center rounded-full border sm:size-9 forced-colors:border-[CanvasText]";

export const ScreensGallery = (): ReactNode => {
  const isHydrated = useIsClient();
  const [defaultScreen] = CORE_SCREENS;
  const [selectedId, setSelectedId] = useState<string>(
    defaultScreen?.id ?? "web-studio"
  );
  const [hasSwitched, setHasSwitched] = useState(false);

  if (!defaultScreen) {
    return null;
  }

  const foundIndex = CORE_SCREENS.findIndex((item) => item.id === selectedId);
  const activeIndex = foundIndex === -1 ? 0 : foundIndex;
  const activeScreen = CORE_SCREENS[activeIndex] ?? defaultScreen;

  const selectScreen = (nextId: string): void => {
    if (nextId === selectedId) {
      return;
    }
    setHasSwitched(true);
    setSelectedId(nextId);
  };

  const stepScreen = (delta: -1 | 1): void => {
    const nextIndex =
      (activeIndex + delta + CORE_SCREENS.length) % CORE_SCREENS.length;
    const nextScreen = CORE_SCREENS[nextIndex];
    if (nextScreen) {
      selectScreen(nextScreen.id);
    }
  };

  return (
    <figure className="border-rule-strong bg-card mt-6 overflow-hidden rounded-2xl border shadow-[var(--shadow-card)]">
      <div className="border-rule bg-record/55 flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-7">
        <div className="min-w-0">
          <h3 className="text-foreground font-sans text-sm font-semibold">
            Core screens
          </h3>
          <p className="text-muted-foreground mt-0.5 text-xs leading-5 sm:text-sm">
            Four views from the open-source codebase: Mission Control, the donor
            portal, the public website, and missionary updates.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <span className="border-signal-border bg-signal-soft text-signal inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium forced-colors:border-[CanvasText]">
            4 screens
          </span>
          <span className="border-rule bg-card text-muted-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs forced-colors:border-[CanvasText]">
            Sample content
          </span>
        </div>
      </div>

      <div className="bg-record/40 p-4 sm:p-5 lg:p-6">
        {isHydrated ? (
          <Tabs
            value={activeScreen.id}
            onValueChange={(nextValue) => {
              if (nextValue === null) {
                return;
              }
              selectScreen(nextValue);
            }}
            className="grid gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-6"
          >
            <div className="flex min-w-0 flex-col justify-center lg:col-span-8">
              <BrowserWindow
                url={activeScreen.url}
                label={`${activeScreen.workspace} ${activeScreen.title} browser preview`}
                badge={activeScreen.appPath}
              >
                {CORE_SCREENS.map((screen) => (
                  <TabsPanel
                    key={screen.id}
                    value={screen.id}
                    className="focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent"
                  >
                    <div
                      className={cn(
                        "bg-record relative aspect-video w-full overflow-hidden",
                        hasSwitched &&
                          activeScreen.id === screen.id &&
                          "surface-enter"
                      )}
                    >
                      <Image
                        src={screen.src}
                        alt={screen.alt}
                        width={screen.width}
                        height={screen.height}
                        loading="eager"
                        sizes={FEATURED_SIZES}
                        className="block h-full w-full object-cover"
                      />
                    </div>
                  </TabsPanel>
                ))}
              </BrowserWindow>
            </div>

            <div className="flex min-w-0 flex-col justify-between gap-5 lg:col-span-4">
              <div aria-live="polite" className="min-w-0 lg:min-h-[11rem]">
                <ScreenMeta screen={activeScreen} animate={hasSwitched} />
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="border-rule flex items-center justify-between gap-3 border-t pt-4">
                  <p className="text-muted-foreground font-mono text-xs tabular-nums">
                    <span className="text-foreground font-semibold">
                      0{activeIndex + 1}
                    </span>{" "}
                    / 0{CORE_SCREENS.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => stepScreen(-1)}
                      aria-label="Previous screen"
                      className={controlButtonClass}
                    >
                      <ArrowLeft
                        className="size-4"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepScreen(1)}
                      aria-label="Next screen"
                      className={controlButtonClass}
                    >
                      <ArrowRight
                        className="size-4"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>

                <TabsList
                  aria-label="Core application screens"
                  className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2"
                >
                  {CORE_SCREENS.map((screen, index) => (
                    <TabsTab
                      key={screen.id}
                      value={screen.id}
                      className={cn(
                        "group border-rule-strong bg-card focus-visible:ring-ring focus-visible:ring-offset-record block w-full cursor-pointer overflow-hidden rounded-xl border text-left transition-transform duration-150 ease-out select-none active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-2 focus-visible:outline-transparent",
                        "opacity-85 [@media(hover:hover)_and_(pointer:fine)]:hover:border-rule-interactive [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-100",
                        "data-selected:border-signal-border data-selected:ring-signal/25 data-selected:opacity-100 data-selected:shadow-xs data-selected:ring-2",
                        "forced-colors:border-[CanvasText] forced-colors:data-selected:border-[Highlight] forced-colors:data-selected:ring-[Highlight]"
                      )}
                    >
                      <ThumbnailCardContent screen={screen} index={index} />
                    </TabsTab>
                  ))}
                </TabsList>
              </div>
            </div>
          </Tabs>
        ) : (
          <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch lg:gap-6">
            <div className="flex min-w-0 flex-col justify-center lg:col-span-8">
              <BrowserWindow
                url={defaultScreen.url}
                label={`${defaultScreen.workspace} ${defaultScreen.title} browser preview`}
                badge={defaultScreen.appPath}
              >
                <div className="bg-record relative aspect-video w-full overflow-hidden">
                  <Image
                    src={defaultScreen.src}
                    alt={defaultScreen.alt}
                    width={defaultScreen.width}
                    height={defaultScreen.height}
                    loading="eager"
                    sizes={FEATURED_SIZES}
                    className="block h-full w-full object-cover"
                  />
                </div>
              </BrowserWindow>
            </div>

            <div className="flex min-w-0 flex-col justify-between gap-5 lg:col-span-4">
              <div className="min-w-0 lg:min-h-[11rem]">
                <ScreenMeta screen={defaultScreen} animate={false} />
              </div>

              <div className="flex flex-col gap-3.5">
                <div
                  aria-hidden="true"
                  className="border-rule flex items-center justify-between gap-3 border-t pt-4"
                >
                  <p className="text-muted-foreground font-mono text-xs tabular-nums">
                    <span className="text-foreground font-semibold">01</span> /
                    0{CORE_SCREENS.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={staticControlClass}>
                      <ArrowLeft className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className={staticControlClass}>
                      <ArrowRight className="size-4" strokeWidth={1.75} />
                    </span>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2"
                >
                  {CORE_SCREENS.map((screen, index) => (
                    <span
                      key={screen.id}
                      className={cn(
                        "border-rule-strong bg-card block w-full overflow-hidden rounded-xl border text-left",
                        index === 0
                          ? "border-signal-border ring-signal/25 shadow-xs ring-2"
                          : "opacity-85"
                      )}
                    >
                      <ThumbnailCardContent screen={screen} index={index} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <noscript>
        <div className="border-rule bg-record/30 grid gap-4 border-t p-4 sm:grid-cols-3 sm:p-6">
          {CORE_SCREENS.slice(1).map((screen) => (
            <div
              key={screen.id}
              className="border-rule-strong bg-card overflow-hidden rounded-xl border"
            >
              <div className="bg-record relative aspect-video w-full overflow-hidden">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="block h-full w-full object-cover"
                />
              </div>
              <div className="border-rule border-t p-3">
                <p className="text-signal font-mono text-xs">
                  {screen.workspace} ·{" "}
                  <span translate="no">{screen.appPath}</span>
                </p>
                <p className="text-foreground mt-1 font-sans text-sm font-semibold">
                  {screen.title}
                </p>
                <p className="text-muted-foreground mt-1 text-xs leading-5">
                  {screen.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </noscript>

      <figcaption className="border-rule bg-record/35 text-muted-foreground flex flex-wrap items-center justify-between gap-3 border-t px-5 py-3.5 text-xs leading-5 sm:px-7">
        <span>
          Captured from{" "}
          <span translate="no" className="text-foreground font-mono">
            Asymmetric-al/core
          </span>{" "}
          using Give Hope demo tenant sample content.
        </span>
        <a
          href={`${siteConfig.repoUrl}#screens`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground focus-visible:ring-ring inline-flex min-h-11 shrink-0 items-center gap-1 rounded-xs font-mono text-xs font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-2 focus-visible:outline-transparent sm:min-h-8 [@media(hover:hover)_and_(pointer:fine)]:hover:text-signal"
        >
          See all Core screens
          <ArrowUpRightIcon className="size-3.5" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
};

export default ScreensGallery;
