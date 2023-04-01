import { normalizePath, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react-swc';
import css from 'unocss/vite';
import fonts from 'vite-plugin-webfont-dl';
import svg from 'vite-plugin-svgr';

const fontFamily = process.env.FONT_FAMILY;
const fontWeight = process.env.FONT_WEIGHTS;

export default {
	base: normalizePath(`/${process.env.BASE_URL}`),
	server: {
		open: true,
		https: process.env.HTTPS === 'true',
		port: +process.env.PORT!
	},
	build: {
		sourcemap: process.env.SOURCEMAP === 'true',
		minify: true,
		target: process.env.TARGET,
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom'],
					ui: ['@shared/ui'],
					router: ['@libs/router'],
					store: ['@shared/store']
				}
			}
		}
	},
	plugins: [
		react(),
		css(),
		svg(),
		fonts([
			`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontWeight}&display=swap`
		])
	]
} satisfies UserConfigExport;
