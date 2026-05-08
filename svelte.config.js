import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ out: 'build' }),
		alias: {
			'@/*': './src/*',
			'~/*': './src/*',
			'@root/*': './*',
			'src/*': './src/*'
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
