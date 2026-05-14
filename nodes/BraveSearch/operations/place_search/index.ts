import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import type { BraveSearchOperation } from '../_base';

import parameters from './parameters';

const key = 'place_search';
const endpoint = '/local/place_search';

const details: INodePropertyOptions = {
	name: 'Place Search',
	value: key,
	description: 'Search for points of interest in an area',
	action: 'Search for Places',
};

parameters.forEach((p: INodeProperties) => (p.displayOptions = { show: { operation: [key] } }));

const trim = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

const buildQuery = (params: Record<string, any>) => {
	const { query, location, latitude, longitude, count, ...rest } = params;
	const qs: Record<string, any> = { count, ...rest };

	const q = trim(query);
	if (q !== '') qs.q = q;

	const loc = trim(location);
	if (loc !== '') qs.location = loc;

	const lat = trim(latitude);
	const lon = trim(longitude);
	if (lat !== '' && lon !== '') {
		qs.latitude = lat;
		qs.longitude = lon;
	}

	for (const [k, v] of Object.entries(qs)) {
		if (v === '' || v === undefined) delete qs[k];
	}

	// Radius 0 is not useful; omit so the API applies its default (global bias).
	if (qs.radius === 0) delete qs.radius;

	return qs;
};

export default { key, endpoint, details, parameters, buildQuery } satisfies BraveSearchOperation;
