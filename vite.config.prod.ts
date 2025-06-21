import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Production-specific Vite configuration
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  publicDir: 'public',
  
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // No sourcemap in production
    minify: 'esbuild',
    reportCompressedSize: true,
    emptyOutDir: true,
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip'
          ],
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend'
          ],
          utils: [
            'clsx',
            'class-variance-authority',
            'tailwind-merge',
            'lucide-react'
          ],
          libs: [
            '@tanstack/react-query',
            'lottie-react',
            'sonner'
          ],
        },
        
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    cssCodeSplit: true,
    copyPublicDir: true,
    chunkSizeWarningLimit: 1000,
  },
  
  css: {
    devSourcemap: false,
    postcss: './postcss.config.js',
  },
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'i18next',
      'react-i18next',
      '@tanstack/react-query',
    ],
  },
  
  define: {
    __DEV__: false,
    __PROD__: true,
  },
  
  esbuild: {
    target: 'es2015',
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    drop: ['console', 'debugger'], // Remove console and debugger in production
  },
  
  cacheDir: 'node_modules/.vite',
});
