// import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import { adapter } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// adapter: vercel(),
		adapter: adapter(),
	}
};

export default config;
