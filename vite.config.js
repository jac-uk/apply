import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

export default defineConfig({
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],  // Remove this eventually
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'legacy',
        additionalData: `
          @import "@/styles/_shared.scss";
        `,
        quietDeps: true,
      },
    },
  },
  server: {
    port: 8181,
  },
});
