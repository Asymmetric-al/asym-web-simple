import { DocumentPage, DocumentSection } from "@/components/site/document-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const statements = [
  "We believe that the writings of both Old and New Testaments were breathed out by God through the Holy Spirit, perfectly and without error, and are the final authority in all matters of faith and practice.",
  "We believe in one true and living God, the maker of heaven and earth, who exists eternally as three distinct persons: Father, Son, and Holy Spirit.",
  "We believe man was created in the image of God, to glorify God, and enjoy Him forever. Because of Adam's sin, man lost his innocence and incurred the penalty of spiritual and physical death, so that all human beings are now born with a sinful nature and are unable to save themselves.",
  "We believe Jesus Christ is the only begotten Son of God, who was born of the virgin Mary, lived a life of perfect obedience, suffered under Pontius Pilate, was crucified, died, and was buried; and that on the third day He arose bodily from the tomb, ascended into heaven, and now sits at the right hand of the throne of God.",
  "We believe salvation is in no way a work of man, but a gracious gift of God, received by faith, and made possible only by the substitutionary death of Jesus Christ on the cross.",
  "We believe in one church, which is the body of Christ, and includes all those who have been born again by the Holy Spirit. We affirm that believers in Jesus Christ should be baptized and should participate together in the Lord’s Supper to remember His death until He comes.",
  "We believe Jesus Christ is coming again in glory to receive His church to Himself, and to judge the world in righteousness.",
  "We believe in the resurrection of the dead, the punishment of the wicked, and the eternal blessedness of the redeemed.",
] as const;

export const metadata: Metadata = createMetadata({
  title: "Statement of Faith",
  description:
    "The doctrinal foundation beneath Asymmetric.al and its covering under Global Fellowship Inc.",
  path: "/statement-of-faith",
});

export default function StatementOfFaithPage() {
  return (
    <DocumentPage
      eyebrow="Doctrinal Foundation"
      title={
        <h1 className="font-heading text-foreground text-[clamp(3rem,6vw,4.8rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
          Statement of Faith.
        </h1>
      }
      description="The theological bedrock upon which we build. Asymmetric.al is a project of Global Fellowship Inc., standing on the historic Christian faith."
      heading="Global Fellowship Inc."
      heroMeta={[
        "Historic Christianity",
        "Doctrinal accountability",
        "Project under Christian covering",
      ]}
    >
      <DocumentSection title="Covering" tone="accent">
        <p>
          We operate under Christian governance and doctrinal accountability,
          not as an isolated brand with detached spiritual language.
        </p>
      </DocumentSection>

      <div className="grid gap-4 pt-4">
        {statements.map((statement, index) => (
          <Card
            key={statement}
            className="surface-card surface-interactive rounded-[1.9rem]"
          >
            <CardHeader>
              <p className="text-primary/70 font-mono text-[0.72rem] tracking-[0.28em] uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <CardTitle className="font-heading text-xl font-semibold tracking-[-0.04em]">
                Article {index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-base leading-7">
              {statement}
            </CardContent>
          </Card>
        ))}
      </div>
    </DocumentPage>
  );
}
