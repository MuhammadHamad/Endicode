const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const iconPath = path.join(publicDir, 'icon.png');

async function generateFavicons() {
  try {
    // Create different sizes of favicon
    await Promise.all([
      // Generate favicon.ico (required for older browsers)
      sharp(iconPath).resize(32, 32).toFile(path.join(publicDir, 'favicon.ico')),
      
      // Generate different icon sizes
      sharp(iconPath).resize(32, 32).toFile(path.join(publicDir, 'icon-32x32.png')),
      sharp(iconPath).resize(16, 16).toFile(path.join(publicDir, 'icon-16x16.png')),
      sharp(iconPath).resize(192, 192).toFile(path.join(publicDir, 'icon-192x192.png')),
      sharp(iconPath).resize(512, 512).toFile(path.join(publicDir, 'icon-512x512.png')),
      
      // Apple touch icon
      sharp(iconPath).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png')),
    ]);

    // Create web app manifest
    const manifest = {
      name: 'Endicode',
      short_name: 'Endicode',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
    };

    // Write manifest file
    fs.writeFileSync(
      path.join(publicDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );

    console.log('✅ Favicons and manifest generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
