import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const source = resolve('public/images/synchrohub-logo.svg')
const output = resolve('public')
const appBackground = '#eef3ef'

async function generateIcon({ filename, size, padding, background }) {
  const innerSize = Math.round(size * (1 - padding * 2))
  const logo = await sharp(source)
    .resize({ width: innerSize, height: innerSize, fit: 'contain' })
    .png()
    .toBuffer()

  await mkdir(dirname(resolve(output, filename)), { recursive: true })
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: logo, gravity: 'centre' }])
    .png()
    .toFile(resolve(output, filename))
}

await Promise.all([
  generateIcon({ filename: 'favicon-16x16.png', size: 16, padding: 0.06, background: { r: 0, g: 0, b: 0, alpha: 0 } }),
  generateIcon({ filename: 'favicon-32x32.png', size: 32, padding: 0.06, background: { r: 0, g: 0, b: 0, alpha: 0 } }),
  generateIcon({ filename: 'apple-touch-icon.png', size: 180, padding: 0.14, background: appBackground }),
  generateIcon({ filename: 'pwa-192x192.png', size: 192, padding: 0.14, background: appBackground }),
  generateIcon({ filename: 'pwa-512x512.png', size: 512, padding: 0.14, background: appBackground }),
  generateIcon({ filename: 'pwa-512x512-maskable.png', size: 512, padding: 0.24, background: appBackground }),
])
