import { defineConfig } from "@docvia/cli";
import { createSvelteRenderer } from "@docvia/renderer-svelte/node";
import { shiki } from "@docvia/plugin-shiki";

export default defineConfig({
  sourceDir: "docs",
  outDir: ".docvia",

  // Optional: register components referenced by ::: directives
  // components: {
  //   counter: { path: "./src/lib/components/Counter.svelte", hydrate: true },
  // },

  renderer: createSvelteRenderer(),

  // Syntax highlighting is a build-time plugin — the highlighted HTML is baked
  // into the IR, so no highlighter ships to the browser.
  plugins: [
    shiki({
      theme: "github-dark",
      langs: ["javascript", "typescript", "svelte", "html", "css", "bash", "json"],
    }),
  ],
});
