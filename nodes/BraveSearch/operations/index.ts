import web from './web';
import news from './news';
import images from './images';
import videos from './videos';
import spellcheck from './spellcheck';
import suggest from './suggest';

import type { INodeProperties } from 'n8n-workflow';
import type { BraveSearchOperation } from './_base';

const operations = [web, news, images, videos, spellcheck, suggest];
const map: Record<BraveSearchOperation['key'], BraveSearchOperation> = Object.fromEntries(
	operations.map((e) => [e.key, e]),
);

const all_operations = operations.map(({ details }) => details);
const all_operation_parameters = operations.flatMap(({ parameters }) => parameters);

const properties: INodeProperties[] = [
	{
		displayName: 'Operation',
		description: 'The operation to use for the Brave Search API',
		name: 'operation',
		type: 'options',
		options: all_operations,
		default: 'web',
		required: true,
		noDataExpression: true,
	},

	...all_operation_parameters,
];

export { map as OPERATIONS, properties as PROPERTIES, BraveSearchOperation };
