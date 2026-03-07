import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			indent: 'off',
			'no-undef': 'off',
			'@typescript-eslint/indent': 'off',
			'no-console': 'off',
			'no-unused-vars': 'off',
			'default-case': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-use-before-define': 'off',
			'no-debugger': 'warn',
			'react-hooks/exhaustive-deps': 'off',
		},
		settings: {
			react: {
				version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
			},
		},
	}
);
