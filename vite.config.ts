import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
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
      "/backend-api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (requestPath) => requestPath.replace(/^\/backend-api/, ""),
      },
    },
  },

  plugins: [tailwindcss(), react()],

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

          // Motion library is only needed on animation-heavy routes
          "vendor-motion": ["framer-motion"],
        },
      },
    },
  },
}));