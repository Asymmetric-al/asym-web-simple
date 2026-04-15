import { Reveal } from "@/components/site/reveal";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { ArrowRight, FileText, Scale, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import { TermsTableOfContents } from "./table-of-contents";

interface TermSectionProps {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}

interface TocItem {
  id: string;
  label: string;
}

const TOC_ITEMS: readonly TocItem[] = [
  { id: "acceptance", label: "1. Acceptance" },
  { id: "description", label: "2. Description" },
  { id: "accounts", label: "3. Accounts" },
  { id: "acceptable-use", label: "4. Acceptable Use" },
  { id: "intellectual-property", label: "5. Intellectual Property" },
  { id: "payment", label: "6. Payment & Billing" },
  { id: "refunds", label: "7. Refunds" },
  { id: "delivery", label: "8. Delivery" },
  { id: "termination", label: "9. Termination" },
  { id: "liability", label: "10. Liability" },
  { id: "disclaimer", label: "11. Disclaimer" },
  { id: "governing-law", label: "12. Governing Law" },
  { id: "changes", label: "13. Changes" },
];

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms governing use of the Asymmetric.al public website.",
  path: "/terms",
});

const DitherGrid = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none opacity-10"
    style={{
      backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
);

const ScrambleText = ({ text }: { text: string }) => <span className="tracking-wider">{text}</span>;

const TermSection = ({ id, number, title, children }: TermSectionProps) => (
  <div id={id} className="scroll-mt-32 mb-20 relative group">
    <div className="absolute -left-6 md:-left-12 top-0 bottom-0 w-px bg-border group-hover:bg-foreground/20 transition-colors duration-500" />
    <div className="absolute -left-6 md:-left-12 top-0 h-12 w-px bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-primary uppercase tracking-widest">{number}</span>
        <h3 className="text-3xl font-display font-bold text-foreground tracking-tight leading-none">{title}</h3>
      </div>
      <div className="prose dark:prose-invert prose-lg max-w-none text-muted-foreground font-light leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export default function TermsPage() {
  return (
    <div className="pt-24 min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background overflow-x-hidden">
      <DitherGrid />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="mb-24 pb-12 border-b border-border">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-secondary/50 rounded-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-8 backdrop-blur-md">
              <Scale size={12} className="text-primary" />
              <ScrambleText text="LEGAL AGREEMENT" />
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground mb-8 tracking-tighter leading-[0.9]">
              Terms of Service
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="text-xl text-muted-foreground font-light max-w-2xl leading-relaxed text-balance border-l border-border pl-6">
                Please read these Terms of Service (&ldquo;Terms&rdquo;, &ldquo;Terms of Service&rdquo;) carefully before using the Asymmetric.al website and Mission Control platform.
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground uppercase tracking-widest bg-secondary/30 border border-border px-4 py-2 rounded-sm">
                <FileText size={14} />
                <span>Effective: Nov 14, 2025</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-32">
              <div className="mb-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Table of Contents
              </div>
              <TermsTableOfContents items={TOC_ITEMS} />

              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground/60 mb-4">
                  <ShieldAlert size={16} />
                  <span className="font-mono text-[10px] uppercase tracking-widest">Legal Entity</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">
                  Global Fellowship Inc.<br />
                  501(c)(3) Nonprofit<br />
                  EIN: 68-0214543
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-9">
            <Reveal delay={200}>
              <div className="space-y-4">
                <TermSection id="acceptance" number="01" title="Acceptance of Terms">
                  <p>
                    By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. Global Fellowship Inc. is the Merchant of Record for all transactions on this platform.
                  </p>
                </TermSection>

                <TermSection id="description" number="02" title="Description of Service">
                  <p>
                    Asymmetric.al provides a comprehensive operations platform (&ldquo;Mission Control&rdquo;) for missionary sending organizations, including CRM, financial processing, website management, and communication tools.
                  </p>
                </TermSection>

                <TermSection id="accounts" number="03" title="Accounts">
                  <p>
                    When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                  </p>
                  <p className="mt-4">
                    You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
                  </p>
                </TermSection>

                <TermSection id="acceptable-use" number="04" title="Acceptable Use">
                  <p>You agree not to use the Service to:</p>
                  <ul className="space-y-3 my-6">
                    {[
                      "Violate any laws or regulations.",
                      "Infringe the rights of any third party, including intellectual property, privacy, or publicity rights.",
                      "Transmit any material that is abusive, harassing, tortious, defamatory, vulgar, pornographic, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.",
                      "Transmit any unsolicited or unauthorized advertising, promotional materials, 'junk mail,' 'spam,' 'chain letters,' 'pyramid schemes,' or any other form of solicitation.",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start group/item">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 group-hover/item:bg-primary transition-colors" />
                        <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </TermSection>

                <TermSection id="intellectual-property" number="05" title="Intellectual Property">
                  <p>
                    The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Global Fellowship Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                  </p>
                  <div className="bg-card border border-border p-6 rounded-sm mt-6">
                    <strong className="text-foreground block font-display mb-2">Open Source Components</strong>
                    <p className="text-sm text-muted-foreground">
                      Certain components of the Service are released under open source licenses. Your use of those components is governed by the applicable open source license.
                    </p>
                  </div>
                </TermSection>

                <TermSection id="payment" number="06" title="Payment, Billing, and Donations">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-foreground font-bold mb-2 font-display">6.1 SaaS Subscriptions</h4>
                      <p>Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis (&ldquo;Billing Cycle&rdquo;). Billing cycles are set either on a monthly or annual basis. Your subscription will automatically renew at the end of each Billing Cycle unless you cancel it.</p>
                    </div>
                    <div>
                      <h4 className="text-foreground font-bold mb-2 font-display">6.2 Donations</h4>
                      <p>Donations made through the &ldquo;Give&rdquo; page are processed as charitable contributions to Global Fellowship Inc., a 501(c)(3) nonprofit organization.</p>
                    </div>
                    <div>
                      <h4 className="text-foreground font-bold mb-2 font-display">6.3 Currency</h4>
                      <p>All transactions are processed in United States Dollars (USD) unless otherwise explicitly stated.</p>
                    </div>
                  </div>
                </TermSection>

                <TermSection id="refunds" number="07" title="Refund and Cancellation Policy">
                  <ul className="space-y-6">
                    <li className="block">
                      <span className="text-foreground font-bold block mb-1 font-display">7.1 Subscription Cancellation</span>
                      You may cancel your Subscription renewal either through your online account management page or by contacting our customer support team. Cancellation takes effect at the end of the current billing period.
                    </li>
                    <li className="block">
                      <span className="text-foreground font-bold block mb-1 font-display">7.2 Subscription Refunds</span>
                      Payments are non-refundable and there are no refunds or credits for partially used periods.
                    </li>
                    <li className="block">
                      <span className="text-foreground font-bold block mb-1 font-display">7.3 Donation Refunds</span>
                      Donations are generally non-refundable. If you have made an error in making your donation or change your mind about contributing, please contact us at info@asymmetric.al within 7 days. Refunds are granted at our discretion or in the event of a proven technical error.
                    </li>
                  </ul>
                </TermSection>

                <TermSection id="delivery" number="08" title="Delivery Policy">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 border border-border bg-card rounded-sm">
                      <span className="text-foreground font-bold block mb-2 font-display">8.1 Digital Goods</span>
                      <p className="text-sm text-muted-foreground">Upon successful payment for a Subscription, access to the Service is granted immediately. Login credentials and access instructions are provided electronically via the email address associated with your account.</p>
                    </div>
                    <div className="p-6 border border-border bg-card rounded-sm">
                      <span className="text-foreground font-bold block mb-2 font-display">8.2 Donation Receipts</span>
                      <p className="text-sm text-muted-foreground">Tax-deductible receipts for donations are delivered electronically immediately upon successful processing of the gift.</p>
                    </div>
                  </div>
                </TermSection>

                <TermSection id="termination" number="09" title="Termination">
                  <p>
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                  </p>
                </TermSection>

                <TermSection id="liability" number="10" title="Limitation of Liability">
                  <p>
                    In no event shall Global Fellowship Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                  </p>
                </TermSection>

                <TermSection id="disclaimer" number="11" title="Disclaimer">
                  <p>
                    Your use of the Service is at your sole risk. The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                  </p>
                </TermSection>

                <TermSection id="governing-law" number="12" title="Governing Law">
                  <p>
                    These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                  </p>
                </TermSection>

                <TermSection id="changes" number="13" title="Changes">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                </TermSection>
              </div>

              <div className="mt-20 pt-12 border-t border-border">
                <h4 className="text-2xl font-display font-bold text-foreground mb-8">Contact Us</h4>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-muted-foreground mb-4 font-light text-sm">If you have any questions about these Terms, please contact us:</p>
                    <a href="mailto:info@asymmetric.al" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-mono text-sm uppercase tracking-wider group">
                      info@asymmetric.al <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                  <div>
                    <strong className="text-foreground block mb-4 font-display">Mailing Address</strong>
                    <address className="not-italic text-muted-foreground font-light text-sm leading-relaxed">
                      Global Fellowship Inc.<br />
                      Attn: Asymmetric.al<br />
                      PO Box 1<br />
                      Meadow Vista, CA 95722
                    </address>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
