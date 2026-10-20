import type { Plugin } from "vite";
import {
  ROUTE_META,
  pageTitle,
  pageUrl,
  type RoutePath,
} from "../client/src/lib/route-meta";

// Every route except the home page, which is served by index.html itself.
const SUBPAGES: RoutePath[] = (Object.keys(ROUTE_META) as RoutePath[]).filter(
  (path) => path !== "/",
);

// Writes dist/public/<route>/index.html for every subpage: a copy of the built
// index.html with that route's <title>, description, og:title, og:description,
// og:url and canonical, so link previews (WhatsApp, LinkedIn, Slack) and other
// crawlers that don't run JavaScript see the page's own tags rather than the
// home page's. Vercel serves services/index.html at /services directly, with a
// 200 and no trailing-slash redirect.
export function routeHtml(): Plugin {
  return {
    name: "endicode:route-html",
    // After vite:build-html has added the final index.html to the bundle.
    enforce: "post",
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (index?.type !== "asset") {
        this.error("index.html is missing from the bundle");
      }
      const html =
        typeof index.source === "string" ? index.source : new TextDecoder().decode(index.source);

      // index.html carries the home page's tags by hand. Fail the build
      // rather than ship raw HTML that disagrees with what Helmet renders.
      if (setHeadTags(html, "/") !== html) {
        this.error(
          'The home-page tags in client/index.html no longer match ROUTE_META["/"] in client/src/lib/route-meta.ts.',
        );
      }

      for (const path of SUBPAGES) {
        this.emitFile({
          type: "asset",
          fileName: `${path.slice(1)}/index.html`,
          source: addCanonical(setHeadTags(html, path), path),
        });
      }
    },
    // vite preview only maps /services/ (with the slash) to
    // services/index.html; map /services as well, the way Vercel does.
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = new URL(req.url ?? "/", "http://localhost");
        if (SUBPAGES.includes(url.pathname as RoutePath)) {
          req.url = `${url.pathname}/index.html${url.search}`;
        }
        next();
      });
    },
  };
}

// Sets the route's <title>, description, og:title, og:description and og:url,
// keeping each tag's other attributes (data-rh in particular).
function setHeadTags(html: string, path: RoutePath): string {
  const meta = ROUTE_META[path];
  const title = pageTitle(meta);
  html = replaceOne(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = setContent(html, 'name="description"', meta.description);
  html = setContent(html, 'property="og:title"', title);
  html = setContent(html, 'property="og:description"', meta.description);
  return setContent(html, 'property="og:url"', pageUrl(path));
}

// index.html has no canonical, because the SPA fallback serves it for unknown
// URLs too. data-rh="true" lets Helmet adopt this one instead of adding a
// second.
function addCanonical(html: string, path: RoutePath): string {
  if (html.includes('rel="canonical"')) {
    throw new Error("index.html already has a canonical link");
  }
  const link = `<link rel="canonical" href="${escapeHtml(pageUrl(path))}" data-rh="true">`;
  return replaceOne(html, /<meta name="description"[^>]*>/, (tag) => `${tag}\n    ${link}`);
}

// e.g. <meta property="og:title" content="…" data-rh="true">
function setContent(html: string, key: string, value: string): string {
  const tagStart = `<meta ${key} content="`;
  return replaceOne(html, new RegExp(`${tagStart}[^"]*"`), `${tagStart}${escapeHtml(value)}"`);
}

// Fails the build when index.html no longer has exactly one match, instead of
// silently writing the home page's tags into a route's file.
function replaceOne(
  html: string,
  pattern: RegExp,
  replacement: string | ((match: string) => string),
): string {
  const count = html.match(new RegExp(pattern.source, "g"))?.length ?? 0;
  if (count !== 1) {
    throw new Error(`Expected one match for ${pattern} in index.html, found ${count}`);
  }
  // A function replacement, so "$" in the copy is never read as a pattern.
  return html.replace(pattern, typeof replacement === "string" ? () => replacement : replacement);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
