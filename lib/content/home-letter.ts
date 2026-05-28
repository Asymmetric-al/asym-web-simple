export const heroTitle = "We’re building Asym.";

export const introParagraphs = [
  "We’re Conrad and Blake.",
  "Asym is a product for Christian missions organizations. Asymmetric.al is the nonprofit ministry behind it.",
  "We don’t have customers yet.",
  "We do have a few organizations waiting to use it, a clear problem in front of us, and we’re building nonstop.",
  "It is very early. Some parts are still ugly. Some parts are half-wired. Some parts work well enough that you can already see where this is going.",
] as const;

type LetterSection = {
  id?: string;
  headingId: string;
  title: string | undefined;
  paragraphs: readonly string[];
};

export const letterSections = [
  {
    id: "why",
    headingId: "vision-heading",
    title: "The vision is simple.",
    paragraphs: [
      "Christian missions organizations should not need five disconnected tools, three spreadsheets, two CRMs, and a part-time miracle worker just to keep donors, missionaries, gifts, receipts, websites, emails, reports, and workflows from falling apart.",
      "That is not a small problem.",
      "It eats hours every week from people who already carry a lot.",
      "Mobilizers chase candidate paperwork. Finance teams reconcile gifts by hand. Missionaries wonder who gave, who stopped giving, and who needs a thank-you. Donors want a clean way to give, manage their gifts, and get receipts. Member Care teams try to keep track of conversations, next steps, and care history in systems that were not built for that work. Leaders want to know what is actually happening without asking someone to pull another report.",
      "Most of the time, the people doing the work are not asking for something flashy.",
      "They just want software that does not make their day harder.",
      "That is what Asym is trying to become.",
      "One Mission Control for missions and nonprofit operations.",
      "Giving. CRM. Donor portal. Missionary portal. Receipts. Statements. Automations. Reports. Websites. Email. AI help where it is actually useful.",
      "Not another dashboard for the sake of having a dashboard.",
      "A working system that takes the operational weight off Christian missions organizations, so their teams can stay focused on people and the Gospel.",
    ],
  },
  {
    headingId: "bothers-heading",
    title: undefined,
    paragraphs: [
      "We think missions technology is way behind where it should be.",
      "Not because the work is unimportant.",
      "Because the market is weird.",
      "The people doing some of the most meaningful work in the world often get stuck with the worst tools, because they are not a flashy customer segment and they do not have enterprise budgets.",
      "That bothers us.",
      "It bothers us that a missionary can raise support from fifty people and still not have a simple way to know who gave, who needs care, and what to do next.",
      "It bothers us that finance teams doing mission-critical work with donor money have to fight broken exports and manual reconciliation.",
      "It bothers us that small missions teams often have to choose between expensive legacy software or duct-taped tools that constantly break.",
      "We are not okay with that.",
    ],
  },
  {
    id: "product",
    headingId: "product-heading",
    title: "The product is early. The mission is not.",
    paragraphs: [
      "Asym exists because we believe small teams should be able to do more with less.",
      "Not by working longer hours.",
      "Not by adding more admin.",
      "By giving them tools that quietly handle the boring parts, so they can stay focused on people, prayer, sending, care, discipleship, and the Gospel.",
      "That is the purpose.",
      "The product is early.",
      "The mission is not.",
    ],
  },
  {
    id: "builders",
    headingId: "builders-heading",
    title: "We are looking for builders.",
    paragraphs: [
      "We are looking for people who want to build with us before it is obvious.",
      "People who can handle messy. People who care about craft, but do not need perfect conditions to start. People who can ship, learn, fix, and keep going.",
      "People who understand that software can either drain a ministry team or give them time back.",
      "We need builders who are comfortable owning real pieces of the system.",
      "Not fake ownership.",
      "Real ownership.",
      "You might work on the donor portal one week, Stripe flows the next, Mission Control after that, then a receipt PDF bug that absolutely has to work before year-end giving.",
      "This is not a polished big-company job.",
      "There is no giant team around each feature.",
      "There is a lot to build, and every good decision matters.",
      "Money data has to be right. People data has to be safe. Permissions have to hold. Receipts have to send. Reports have to match.",
      "The boring details matter because the mission matters.",
    ],
  },
  {
    headingId: "work-heading",
    title: "The work is ordinary before it is big.",
    paragraphs: [
      "We think Asym can become the operating system for Christian missions organizations.",
      "That sounds big because it is.",
      "But the first version is much more ordinary.",
      "A donor gives.",
      "A receipt sends.",
      "A missionary sees the gift.",
      "A staff member can find the donor.",
      "A finance person can export the report.",
      "A leader can understand what happened.",
      "Then we make that smoother.",
      "Then we make it faster.",
      "Then we connect the next piece.",
      "That is the work.",
      "Small inputs. Real output.",
      "A few good builders can change the daily life of a lot of missions teams.",
      "That is what we want to build this around.",
      "If you are looking for a clean, predictable, already-figured-out thing, this probably is not it.",
      "If you want to help build the foundation for something that could serve thousands of missionaries and the organizations behind them, we should talk.",
      "Asym is early.",
      "We are building nonstop.",
      "And we think this is worth giving ourselves to.",
      "- Conrad and Blake",
    ],
  },
] as const satisfies readonly LetterSection[];

export const cta = {
  title: "Want to build with us?",
  emailLabel: "Send us an email.",
  contributeLabel: "Contribute.",
  contributeHref:
    "https://github.com/Asymmetric-al/core?tab=contributing-ov-file#readme",
} as const;

export const allLetterParagraphs = [
  ...introParagraphs,
  ...letterSections.flatMap((section) => section.paragraphs),
] as const;

export const typographyAuditStrings = [
  heroTitle,
  ...letterSections.flatMap((section) => (section.title ? [section.title] : [])),
  ...allLetterParagraphs,
  cta.title,
  cta.emailLabel,
  cta.contributeLabel,
] as const;
