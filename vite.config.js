import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/zeggowebsite/",   // 👈 ye line add karni hai
});
