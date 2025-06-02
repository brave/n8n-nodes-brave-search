import web from './web';
import news from './news';
import images from './images';
import videos from './videos';

import type { BraveSearchOperation } from './_base';
import { INodeProperties } from 'n8n-workflow';

const _OPERATIONS: BraveSearchOperation[] = [web, news, images, videos];
const OPTIONS = _OPERATIONS.map((e) => e.OPTION);
const PROPERTIES = _OPERATIONS.flatMap((e) => e.PROPERTIES);
const OPERATION_MAP = Object.fromEntries(_OPERATIONS.map((e) => [e.KEY, e]));

const NODE_PROPERTIES: INodeProperties[] = [
	/* eslint-disable n8n-nodes-base/node-param-default-wrong-for-options */
	{
		displayName: 'Operation',
		description: 'The operation to use for the Brave Search API',
		name: 'operation',
		type: 'options',
		options: OPTIONS,
		default: 'web',
		required: true,
		noDataExpression: true,
	},
	/* eslint-enable n8n-nodes-base/node-param-default-wrong-for-options */
	...PROPERTIES,
];

export { OPERATION_MAP as OPERATIONS, NODE_PROPERTIES as PROPERTIES };
