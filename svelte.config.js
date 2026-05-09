import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		version:{
			name: "nexonauts-" + process.env.GITHUB_SHA?.substring(0, 8) || "dev",
		},
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
