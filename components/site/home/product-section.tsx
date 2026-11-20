import { Container } from "@/components/site/container";
import { ApprovalBench } from "@/components/site/home/approval-bench";
import { SectionTitle } from "@/components/site/home/section-heading";

export const ProductSection = () => (
  <section
    id="product"
    aria-labelledby="product-title"
    className="pb-[clamp(3rem,5.5vw,5rem)]"
  >
    <Container>
      <div className="border-rule border-t pt-12 sm:pt-16">
        <div className="max-w-[38rem]">
          <p className="text-draft inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.02em]">
            <span
              aria-hidden="true"
              className="border-draft inline-block w-4 border-t-[1.5px] border-dashed"
            />
            In development · Built on the shared record
          </p>
          <SectionTitle id="product-title">
            Before an appeal goes out.
          </SectionTitle>
          <p className="text-muted-foreground mt-4 text-base leading-7 text-pretty sm:text-[1.0625rem] sm:leading-8">
            When a field project needs year&#8209;end support, your team
            shouldn’t rebuild pages, donor lists, and thank&#8209;you emails by
            hand. We’re building AI drafting that works inside your existing
            permissions and stops for a person’s stamp.
          </p>
        </div>

        <ApprovalBench />
      </div>
    </Container>
  </section>
);
