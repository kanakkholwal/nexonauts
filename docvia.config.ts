import { defineConfig } from "@docvia/cli";
import { createSvelteRenderer } from "@docvia/renderer-svelte/node";
import { shiki } from "@docvia/plugin-shiki";

export default defineConfig({
  sourceDir: "docs",
  outDir: ".docvia",

  // Custom directives:
  //   :::step                — gobyexample-style side-by-side: prose flows left,
  //                             fenced code blocks float to the right column.
  components: {
    step: { path: "./src/lib/components/guides/step.svelte", hydrate: false }
  },

  renderer: createSvelteRenderer(),

  // Syntax highlighting is a build-time plugin — the highlighted HTML is baked
  // into the IR, so no highlighter ships to the browser.
  plugins: [
    shiki({
      theme: "github-dark",
      langs: [
        "javascript",
        "typescript",
        "svelte",
        "html",
        "css",
        "bash",
        "json",
        "go",
        "rust",
        "python"
      ]
    })
  ]
});
