import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import type { BraveSearchOperation } from '../_base';
import { filterEmptyOrNil } from '../_base';

import parameters from './parameters';

const key = 'web';
const endpoint = '/web/search';

// The operation defined by this module
const details: INodePropertyOptions = {
	name: 'Web Search',
	value: key,
	description: 'Search the Web',
	action: 'Search the Web',
};

// All properties are only contextually visible for this operation
parameters.forEach((p: INodeProperties) => (p.displayOptions = { show: { operation: [key] } }));

// This per-operation function allows for future custom validation or parameter handling
const buildQuery = (query: Record<string, any>) => {
	const { query: q, ...rest } = query;
	return {
		q,
		...filterEmptyOrNil(rest),
	};
};

export default { key, endpoint, details, parameters, buildQuery } satisfies BraveSearchOperation;
