import { defineConfig } from 'vite'
import talwindcss from "@tailwindcss/vite"
import { svelte } from '@sveltejs/vite-plugin-svelte'
// @ts-ignore
import { eruda, mockWebxdc, buildXDC } from '@webxdc/vite-plugins'

// https://vite.dev/config/
export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [talwindcss(), svelte(), eruda(), mockWebxdc(), buildXDC()],
})
