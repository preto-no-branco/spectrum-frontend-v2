import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('src/renderer/src'), // src/renderer/src
        '@components': resolve('src/renderer/src/components'),
        '@ui': resolve('src/renderer/src/components/ui'),
        '@lib': resolve('src/renderer/src/lib'),
        '@utils': resolve('src/renderer/src/lib/utils'),
        '@hooks': resolve('src/renderer/src/hooks')
      }
    },
    plugins: [react(), tailwindcss(), svgr()]
  }
})
