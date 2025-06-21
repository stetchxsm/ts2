import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    open: true, // فتح المتصفح تلقائياً
    cors: true, // تمكين CORS
    strictPort: false, // السماح بتغيير المنفذ إذا كان مشغولاً
    hmr: {
      overlay: true, // عرض الأخطاء في المتصفح
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // تحسين معالجة الملفات العامة
  publicDir: 'public',

  // تحسينات البناء
  build: {
    target: 'es2015', // دعم المتصفحات الحديثة
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: mode === 'development', // sourcemap فقط في التطوير
    minify: 'esbuild', // استخدام esbuild للضغط (أسرع)
    reportCompressedSize: false, // تسريع البناء
    emptyOutDir: true, // تنظيف مجلد الإخراج

    rollupOptions: {
      output: {
        // تقسيم الكود لتحسين الأداء
        manualChunks: {
          // مكتبات React الأساسية
          vendor: ['react', 'react-dom', 'react-router-dom'],

          // مكونات UI
          ui: [
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip'
          ],

          // مكتبات التدويل
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend'
          ],

          // مكتبات الأدوات
          utils: [
            'clsx',
            'class-variance-authority',
            'tailwind-merge',
            'lucide-react'
          ],

          // مكتبات إضافية
          libs: [
            '@tanstack/react-query',
            'lottie-react',
            'sonner'
          ],
        },

        // تحسين أسماء الملفات
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    // تحسين الضغط
    cssCodeSplit: true,
    copyPublicDir: true,

    // تحسين حجم الحزمة
    chunkSizeWarningLimit: 1000,
  },

  // تحسينات CSS
  css: {
    devSourcemap: mode === 'development',
    postcss: './postcss.config.js',
  },

  // تحسينات الأداء
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'i18next',
      'react-i18next',
      '@tanstack/react-query',
    ],
    exclude: [
      // استبعاد المكتبات التي لا تحتاج تحسين
    ],
  },

  // متغيرات البيئة
  define: {
    __DEV__: mode === 'development',
    __PROD__: mode === 'production',
  },

  // تحسين الذاكرة
  esbuild: {
    target: 'es2015',
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },

  // إعدادات الأمان
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
  },

  // تحسين التخزين المؤقت
  cacheDir: 'node_modules/.vite',
}));
