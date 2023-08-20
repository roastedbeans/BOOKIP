import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';

export default defineConfig({
	optimizeDeps: {
		exclude: ['zod']['yup']['js-big-decimal'],
	},
	plugins: [{ enforce: 'pre', ...mdx() }, react({ include: /\.(mdx|js|jsx|ts|tsx)$/ })],
	resolve: {
		alias: {
			// eslint-disable-next-line no-undef
			'@': path.resolve(__dirname, './src'),
		},
	},
});
