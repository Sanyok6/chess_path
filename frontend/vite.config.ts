import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api/': {
				target: 'http://127.0.0.1:8000/'
			}
		}
	},
	ssr: {
		noExternal: [
			'svelte-use-chessground',
			'chessground'
		]
	},
};



export default config;
