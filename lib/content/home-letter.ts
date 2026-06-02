export const heroTitle = "We’re building Asym.";

type ParagraphBlock = {
  type: "paragraph";
  text: string;
  emphasis?: boolean;
};

type HeadingBlock = {
  type: "heading";
  text: string;
  id?: string;
  headingId: string;
};

type StanzaBlock = {
  type: "stanza";
  lines: readonly string[];
};

type SignatureBlock = {
  type: "signature";
  lines: readonly string[];
};

export type LetterBlock =
  | ParagraphBlock
  | HeadingBlock
  | StanzaBlock
  | SignatureBlock;

export const letterBlocks = [
  {
    type: "paragraph",
    text: "We’re Conrad and Blake.",
  },
  {
    type: "paragraph",
    text: "Asym is a product for Christian missions organizations. Asymmetric.al is the nonprofit ministry behind it.",
  },
  {
    type: "paragraph",
    text: "We don’t have customers yet. We do have a few organizations waiting to use it, a clear problem in front of us, and we’re building nonstop.",
  },
  {
    type: "paragraph",
    text: "It is very early. Some parts are still ugly. Some parts are half wired. Some parts work well enough that you can already see where this is going.",
  },
  {
    type: "heading",
    id: "why",
    headingId: "vision-heading",
    text: "The vision is simple.",
  },
  {
    type: "paragraph",
    text: "Christian missions organizations should not need five disconnected tools, three spreadsheets, two CRMs, and a part time miracle worker just to keep donors, missionaries, gifts, receipts, websites, emails, reports, and workflows from falling apart.",
  },
  {
    type: "paragraph",
    text: "That is not a small problem.",
  },
  {
    type: "paragraph",
    text: "It eats hours every week from people who already carry a lot.",
  },
  {
    type: "paragraph",
    text: "Mobilizers chase candidate paperwork. Finance teams reconcile gifts by hand. Missionaries wonder who gave, who stopped giving, and who needs a thank you. Member care teams try to keep track of who needs care before people fall through the cracks. Donors want a clean way to give, manage their gifts, and get receipts. Leaders want to know what is actually happening across the organization without asking someone to pull another report.",
  },
  {
    type: "paragraph",
    text: "Most of the time, the people doing the work are not asking for something flashy.",
  },
  {
    type: "paragraph",
    text: "They just want software that does not make their day harder.",
  },
  {
    type: "paragraph",
    text: "That is what Asym is trying to become.",
  },
  {
    type: "heading",
    id: "product",
    headingId: "product-heading",
    text: "One Mission Control for missions and nonprofit operations.",
  },
  {
    type: "paragraph",
    text: "We think Asym can become the operating system for missions organizations. That sounds big because it is. But it starts with ordinary things working the way they should.",
  },
  {
    type: "paragraph",
    text: "Giving. CRM. Donor portal. Missionary portal. Receipts. Statements. Automations. Reports. Websites. Email. AI help where it is actually useful.",
  },
  {
    type: "paragraph",
    text: "Not another dashboard for the sake of having a dashboard.",
  },
  {
    type: "paragraph",
    text: "A working system that takes administrative weight off the people who are trying to serve.",
  },
  {
    type: "paragraph",
    text: "We think missions technology is way behind where it should be.",
  },
  {
    type: "stanza",
    lines: [
      "Not because the work is unimportant.",
      "Because the market has never served this kind of work very well.",
    ],
  },
  {
    type: "paragraph",
    text: "The people doing some of the most meaningful work in the world often get stuck with the worst tools, because they are not an obvious software market and they do not have enterprise budgets.",
  },
  {
    type: "paragraph",
    text: "That bothers us.",
    emphasis: true,
  },
  {
    type: "paragraph",
    text: "It bothers us that a missionary can raise support from fifty people and still not have a simple, beautiful way to know who gave, who needs care, and what to do next.",
  },
  {
    type: "paragraph",
    text: "It bothers us that finance teams entrusted with donor money have to fight broken exports and manual reconciliation.",
  },
  {
    type: "paragraph",
    text: "It bothers us that small missions teams often have to choose between expensive legacy software and patched together tools that constantly break.",
  },
  {
    type: "paragraph",
    text: "We are not okay with that.",
    emphasis: true,
  },
  {
    type: "paragraph",
    text: "Asym exists because we believe small teams should be able to do more with less.",
  },
  {
    type: "stanza",
    lines: ["Not by working longer hours.", "Not by adding more admin."],
  },
  {
    type: "paragraph",
    text: "By giving them tools that quietly handle the boring parts, so they can stay focused on people, prayer, sending, care, discipleship, and the Gospel.",
  },
  {
    type: "paragraph",
    text: "That is the purpose.",
  },
  {
    type: "heading",
    headingId: "status-heading",
    text: "The product is early. The mission is not.",
  },
  {
    type: "paragraph",
    text: "That is why we are looking for people who want to build with us before it is obvious.",
  },
  {
    type: "paragraph",
    text: "People who can handle messy. People who care about craft, but do not need perfect conditions to start. People who can ship, learn, fix, and keep going.",
  },
  {
    type: "paragraph",
    text: "People who understand that software can either drain a ministry team or give them time back.",
  },
  {
    type: "paragraph",
    text: "We need builders who are comfortable owning real pieces of the system.",
  },
  {
    type: "stanza",
    lines: ["Not just having opinions about the work.", "Owning it."],
  },
  {
    type: "paragraph",
    text: "You might work on the donor portal one week, Stripe flows the next, Mission Control after that, and then a receipt PDF bug that absolutely has to work before year end giving.",
  },
  {
    type: "paragraph",
    text: "This is not a polished big company job.",
  },
  {
    type: "paragraph",
    text: "There is no giant team around each feature.",
  },
  {
    type: "paragraph",
    text: "There is a lot to build, and every good decision matters.",
  },
  {
    type: "paragraph",
    text: "We are building in public enough to learn fast, but carefully enough to protect the trust behind the work.",
  },
  {
    type: "paragraph",
    text: "Financial data has to be right. People data has to be safe. Permissions have to hold. Receipts have to send. Reports have to match. AI has to respect boundaries.",
  },
  {
    type: "heading",
    headingId: "details-heading",
    text: "The details matter because the mission matters.",
  },
  {
    type: "paragraph",
    text: "The boring details matter because the mission matters. So we are starting with the ordinary work that has to be right.",
  },
  {
    type: "stanza",
    lines: [
      "A donor gives.",
      "A receipt goes out.",
      "A missionary sees the gift.",
      "A staff member can find the donor.",
      "Someone in finance can export the report.",
      "A leader can understand what happened.",
    ],
  },
  {
    type: "stanza",
    lines: [
      "Then we make that smoother.",
      "Then we make it faster.",
      "Then we connect the next piece.",
    ],
  },
  {
    type: "paragraph",
    text: "That is the work.",
  },
  {
    type: "heading",
    id: "builders",
    headingId: "builders-heading",
    text: "Come build the next piece.",
  },
  {
    type: "paragraph",
    text: "A few good builders can change the daily work of a lot of missions teams.",
  },
  {
    type: "paragraph",
    text: "That is the kind of team we want to build this around.",
  },
  {
    type: "paragraph",
    text: "If you are looking for a clean, predictable, already figured out thing, this probably is not it.",
  },
  {
    type: "paragraph",
    text: "If you want to help build the foundation for something that could serve thousands of missionaries and the organizations behind them, we should talk.",
  },
  {
    type: "paragraph",
    text: "Asym is early.",
  },
  {
    type: "paragraph",
    text: "We are building nonstop.",
  },
  {
    type: "paragraph",
    text: "And we think this is worth giving ourselves to.",
  },
  {
    type: "signature",
    lines: ["Conrad and Blake"],
  },
] as const satisfies readonly LetterBlock[];

export const cta = {
  title: "Want to shape Asym with us?",
  emailLabel: "Send us an email.",
  contributeLabel: "Contribute on GitHub.",
  contributeHref:
    "https://github.com/Asymmetric-al/core?tab=contributing-ov-file#readme",
} as const;

function blockText(block: LetterBlock) {
  if (block.type === "stanza" || block.type === "signature") {
    return block.lines;
  }

  return [block.text] as const;
}

export const allLetterParagraphs = letterBlocks.flatMap(blockText);

export const typographyAuditStrings = [
  heroTitle,
  ...allLetterParagraphs,
  cta.title,
  cta.emailLabel,
  cta.contributeLabel,
] as const;
