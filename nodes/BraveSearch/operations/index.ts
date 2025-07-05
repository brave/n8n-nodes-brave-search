import type { INodeProperties } from 'n8n-workflow';
import { BraveSearchOperation } from './_base';

// Import all operations
import WebSearch from './web';
import ImageSearch from './images';
import NewsSearch from './news';
import VideoSearch from './videos';
import Spellcheck from './spellcheck';
import Suggest from './suggest';

// The order of operations in the UI
const operations = [WebSearch, ImageSearch, NewsSearch, VideoSearch, Spellcheck, Suggest];
const map = Object.fromEntries(operations.map((op) => [op.key, op]));
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
