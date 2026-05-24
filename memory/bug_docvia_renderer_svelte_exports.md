---
name: bug_docvia_renderer_svelte_exports
description: Docvia renderer-svelte 0.2.1 has a broken `svelte` export condition — fix upstream in Docvia
metadata:
  type: project
---

**Bug in `@docvia/renderer-svelte@0.2.1` packaging.**

`node_modules/@docvia/renderer-svelte/package.json` declares:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "svelte": "./src/index.ts",   // ← points to source that isn't shipped
    "import": "./dist/index.js",
    "default": "./dist/index.js"
  }
}
```

…but `files` only ships `["dist", "README.md"]`. So when Vite/SvelteKit resolves the package with the `svelte` condition active (default in SvelteKit projects), it looks for `./src/index.ts`, can't find it, and throws `Failed to resolve entry for package "@docvia/renderer-svelte"`.

**Symptoms:** any SvelteKit route that does `import { Renderer } from "@docvia/renderer-svelte"` returns HTTP 500 with a Vite import-analysis error.

**Workaround applied in Nexonauts** ([vite.config.ts](../vite.config.ts)): alias the bare specifier to the dist build:

```ts
resolve: {
  alias: [
    {
      find: /^@docvia\/renderer-svelte$/,
      replacement: fileURLToPath(
        new URL('./node_modules/@docvia/renderer-svelte/dist/index.js', import.meta.url)
      )
    }
  ]
}
```

**Why:** Vite's `resolve.conditions` is global — dropping `"svelte"` would break legitimately-svelte-conditioned packages (bits-ui, mode-watcher, etc.). Aliasing only the affected package is the surgical fix.

**Proper fix in Docvia source (do this and republish):**

1. Either drop the `svelte` export condition entirely (cleanest, since `dist/Renderer.svelte` is already in dist and gets picked up via the normal resolution chain).
2. Or include `src/` in the `files` array so the source-pointing condition actually resolves.
3. Or change the condition to point at `./dist/index.js` so all conditions agree.

When this is fixed upstream and republished, remove the alias workaround in `vite.config.ts`.

**How to apply:** Same bug exists for `@docvia/renderer-react` if you check — verify before users hit it. Other framework renderers Docvia ships likely have the same template issue.
