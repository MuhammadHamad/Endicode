import { Helmet } from "react-helmet-async";

// www is the canonical host — the apex domain 308-redirects to it.
export const SITE_URL = "https://www.endicode.com";
const SITE_TITLE = "Endicode | Web Apps & AI Automation";

type SeoProps = {
  /** Page name; omit on the home page to use the bare site title. */
  title?: string;
  description: string;
  /** Route path for the canonical URL and og:url; omit on pages that should not be indexed. */
  path?: string;
  noindex?: boolean;
};

// Per-route <head> tags. index.html ships the home-page versions of the
// description/og tags (marked data-rh so Helmet replaces rather than
// duplicates them) for crawlers that don't run JavaScript.
export default function Seo({ title, description, path, noindex = false }: SeoProps) {
  const fullTitle = title ? `${title} — ${SITE_TITLE}` : SITE_TITLE;
  const url = path === undefined ? undefined : `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {url && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
