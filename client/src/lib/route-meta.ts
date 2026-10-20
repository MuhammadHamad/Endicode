// Per-route <head> values. The Seo component renders them at runtime, and the
// route-html build plugin (scripts/route-html.ts) writes them into each route's
// own copy of index.html for crawlers that don't run JavaScript. vite.config.ts
// imports this file outside the app's "@/" alias setup, so keep it import-free.

// www is the canonical host — the apex domain 308-redirects to it.
export const SITE_URL = "https://www.endicode.com";
export const SITE_TITLE = "Endicode | Web Apps & AI Automation";

export type RouteMeta = {
  /** Page name; the home page leaves it out to use the bare site title. */
  title?: string;
  description: string;
};

const routes = {
  "/": {
    description:
      "Modern web/app development and AI automation services. We craft conversion-ready web apps and wire in automation that cuts cost, clicks, and chaos.",
  },
  "/services": {
    title: "Services",
    description:
      "Web and app development with Next.js and React Native, process automation from lead triage to invoice parsing, and AI assistants like support bots and copilots.",
  },
  "/case-studies": {
    title: "Case Studies",
    description:
      "See how Endicode helps businesses automate workflows and accelerate growth: AI support bots for e-commerce, lead scoring for SaaS, faster patient onboarding.",
  },
  "/process": {
    title: "Our Process",
    description:
      "Less ceremony, more shipping. Our 5-step process (discover, map, build, automate, train) takes you from idea to automated workflows in 30 days or less.",
  },
  "/pricing": {
    title: "Pricing",
    description:
      "Every project is unique, so every quote is too. Custom, transparent pricing for web apps and automation, based on your requirements, timeline and scope.",
  },
  "/about": {
    title: "About",
    description:
      "Endicode is a modern build-and-automate studio. We craft the product, then automate everything around it so your team can focus on what humans do best.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Ready to automate the work and accelerate growth? Send Endicode a message or chat with us on WhatsApp to discuss your web app or automation project.",
  },
  "/demo": {
    title: "Automation Demo",
    description:
      "Try a live automation demo: a lead triage classifier that drafts replies and a CSV lead scorer, running right in your browser. No servers, no signup required.",
  },
  "/privacy": {
    title: "Privacy Policy",
    description:
      "How Endicode handles what you send us: what we collect, how we use it, cookies and analytics, and your rights. We never sell your data or train models on it.",
  },
  "/terms": {
    title: "Terms of Service",
    description:
      "The terms for using the Endicode website: when a paid engagement begins, acceptable use of the site, intellectual property, and limits of liability.",
  },
} satisfies Record<string, RouteMeta>;

export type RoutePath = keyof typeof routes;

/** Every indexable route, keyed by its path. Each gets a canonical and og:url. */
export const ROUTE_META: Record<RoutePath, RouteMeta> = routes;

/** The catch-all 404 page: noindex, no canonical and no HTML file of its own. */
export const NOT_FOUND_META: RouteMeta = {
  title: "Page Not Found",
  description:
    "The page you were looking for does not exist or has moved. Head back to Endicode for web apps and AI automation.",
};

/** The full <title> and og:title. */
export function pageTitle({ title }: RouteMeta): string {
  return title ? `${title} — ${SITE_TITLE}` : SITE_TITLE;
}

/** The canonical URL and og:url. */
export function pageUrl(path: RoutePath): string {
  return `${SITE_URL}${path}`;
}
