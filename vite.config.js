import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
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
=======
})



// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy : {
//       '/api' : {
//         target: "https://localhost:5173",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       }
//     }
//   }
// })
>>>>>>> acefaed1ba161affc16499fdb044c33c7c4b4a12
