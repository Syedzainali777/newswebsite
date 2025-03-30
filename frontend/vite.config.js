import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true, // Allows accessing the dev server from the local network
    port: 3000, // Explicitly define a port instead of the default 3000
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true, // Helps in handling CORS issues
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Improves import paths
    },
  },
  build: {
    outDir: "dist", // Custom output directory
    sourcemap: true, // Enables debugging support
    chunkSizeWarningLimit: 500, // Adjusts chunk size warnings
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Speeds up cold starts
  },
});
