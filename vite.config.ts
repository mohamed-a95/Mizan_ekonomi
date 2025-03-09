import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // Sätter base så att alla absoluta sökvägar i byggprodukten tolkas relativt
  base: "./",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    // Om du är i en Repl och inte i production, lägg till Cartographer
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer()
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      // Alias så att "@" pekar på din client/src-mapp
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  // Sätt "client" som root (där index.html finns)
  root: "client",
  build: {
    outDir:"dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "client/index.html",
    },
  },
  
});
