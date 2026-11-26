import { Container } from "@/components/site/container";
import { Scrollspy } from "@/components/site/reui/scrollspy";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface DocumentTocItem {
  readonly id: string;
  readonly number: string;
  readonly label: string;
}

export const DocumentPage = ({
  eyebrow,
  title,
  description,
  toc,
  children,
  footer,
}: {
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly description: ReactNode;
  readonly toc?: readonly DocumentTocItem[];
  readonly children: ReactNode;
  readonly footer?: ReactNode;
}) => (
  <main
    id="main-content"
    className="relative isolate outline-none"
    tabIndex={-1}
  >
    <Container>
      <div
        className={cn(
          "pt-[clamp(7rem,8.5vw,9rem)] pb-14 sm:pb-18",
          toc && toc.length > 0
            ? "lg:grid lg:grid-cols-[minmax(0,48rem)_minmax(14rem,17rem)] lg:items-start lg:justify-between lg:gap-12"
            : ""
        )}
      >
        <article className="max-w-[48rem] min-w-0">
          <p className="text-signal font-mono text-xs font-medium tracking-[0.02em]">
            {eyebrow}
          </p>
          {title}
          <div className="text-muted-foreground mt-6 max-w-[44rem] text-base leading-7 sm:text-lg sm:leading-8">
            {description}
          </div>
          <div className="mt-12 flex flex-col gap-10 sm:gap-12">{children}</div>
          {footer ? (
            <div className="border-foreground/10 text-muted-foreground mt-12 border-t pt-6 text-base leading-7">
              {footer}
            </div>
          ) : null}
        </article>

        {toc && toc.length > 0 ? (
          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <nav aria-label="On this page">
              <p className="text-signal font-mono text-xs font-medium tracking-[0.02em]">
                On this page
              </p>
              <Scrollspy offset={132} className="mt-3">
                <ol className="border-rule flex flex-col gap-1 border-l">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        data-scrollspy-anchor={item.id}
                        className="doc-toc-link text-muted-foreground focus-visible:ring-ring -ml-px flex items-baseline gap-2.5 border-l-2 border-transparent py-1.5 pl-3.5 text-sm leading-5 font-medium transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:outline-2 focus-visible:outline-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground"
                      >
                        <span className="font-mono text-xs tabular-nums">
                          {item.number}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </Scrollspy>
            </nav>
          </aside>
        ) : null}
      </div>
    </Container>
  </main>
);

export const DocumentSection = ({
  id,
  number,
  title,
  children,
  className,
}: {
  readonly id?: string;
  readonly number?: string;
  readonly title: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
}) => (
  <section id={id} className={cn("grid scroll-mt-28 gap-3", className)}>
    {number ? (
      <p className="text-signal font-mono text-xs font-medium tracking-[0.02em]">
        {number}
      </p>
    ) : null}
    <h2 className="font-heading text-foreground text-[clamp(1.6rem,2.5vw,2.1rem)] leading-tight font-semibold tracking-[-0.025em]">
      {title}
    </h2>
    <div className="text-muted-foreground grid gap-4 text-base leading-7 sm:text-[1.04rem] sm:leading-8">
      {children}
    </div>
  </section>
);
