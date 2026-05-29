import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  base: "/ddr_overlays/react/",
  build: {
    outDir: "../custom_plugins/ddr_overlays/react",
    emptyOutDir: true,
    sourcemap: true,
  },
});
