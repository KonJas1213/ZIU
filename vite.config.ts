import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  optimizeDeps: {
    include: ["@mui/material", "@emotion/react", "@emotion/styled"],
  },
  server: { port: 3000, open: true },
});
