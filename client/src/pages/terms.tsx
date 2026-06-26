import Container from "@/components/container";
import Section from "@/components/section";
import { CONTACT_EMAIL } from "@/lib/utils";

export default function Terms() {
  return (
    <Section className="gradient-mesh">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="font-display font-bold text-4xl mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: June 2025
          </p>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="font-display font-semibold text-2xl text-foreground mb-3">
                The website
              </h2>
              <p>
                This website is operated by Endicode. The content here is
                informational and does not by itself create a contract. A
                paid engagement only begins after a written agreement,
                statement of work, or proposal is signed by both parties.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-2xl text-foreground mb-3">
                Your use of the site
              </h2>
              <p>
                You agree not to misuse the website — for example by attempting
                to break it, probe it for vulnerabilities without permission,
                or use it to send unsolicited messages. Please report
                vulnerabilities responsibly to{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-electric-blue hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-2xl text-foreground mb-3">
                Intellectual property
              </h2>
              <p>
                Site content (text, graphics, logos, code samples shown for
                illustration) belongs to Endicode unless otherwise marked. You
                may quote or link to public pages with attribution; please do
                not republish or use Endicode trademarks without written
                permission.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-2xl text-foreground mb-3">
                Liability
              </h2>
              <p>
                The site is provided as-is. We do our best to keep it accurate
                and available, but we do not guarantee uninterrupted access or
                that every claim on the site applies to your specific
                situation. To the extent permitted by law, Endicode is not
                liable for indirect or consequential losses arising from use
                of this website.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-2xl text-foreground mb-3">
                Contact
              </h2>
              <p>
                Questions about these terms? Email{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-electric-blue hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
