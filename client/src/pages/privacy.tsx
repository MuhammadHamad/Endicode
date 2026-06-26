import Container from "@/components/container";
import Section from "@/components/section";
import { CONTACT_EMAIL } from "@/lib/utils";

export default function Privacy() {
  return (
    <Section className="gradient-mesh">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="font-display font-bold text-4xl mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: June 2025
          </p>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-display font-semibold text-2xl text-foreground mb-3">
                What we collect
              </h2>
              <p>
                When you fill in our contact form, we collect your name, email
                address, optional company name, and the contents of your message.
                We do not collect more than what you choose to send. Our website
                logs standard request data (IP address, user agent, page viewed)
                for operational and security purposes; these logs are retained
                for up to 30 days.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-2xl text-foreground mb-3">
                How we use it
              </h2>
              <p>
                We use the information you submit only to respond to your
                enquiry and, if it leads to engagement, to deliver the work you
                ask for. We do not sell your data, share it with advertisers,
                or use it to train any model.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-2xl text-foreground mb-3">
                Cookies and analytics
              </h2>
              <p>
                We use a small number of essential cookies needed for the site
                to function. We may use a privacy-friendly, cookie-less
                analytics tool to count page views in aggregate; it does not
                identify you. Our embedded chat widget (Tawk.to) may set its
                own cookies if you start a chat.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-2xl text-foreground mb-3">
                Your rights
              </h2>
              <p>
                You can request a copy of any data we hold about you, ask us
                to correct it, or ask us to delete it at any time. Email us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-electric-blue hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                and we will respond within 7 days.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-2xl text-foreground mb-3">
                Changes
              </h2>
              <p>
                If we change this policy in a material way, we will update the
                date at the top of this page. Continued use of the site after
                changes constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
