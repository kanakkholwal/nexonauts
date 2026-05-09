import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			'@/*': './src/*',
			'~/*': './src/*',
			'@root/*': './*',
			'src/*': './src/*',
			'data/*': './data/*'
		},
		typescript: {
			config: (cfg) => {
				cfg.compilerOptions ??= {};
				cfg.compilerOptions.verbatimModuleSyntax = false;
				return cfg;
			}
		}
	}
};

export default config;
