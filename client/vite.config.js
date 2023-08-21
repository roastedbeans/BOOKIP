/* eslint-disable no-undef */
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';

export default defineConfig({
	optimizeDeps: {
		exclude: ['zod']['yup'],
	},
	plugins: [react()],
	resolve: {
		alias: {
			util: 'util/',
			'@': path.resolve(__dirname, './src'),
		},
	},
});
