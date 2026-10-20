import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Container from "@/components/container";
import Seo from "@/components/seo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    // Fills the viewport below the fixed navbar (main has pt-20).
    <section className="gradient-mesh min-h-[calc(100vh-5rem)] flex items-center py-20">
      <Seo
        title="Page Not Found"
        description="The page you were looking for does not exist or has moved. Head back to Endicode for web apps and AI automation."
        noindex
      />
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-electric-blue mb-4">
            Error 404
          </p>
          <h1 className="font-display font-bold text-5xl lg:text-6xl mb-6">
            Page <span className="text-electric-blue">not found</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            Even our automations couldn't find this one. The link may be broken, or the page may
            have moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground">
              <Link href="/" data-testid="link-not-found-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass-card">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
