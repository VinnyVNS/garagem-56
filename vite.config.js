import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
 plugins: [
   react(),
   VitePWA({
     registerType: 'autoUpdate',
     includeAssets: [
       'favicon.svg',
       'favicon.ico',
       'robots.txt',
       'apple-touch-icon.png',
     ],
     manifest: {
       name: 'Garagem 56',
       short_name: 'Garagem 56',
       description: 'Aplicativo de aulas utilizando ReactJS e PWA',
       theme_color: '#3f50b5',
       background_color: '#f7f7f7',
       display: 'standalone',
       icons: [
         {
           src: 'icons/icon-192x192.png',
           sizes: '192x192',
           type: 'image/png',
         },
         {
           src: 'icons/icon-512x512.png',
           sizes: '512x512',
           type: 'image/png',
         },
       ],
     },
   }),
 ],
});