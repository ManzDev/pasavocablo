import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath, URL } from "node:url";
const isGitHubPages = false;
const folderName = path.basename(process.cwd()) + "/";
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const base = mode === "production" && isGitHubPages ? "/" + folderName : "/";

export default {
  root: "src",
  base,
  mode,
  publicDir: "../public",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    outDir: "../dist",
    assetsDir: "./"
  }
};
