import { Helmet } from "react-helmet-async";
import {
  NOT_FOUND_META,
  ROUTE_META,
  pageTitle,
  pageUrl,
  type RoutePath,
} from "@/lib/route-meta";

type SeoProps =
  /** A route in ROUTE_META: its title, description, canonical and og:url. */
  | { path: RoutePath }
  /** The catch-all 404 page: noindex and no canonical. */
  | { notFound: true };

// Per-route <head> tags. Each route's raw HTML already carries them for
// crawlers that don't run JavaScript: index.html has the home page's, and the
// build writes every other route its own copy (scripts/route-html.ts). They
// are marked data-rh, so Helmet adopts or replaces them instead of adding
// duplicates.
export default function Seo(props: SeoProps) {
  const path = "path" in props ? props.path : undefined;
  const meta = path ? ROUTE_META[path] : NOT_FOUND_META;
  const title = pageTitle(meta);
  const url = path && pageUrl(path);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={meta.description} />
      {url && <meta property="og:url" content={url} />}
      {url && <link rel="canonical" href={url} />}
      {!url && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
