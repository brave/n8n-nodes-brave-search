import type { INodeProperties } from 'n8n-workflow';
import { CountryCodes, LanguageCodes } from './data';

const parameters: INodeProperties[] = [];
const optional_parameters: INodeProperties['options'] = [];

// The parameters for this operation
parameters.push(
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
			'The number of image results returned in response. The maximum is 200. The actual number delivered may be less than requested.',
		typeOptions: {
			minValue: 1,
			maxValue: 200,
		},
	},
);

// Optional Parameters
optional_parameters.push(
	{
		displayName: 'Country',
		name: 'country',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 'US',
		description: 'The search query country, where the results come from',
		options: CountryCodes.map(({ country: name, code: value }) => ({ name, value })),
	},
	{
		displayName: 'Language',
		name: 'search_lang',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 'en',
		description: 'The search language preference',
		options: LanguageCodes.map(({ language: name, code: value }) => ({ name, value })),
	},
	{
		displayName: 'Safe Search',
		name: 'safesearch',
		type: 'options',
		default: 'strict',
		description: 'Filters search results for adult content',
		options: [
			{ name: 'Off', value: 'off' },
			{ name: 'Strict', value: 'strict' },
		],
	},
	{
		displayName: 'Spellcheck',
		name: 'spellcheck',
		type: 'boolean',
		default: true,
		description:
			'Whether to spellcheck provided query. If the spellchecker is enabled, the modified query is always used for search. The modified query can be found in altered key from the <a href="https://api-dashboard.search.brave.com/app/documentation/image-search/responses#Query">query</a> response model.',
	},
);

if (optional_parameters.length > 0) {
	parameters.push({
		displayName: 'Additional Parameters',
		name: 'additionalParameters',
		type: 'collection' as const,
		default: {},
		placeholder: 'Add Parameter',
		options: optional_parameters,
	});
}

export default parameters satisfies INodeProperties[];
