import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import type { BraveSearchOperation } from '../_base';

import parameters from './parameters';

const key = 'news';
const endpoint = '/news/search';

// The operation defined by this module
const details: INodePropertyOptions = {
	name: 'News Search',
	value: key,
	description: 'Search for News',
	action: 'Search for News',
};

// All properties are only contextually visible for this operation
parameters.forEach((p: INodeProperties) => (p.displayOptions = { show: { operation: [key] } }));

// Simple implementation right now, but could do validation/etc. in future updates
const buildQuery = (query: Record<string, any>) => {
	const { query: q, ...rest } = query; // Destructure 'query' as 'q' and collect the rest
	return { q, ...rest }; // Return the new object
};

export default { key, endpoint, details, parameters, buildQuery } satisfies BraveSearchOperation;
