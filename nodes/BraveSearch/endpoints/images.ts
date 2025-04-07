import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { BraveEndpoint } from './baseEndpoint';

const KEY = 'images';
const ENDPOINT = '/images/search';

const OPTION: INodePropertyOptions = {
	name: 'Image Search',
	value: KEY,
	description: 'Search for images',
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
		default: 50,
		description:
			'The number of search results returned in response. The maximum is 100. The actual number delivered may be less than requested.',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
	},
].map((param) => {
	return {
		...param,
		displayOptions: {
			show: {
				endpoint: [KEY],
			},
		},
	};
});

const buildQuery = (query: Record<string, any>) => {
	const { query: q, ...rest } = query; // Destructure 'query' as 'q' and collect the rest
	return { q, ...rest }; // Return the new object
};

export default { KEY, ENDPOINT, OPTION, PROPERTIES, buildQuery } satisfies BraveEndpoint;
