import { normalizePath, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react-swc';
import css from 'unocss/vite';
import fonts from 'vite-plugin-webfont-dl';
import { checker } from 'vite-plugin-checker';
import svg from 'vite-plugin-svgr';
import { createHtmlPlugin as html } from 'vite-plugin-html';

const fontFamily = process.env.FONT_FAMILY;
const fontWeight = process.env.FONT_WEIGHTS;

// https://vitejs.dev/config/
export default {
	base: normalizePath(`/${process.env.BASE_URL}`),
	server: {
		open: true,
		https: process.env.HTTPS === 'true',
		port: +process.env.PORT!
	},
	build: {
		sourcemap: process.env.GENERATE_SOURCEMAP === 'true',
		emptyOutDir: true,
		minify: true,
		target: process.env.TARGET,
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react'],
					ui: ['@libs/ui'],
					router: ['@libs/router'],
					store: ['@libs/store']
				}
			}
		}
	},
	plugins: [
		react(),
		css(),
		svg(),
		checker({
			typescript: true,
			enableBuild: true,
			eslint: {
				lintCommand: 'eslint src/**/*.{ts,tsx}',
				dev: { logLevel: ['error'] }
			}
		}),
		fonts([
			`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontWeight}&display=swap`
		]),
		html({
			inject: {
				data: process.env
			},
			minify: true
		})
	]
} as UserConfigExport;
