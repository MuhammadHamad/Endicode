import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function updateFavicon() {
  try {
    const inputPath = path.join(__dirname, '../public/icon.png');
    const outputPath = path.join(__dirname, '../public/favicon-blue.png');
    
    // Create a larger version (96x96) with the same color transformation as the navbar
    await sharp(inputPath)
      .resize(96, 96)
      .modulate({
        brightness: 1.25,    // 125% brightness
        saturation: 2.6,     // 260% saturation
        hue: 180            // 180 degrees hue rotation
      })
      .toFile(outputPath);
    
    console.log('✅ Created new blue favicon at:', outputPath);
    return outputPath;
  } catch (error) {
    console.error('❌ Error updating favicon:', error);
    process.exit(1);
  }
}

updateFavicon();
