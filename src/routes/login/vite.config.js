import { defineConfig } from 'vite';
import svelte from '@sveltejs/vite-plugin-svelte';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [svelte()],
  test: {
    globals: true,             // Allows usage of global variables like describe, it, test
    environment: 'jsdom',     // Sets the testing environment to jsdom for DOM testing
    setupFiles: './setup.js',  // Optional: Point to a setup file if needed
  },
});
