import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src")
    },
  },
  root: "client", // Säkerställer att Vite jobbar från rätt mapp
  build: {
    outDir: "../dist", // Lägger byggfiler i dist/
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "client", "index.html"),
    },
  },
});
