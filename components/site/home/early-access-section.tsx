import { EarlyAccessForm } from "@/components/site/home/early-access-form";
import { Eyebrow, SectionTitle } from "@/components/site/home/section-heading";
import { Container } from "@/components/site/page";

export const EarlyAccessSection = () => (
  <section
    id="early-access"
    aria-labelledby="early-access-title"
    className="scroll-mt-24 pt-[clamp(2rem,4vw,3rem)] pb-[clamp(3.5rem,6vw,5.5rem)]"
  >
    <Container>
      <div className="surface-hero page-shell-glow grid gap-8 rounded-[2.35rem] p-5 sm:p-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12 lg:p-12">
        <div className="min-w-0">
          <Eyebrow>Early access</Eyebrow>
          <SectionTitle id="early-access-title">
            Help shape the first release.
          </SectionTitle>
          <p className="text-muted-foreground mt-5 text-base leading-7 sm:text-lg sm:leading-8">
            Tell us about your organization and the work you’d like asym to help
            with. We’ll share launch updates and invite teams as early access
            opens.
          </p>
        </div>
        <div className="min-w-0">
          <EarlyAccessForm />
        </div>
      </div>
    </Container>
  </section>
);
