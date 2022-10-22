import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api/': {
				target: 'https://chesspath.fly.dev/',
				changeOrigin: true,
				secure: true,  
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
