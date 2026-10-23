// Screen-reader note for links with target="_blank", so the new tab isn't a surprise.
// Put it inside the link, after the visible text.
export default function OpensInNewTab() {
  return <span className="sr-only"> (opens in new tab)</span>;
}
