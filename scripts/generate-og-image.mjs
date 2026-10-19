// Generates public/og.png, the 1200×630 link-preview image referenced by
// og:image in client/index.html. Run from the repo root:
//   node scripts/generate-og-image.mjs
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_HEIGHT = 270;
const GAP = 56;
const FONT_SIZE = 60;

// White silhouette of the logo — the same look as the site's
// .logo-monochrome filter (brightness(0) invert(1)).
const { data: alpha, info } = await sharp('client/src/assets/logo2.png')
  .trim()
  .resize({ height: LOGO_HEIGHT })
  .ensureAlpha()
  .extractChannel('alpha')
  .raw()
  .toBuffer({ resolveWithObject: true });
const logo = await sharp({
  create: { width: info.width, height: info.height, channels: 3, background: '#ffffff' },
})
  .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
  .png()
  .toBuffer();

const top = Math.round((HEIGHT - (LOGO_HEIGHT + GAP + FONT_SIZE)) / 2);
const baseline = top + LOGO_HEIGHT + GAP + Math.round(FONT_SIZE * 0.78);

// Background glows match the hero (client/src/components/hero.tsx); the
// tagline gradient matches its "Automate tomorrow." text.
const background = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <radialGradient id="cyan">
      <stop offset="0" stop-color="rgb(0,200,255)" stop-opacity="0.16"/>
      <stop offset="0.7" stop-color="rgb(0,200,255)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="purple">
      <stop offset="0" stop-color="rgb(170,100,255)" stop-opacity="0.14"/>
      <stop offset="0.7" stop-color="rgb(170,100,255)" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" gradientUnits="userSpaceOnUse" x1="560" x2="980">
      <stop offset="0" stop-color="hsl(195,100%,60%)"/>
      <stop offset="1" stop-color="hsl(270,80%,65%)"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0a0a0f"/>
  <circle cx="930" cy="150" r="380" fill="url(#cyan)"/>
  <circle cx="250" cy="520" r="340" fill="url(#purple)"/>
  <text x="${WIDTH / 2}" y="${baseline}" text-anchor="middle"
        font-family="Helvetica Neue, Arial, sans-serif" font-weight="500" font-size="${FONT_SIZE}"
        fill="#f5f5f7">Web apps &amp; <tspan fill="url(#accent)">AI automation</tspan></text>
</svg>`;

await sharp(Buffer.from(background))
  .composite([{ input: logo, top, left: Math.round((WIDTH - info.width) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile('public/og.png');

console.log(`public/og.png written (${WIDTH}x${HEIGHT})`);
