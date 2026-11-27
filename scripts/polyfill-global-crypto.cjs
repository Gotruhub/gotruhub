// Node 18 has no global `crypto`; serialize-javascript (pulled in by
// vite-plugin-pwa's workbox-build -> @rollup/plugin-terser) calls
// `crypto.getRandomValues` expecting the Web Crypto global that only
// ships unprompted from Node 20+. `node:crypto`'s `webcrypto` export has
// been available since Node 15 with no flag, so polyfill from that.
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = require('node:crypto').webcrypto
}
