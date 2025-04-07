import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { BraveEndpoint } from './baseEndpoint';

const KEY = 'news';
const ENDPOINT = '/news/search';

const OPTION: INodePropertyOptions = {
	name: 'News Search',
	value: KEY,
	description: 'Search for news',
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
			'The number of search results returned in response. The maximum is 50. The actual number delivered may be less than requested. Combine this parameter with offset to paginate search results.',
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
