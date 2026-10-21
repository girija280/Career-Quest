import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",
  appType: "mpa",
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "8443"),
    hmr: false,
  },
});
