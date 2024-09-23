import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/openApi": {
        target: "http://www.kopis.or.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/openApi/, ""),
      },
    },
  },
});
