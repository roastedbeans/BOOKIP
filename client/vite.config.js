/* eslint-disable no-undef */
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
	build: {
		chunkSizeWarningLimit: 3000,
	},
	optimizeDeps: {
		exclude: ['zod']['yup'],
	},
	plugins: [react(), Inspect()],
	resolve: {
		mainFields: [],
		alias: {
			util: 'util/',
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		watch: {
			usePolling: true,
		},
		host: true, // needed for the Docker Container port mapping to work
		strictPort: true,
		port: 3000, // you can replace this port with any port
	},
});
