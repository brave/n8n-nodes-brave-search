import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { BraveSearchOperation } from './_base';

const KEY = 'videos';
const ENDPOINT = '/videos/search';

const OPTION: INodePropertyOptions = {
	name: 'Video Search',
	value: KEY,
	description: 'Search for Videos',
	action: 'Search for Videos',
};

const PROPERTIES: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string' as const,
		default: '',
		description:
			'The user’s search query term. Query can not be empty. Maximum of 400 characters and 50 words in the query.',
		required: true,
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number' as const,
		default: 20,
		description:
			'The number of video results returned in response. The maximum is 50. The actual number delivered may be less than requested. Combine this parameter with offset to paginate search results.',
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
	},
].map((param) => {
	return {
		...param,
		displayOptions: {
			show: {
				operation: [KEY],
			},
		},
	};
});

const buildQuery = (query: Record<string, any>) => {
	const { query: q, ...rest } = query; // Destructure 'query' as 'q' and collect the rest
	return { q, ...rest }; // Return the new object
};

export default { KEY, ENDPOINT, OPTION, PROPERTIES, buildQuery } satisfies BraveSearchOperation;
