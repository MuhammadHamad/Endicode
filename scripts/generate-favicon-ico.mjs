// Packs the existing 16×16 and 32×32 PNG favicons into public/favicon.ico
// (PNG-compressed ICO entries). Run from the repo root:
//   node scripts/generate-favicon-ico.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const sources = ['public/favicon-16x16.png', 'public/favicon-32x32.png'];

const images = await Promise.all(
  sources.map(async (file) => {
    const { width, height } = await sharp(file).metadata();
    return { width, height, data: readFileSync(file) };
  }),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);

let offset = header.length + 16 * images.length;
const entries = images.map(({ width, height, data }) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(width >= 256 ? 0 : width, 0);
  entry.writeUInt8(height >= 256 ? 0 : height, 1);
  entry.writeUInt8(0, 2); // palette size
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(data.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += data.length;
  return entry;
});

writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...images.map((i) => i.data)]));
console.log(`public/favicon.ico written (${images.map((i) => `${i.width}x${i.height}`).join(', ')})`);
