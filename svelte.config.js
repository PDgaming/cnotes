import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
  package: {
    files: (file) => file === "static/sw.js",
  },
  preprocess: [vitePreprocess()],
};

export default config;
