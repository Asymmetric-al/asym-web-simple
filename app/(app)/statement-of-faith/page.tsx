import { PageHero, Section } from "@/components/site/page";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/site/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";

interface FaithPoint {
  readonly label: string;
  readonly text: string;
}

const FAITH_POINTS: readonly FaithPoint[] = [
  {
    label: "One",
    text: "We believe that the writings of both Old and New Testaments were breathed out by God through the Holy Spirit, perfectly and without error, and are the final authority in all matters of faith and practice.",
  },
  {
    label: "Two",
    text: "We believe in one true and living God the maker of heaven and earth, who exists eternally as three distinct persons: Father, Son, and Holy Spirit.",
  },
  {
    label: "Three",
    text: "We believe man was created in the image of God, to glorify God, and enjoy Him forever. But, because of Adam's sin, man lost his innocence and incurred the penalty of spiritual and physical death, so that all human beings are now born with a sinful nature, unable to please God, unable to satisfy God's just requirements, and are therefore separated from God, lost, and unable to save themselves.",
  },
  {
    label: "Four",
    text: "We believe Jesus Christ is the only begotten Son of God, who was born of the virgin Mary, lived a life of perfect obedience, suffered under Pontius Pilate, was crucified, died, and was buried; and that on the third day He arose bodily from the tomb, ascended into heaven, and now sits at the right hand of the throne of God.",
  },
  {
    label: "Five",
    text: "We believe salvation is in no way a work of man, but a gracious gift of God, received by faith, and made possible only by the substitutionary death of Jesus Christ on the cross.",
  },
  {
    label: "Six",
    text: "We believe in one church, which is the body of Christ, and includes all those who have been born again by the Holy Spirit. We affirm that believers in Jesus Christ should be baptized, and should participate together in the Lord's Supper to remember His death until He comes.",
  },
  {
    label: "Seven",
    text: "We believe Jesus Christ is coming again in glory to receive His church to Himself, and to judge the world in righteousness.",
  },
  {
    label: "Eight",
    text: "We believe in the resurrection of the dead, the punishment of the wicked, and the eternal blessedness of the redeemed.",
  },
];

export const metadata: Metadata = createMetadata({
  title: "Statement of Faith",
  description:
    "The doctrinal foundation beneath Asymmetric.al and its covering under Global Fellowship Inc.",
  path: "/statement-of-faith",
});

const FaithPointCard = ({ point, index }: { point: FaithPoint; index: number }) => (
  <Card className="surface-card surface-interactive rounded-[1.9rem] group hover:border-foreground/30 transition-all duration-300">
    <CardHeader>
      <div className="flex items-center gap-3 mb-2">
        <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
          {String(index + 1).padStart(2, "0")}
        </p>
        <span className="text-[10px] font-mono text-muted-foreground/30">{"//"}</span>
        <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-wider">
          Article {index + 1}
        </p>
      </div>
      <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
        {point.label}
      </CardTitle>
    </CardHeader>
    <CardContent className="text-muted-foreground text-base leading-7 group-hover:text-foreground transition-colors">
      {point.text}
    </CardContent>
  </Card>
);

export default function StatementOfFaithPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        eyebrow={
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-secondary/50 rounded-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground backdrop-blur-md">
            <BookOpen size={12} className="text-primary" />
            <span>DOCTRINAL FOUNDATION</span>
          </div>
        }
        title={
          <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,4.8rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
            Statement
            <br />
            of Faith.
          </h1>
        }
        description="The theological bedrock upon which we build. Asymmetric.al is a project of Global Fellowship Inc., standing on the historic Christian faith."
      />

      <Section>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="border-l-2 border-border pl-8 mb-12">
              <p className="text-xl text-muted-foreground font-light leading-relaxed text-balance">
                We operate under Christian governance and doctrinal accountability,
                not as an isolated brand with detached spiritual language.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 pt-4">
            <StaggerReveal>
              {FAITH_POINTS.map((point, index) => (
                <StaggerItem key={point.label}>
                  <FaithPointCard point={point} index={index} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </Section>
    </main>
  );
}
