import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export default function faviconPlugin() {
  return {
    name: 'favicon',
    enforce: 'post',
    apply: 'build',
    writeBundle() {
      const src = join(__dirname, 'public/icon.png');
      const dest = join(__dirname, 'dist/icon.png');
      
      if (existsSync(src)) {
        // Ensure the dist directory exists
        if (!existsSync(join(__dirname, 'dist'))) {
          mkdirSync(join(__dirname, 'dist'));
        }
        
        // Create a simple copy operation
        const fs = require('fs');
        fs.copyFileSync(src, dest);
        console.log('✅ Favicon copied to dist directory');
      } else {
        console.warn('⚠️  Favicon not found at:', src);
      }
    }
  };
}
