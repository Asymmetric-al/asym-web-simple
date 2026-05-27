import { DocumentPage, DocumentSection } from "@/components/site/document-page";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const faithPoints = [
  {
    number: "01",
    title: "Scripture",
    text: "We believe the Old and New Testaments were breathed out by God through the Holy Spirit, are true and without error, and are the final authority in all matters of faith and practice.",
  },
  {
    number: "02",
    title: "God",
    text: "We believe in one true and living God, the maker of heaven and earth, who exists eternally as three distinct persons: Father, Son, and Holy Spirit.",
  },
  {
    number: "03",
    title: "Humanity and sin",
    text: "We believe humanity was created in the image of God to glorify Him and enjoy Him forever. Because of Adam's sin, all people are now born with a sinful nature, separated from God, and unable to save themselves.",
  },
  {
    number: "04",
    title: "Jesus Christ",
    text: "We believe Jesus Christ is the only begotten Son of God, born of the virgin Mary, perfectly obedient, crucified, buried, bodily raised on the third day, ascended into heaven, and now seated at the right hand of God.",
  },
  {
    number: "05",
    title: "Salvation",
    text: "We believe salvation is not the work of man but a gracious gift of God, received by faith and made possible only through the substitutionary death of Jesus Christ on the cross.",
  },
  {
    number: "06",
    title: "Church and ordinances",
    text: "We believe in one church, the body of Christ, made up of all who have been born again by the Holy Spirit. We affirm baptism and the Lord's Supper as practices for believers in Jesus Christ.",
  },
  {
    number: "07",
    title: "Christ's return",
    text: "We believe Jesus Christ is coming again in glory to receive His church to Himself and to judge the world in righteousness.",
  },
  {
    number: "08",
    title: "Resurrection and judgment",
    text: "We believe in the resurrection of the dead, the punishment of the wicked, and the eternal blessedness of the redeemed.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Statement of Faith",
  description:
    "The core Christian convictions behind Asym and the nonprofit ministry behind it.",
  path: "/statement-of-faith",
});

export default function StatementOfFaithPage() {
  return (
    <DocumentPage
      eyebrow="Statement of Faith"
      title={
        <h1 className="font-heading text-foreground mt-5 text-[clamp(3rem,6vw,5rem)] leading-[0.94] font-semibold tracking-[-0.07em] text-balance">
          Statement of Faith
        </h1>
      }
      description="Asym is openly Christian. These are the core convictions behind the work and the nonprofit ministry behind it."
    >
      {faithPoints.map((point) => (
        <DocumentSection
          key={point.number}
          number={point.number}
          title={point.title}
        >
          <p>{point.text}</p>
        </DocumentSection>
      ))}
    </DocumentPage>
  );
}
