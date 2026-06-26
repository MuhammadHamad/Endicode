import sharp from 'sharp';

const src = 'public/favicon-4.png';

await sharp(src).resize(32, 32).png({ compressionLevel: 9, quality: 90 }).toFile('public/favicon-32x32.png');
await sharp(src).resize(16, 16).png({ compressionLevel: 9, quality: 90 }).toFile('public/favicon-16x16.png');
await sharp(src).resize(192, 192).png({ compressionLevel: 9, quality: 90 }).toFile('public/favicon-192.png');
await sharp(src).resize(180, 180).png({ compressionLevel: 9, quality: 90 }).toFile('public/apple-touch-icon.png');

console.log('Favicon variants written:');
