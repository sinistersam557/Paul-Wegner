import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Suppress deprecation warnings from node_modules (Bootstrap SCSS)
        quietDeps: true,
        // Optionally silence specific deprecations by category
        // See https://sass-lang.com/documentation/breaking-changes/deprecations/
        silenceDeprecations: [
          'import',
          'global-builtin',
          'color-functions'
        ]
      }
    }
  }
})
