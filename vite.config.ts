import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { docvia } from '@docvia/plugin-vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import docviaConfig from './docvia.config';

const docviaPlugin = docvia(docviaConfig);

// @docvia/renderer-svelte still ships a broken `svelte` export condition
// pointing at ./src/index.ts, which is not published — only dist/ is.
// Still reproducing on 0.2.4. Alias the bare specifier to the dist build.
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
