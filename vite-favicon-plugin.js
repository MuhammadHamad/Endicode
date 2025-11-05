import { writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';

export default function faviconPlugin() {
  return {
    name: 'favicon',
    enforce: 'post',
    apply: 'build',
    writeBundle() {
      const src = join(__dirname, 'public/icon.png');
      const dest = join(__dirname, 'dist/icon.png');
      
      try {
        if (!existsSync(join(__dirname, 'dist'))) {
          mkdirSync(join(__dirname, 'dist'));
        }
        
        if (existsSync(src)) {
          copyFileSync(src, dest);
          console.log('✅ Favicon copied to dist directory');
        } else {
          console.warn('⚠️  Favicon not found at:', src);
        }
      } catch (error) {
        console.error('❌ Error copying favicon:', error);
      }
    }
  };
}
