import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: [
        'favicon-16x16.png',
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'images/synchrohub-logo.svg',
      ],
      manifest: {
        name: 'SynchroHub',
        short_name: 'SynchroHub',
        description: 'Digital School Infrastructure That Connects Every Part of Your School',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#153f34',
        background_color: '#eef3ef',
        icons: [
          {
            src: '/images/synchrohub-logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Keep the install worker intentionally online-first: precache only
        // compiled frontend code, with no navigation fallback or runtime data.
        globPatterns: ['**/*.{js,css,woff2}'],
        // The application bundle is a versioned static asset and is slightly
        // larger than Workbox's default 2 MB warning threshold.
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: null,
        runtimeCaching: [],
      },
    }),
  ],
})
