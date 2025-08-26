import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import nodesBasePlugin from 'eslint-plugin-n8n-nodes-base';
import jsoncParser from 'jsonc-eslint-parser';

export default defineConfig(
	{ ignores: ['**/dist/**', '**/node_modules/**', '**/*.js'] },
	{
		files: ['credentials/**/*.ts', 'nodes/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json'],
				sourceType: 'module',
				extraFileExtensions: ['.json'],
			},
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: { 'n8n-nodes-base': nodesBasePlugin },
	},
	{
		files: ['credentials/**/*.ts'],
		rules: {
			...(nodesBasePlugin.configs?.credentials?.rules ?? {}),
			'n8n-nodes-base/cred-class-field-documentation-url-missing': 'off',
			'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
		},
	},
	{
		files: ['nodes/**/*.ts'],
		rules: {
			...(nodesBasePlugin.configs?.nodes?.rules ?? {}),
			'n8n-nodes-base/node-execute-block-missing-continue-on-fail': 'off',
			'n8n-nodes-base/node-resource-description-filename-against-convention': 'off',
			'n8n-nodes-base/node-param-fixed-collection-type-unsorted-items': 'off',
		},
	},
	{
		files: ['package.json'],
		languageOptions: { parser: jsoncParser },
		plugins: { 'n8n-nodes-base': nodesBasePlugin },
		rules: {
			...(nodesBasePlugin.configs?.community?.rules ?? {}),
			'n8n-nodes-base/community-package-json-name-still-default': 'off',
		},
	},
);
