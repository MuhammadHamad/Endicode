import { PluginOption } from 'vite';
import fs from 'fs';
import path from 'path';

export default function faviconPlugin(): PluginOption {
  return {
    name: 'favicon',
    apply: 'build',
    writeBundle() {
      const source = path.resolve(__dirname, 'public/icon.png');
      const dest = path.resolve(__dirname, 'dist/icon.png');
      
      try {
        // Ensure the destination directory exists
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        
        // Copy the icon file
        fs.copyFileSync(source, dest);
        
        console.log('✅ Favicon copied to dist directory');
      } catch (error) {
        console.error('❌ Error copying favicon:', error);
      }
    },
  };
}
