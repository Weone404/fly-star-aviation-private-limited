import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),

    // ✅ Auto-compresses all images at build time — no renaming needed
    // Your import paths stay exactly the same in all components
    mode === "production" &&
      viteImagemin({
        webp: {
          quality: 80, // great quality vs size balance
        },
        mozjpeg: {
          quality: 75, // compress JPGs that aren't converted
        },
        pngquant: {
          quality: [0.6, 0.8], // compress PNGs
          speed: 4,
        },
        svgo: {
          plugins: [
            { name: "removeViewBox", active: false },
            { name: "removeEmptyAttrs", active: true },
          ],
        },
      }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // ✅ Increase chunk warning limit (avoids noisy warnings)
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // ✅ Split vendor libraries into separate cached chunks
        // Users only re-download what actually changed between deployments
        manualChunks: {
          // Core React — changes almost never, cached long-term
          "vendor-react": ["react", "react-dom", "react-router-dom"],

          // UI & query libraries
          "vendor-ui": [
            "@radix-ui/react-tooltip",
            "@tanstack/react-query",
            "react-helmet-async",
          ],

          // Lucide icons — large library, separate chunk
          "vendor-icons": ["lucide-react"],
        },
      },
    },
  },
}));