import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { docvia } from '@docvia/plugin-vite';
import { defineConfig, type PluginOption } from 'vite';
import { fileURLToPath } from 'node:url';
import docviaConfig from './docvia.config';

// docvia plugin-vite (0.2.1) was built against an older Vite minor —
// its Plugin<any> narrows DevEnvironment differently than Vite 8.
// Runtime is fine; cast to silence the structural mismatch.
const docviaPlugin = docvia(docviaConfig) as unknown as PluginOption;

// @docvia/renderer-svelte 0.2.1 has a broken `svelte` export condition
// pointing to ./src/index.ts, but src/ isn't shipped — only dist/ is.
// Alias the bare specifier to the dist build until Docvia republishes.
// See memory/bug_docvia_renderer_svelte_exports.md
const docviaRendererSvelteDist = fileURLToPath(
	new URL('./node_modules/@docvia/renderer-svelte/dist/index.js', import.meta.url)
);

export default defineConfig({
	plugins: [tailwindcss(), docviaPlugin, sveltekit()],
	resolve: {
		alias: [
			{
				find: /^@docvia\/renderer-svelte$/,
				replacement: docviaRendererSvelteDist
			}
		]
	},
	server: {
		// Must match BASE_URL / PUBLIC_BASE_URL in .env (default 3000) — better-auth's
		// CSRF check rejects requests whose origin doesn't match baseURL.
		port: 3000
	},
	preview: {
		port: 3000
	}
});
