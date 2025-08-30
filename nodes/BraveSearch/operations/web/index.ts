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

// TODO: When 'goggles' supports multiple values, adjust buildQuery to emit repeated
// 'goggles' keys instead of comma-joining, as the API does not accept CSV for URLs.

// All properties are only contextually visible for this operation
parameters.forEach((p: INodeProperties) => (p.displayOptions = { show: { operation: [key] } }));

// This per-operation function allows for future custom validation or parameter handling
const buildQuery = (query: Record<string, any>) => {
	const { query: q, ...rest } = query;

	// Shallow clone to avoid mutating original params
	const params: Record<string, any> = { ...rest };

	// Omit country if set to 'ALL' (API treats omission as default US; 'ALL' is not a valid value)
	if (params.country === 'ALL') {
		delete params.country;
	}

	// Serialise result_filter arrays to comma-separated values, as required by API
	if (Array.isArray(params.result_filter)) {
		params.result_filter = params.result_filter.join(',');
	}

	// Custom freshness date range overrides preset freshness when both are set
	if (params.freshness_from && params.freshness_to) {
		// Ensure we only pass YYYY-MM-DD format
		const toYMD = (d: string) => d.slice(0, 10);
		const from = toYMD(params.freshness_from as string);
		const to = toYMD(params.freshness_to as string);
		params.freshness = `${from}to${to}`;
		// Drop the helper fields
		delete params.freshness_from;
		delete params.freshness_to;
	}

	return {
		q,
		...filterEmptyOrNil(params),
	};
};

export default { key, endpoint, details, parameters, buildQuery } satisfies BraveSearchOperation;
