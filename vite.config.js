import { defineConfig } from 'vite'
import { glob } from 'glob'
import { resolve } from 'path'

export default defineConfig({
  base: '/solcassy/',
  build: {
    rollupOptions: {
      input: glob.sync('*.html').reduce((acc, file) => {
        acc[file.replace('.html', '')] = resolve(__dirname, file)
        return acc
      }, {})
    }
  }
}) 