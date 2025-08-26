import baseConfig from './eslint.config.mjs';

export default baseConfig.map((block) => {
	if (block && Array.isArray(block.files) && block.files.includes('package.json')) {
		return {
			...block,
			rules: {
				...(block.rules ?? {}),
				'n8n-nodes-base/community-package-json-name-still-default': 'error',
			},
		};
	}
	return block;
});
