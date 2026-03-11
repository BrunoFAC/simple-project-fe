import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@apiClient': path.resolve(__dirname, 'src/apiClient'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@config': path.resolve(__dirname, 'src/config'),
			'@enums': path.resolve(__dirname, 'src/enums'),
			'@helpers': path.resolve(__dirname, 'src/helpers'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@providers': path.resolve(__dirname, 'src/providers'),
			'@routes': path.resolve(__dirname, 'src/routes'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@startup': path.resolve(__dirname, 'src/startup'),
			'@stores': path.resolve(__dirname, 'src/stores'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		},
	},
});
