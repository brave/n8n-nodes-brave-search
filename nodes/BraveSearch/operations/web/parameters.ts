import type { INodeProperties } from 'n8n-workflow';
import { CountryCodes, LanguageCodes, MarketCodes } from './data';

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
			'The user’s search query term. Cannot be empty. Maximum of 400 characters and 50 words in the query.',
		required: true,
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number' as const,
		default: 10,
		description:
			'Number of results to return. Must be between 1 and 20. Combine with `offset` to paginate search results.',
		typeOptions: {
			minValue: 1,
			maxValue: 20,
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
		displayName: 'Search Language',
		name: 'search_lang',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 'en',
		description: 'The search language preference',
		options: LanguageCodes.map(({ language: name, code: value }) => ({ name, value })),
	},
	{
		displayName: 'User Interface Language',
		name: 'ui_lang',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 'en-US',
		description: 'The user interface language preference',
		options: MarketCodes.map(({ country, language, code }) => ({
			name: `${language} (${country})`,
			value: code,
		})),
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		description:
			'The number of result sets to skip before returning results. The default is 0. Combine this parameter with <code>count</code> to paginate search results.',
		typeOptions: {
			minValue: 0,
			maxValue: 9,
		},
	},
	{
		displayName: 'Safe Search',
		name: 'safesearch',
		type: 'options',
		default: 'moderate',
		description: 'Filters search results for adult content',
		options: [
			{
				name: 'Off',
				value: 'off',
			},
			{
				name: 'Moderate',
				value: 'moderate',
			},
			{
				name: 'Strict',
				value: 'strict',
			},
		],
	},
	{
		displayName: 'Freshness',
		name: 'freshness',
		type: 'options',
		default: '',
		description: 'Filters search results by when they were discovered',
		options: [
			{
				name: 'All Time',
				value: '',
			},
			{
				name: 'Past 24 Hours',
				value: 'pd',
			},
			{
				name: 'Past 7 Days',
				value: 'pw',
			},
			{
				name: 'Past Month',
				value: 'pm',
			},
			{
				name: 'Past Year',
				value: 'py',
			},
		],
	},
	{
		displayName: 'Text Decorations',
		name: 'text_decorations',
		type: 'boolean',
		default: true,
		description:
			'Whether display strings (e.g. result snippets) should include decoration markers (e.g. highlighting characters).',
	},
	{
		displayName: 'Spellcheck',
		name: 'spellcheck',
		type: 'boolean',
		default: true,
		description:
			'Whether to spellcheck the provided query. If enabled, the modified query is always used for search. The modified query can be found in <code>altered</code> key from the <a href="https://api-dashboard.search.brave.com/app/documentation/web-search/responses#Query">query</a> response model.',
	},
	{
		displayName: 'Result Filter',
		name: 'result_filter',
		type: 'multiOptions',
		default: ['web'],
		description:
			'Which result types to permit in the search response (e.g. discussions, videos). Not specifying this parameter will return back all result types in search response where data is available and a plan with the corresponding option is subscribed. The response always includes <code>query</code> and <code>type</code> to identify any query modifications and response type respectively.',
		options: [
			{
				name: 'Discussions',
				value: 'discussions',
			},
			{
				name: 'FAQ',
				value: 'faq',
			},
			{
				name: 'Infobox',
				value: 'infobox',
			},
			{
				name: 'Locations',
				value: 'locations',
			},
			{
				name: 'News',
				value: 'news',
			},
			{
				name: 'Summarizer',
				value: 'summarizer',
			},
			{
				name: 'Videos',
				value: 'videos',
			},
			{
				name: 'Web',
				value: 'web',
			},
		],
	},
	{
		displayName: 'Goggles',
		name: 'goggles',
		type: 'string',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Goggle URL',
		},
		default: [],
		description:
			'Goggles act as a custom re-ranking on top of Brave’s search index. The parameter supports one or more URLs where the desired Goggle(s) will be found.',
	},
	{
		displayName: 'Units',
		name: 'units',
		type: 'options',
		default: '',
		description:
			'The measurement units. If not provided, units are derived from the search country.',
		options: [
			{
				name: 'None',
				value: '',
			},
			{
				name: 'Metric',
				value: 'metric',
			},
			{
				name: 'Imperial',
				value: 'imperial',
			},
		],
	},
	{
		displayName: 'Extra Snippets',
		name: 'extra_snippets',
		type: 'boolean',
		default: false,
		description:
			'Whether to include snippets. A snippet is an excerpt from a page you get as a result of the query, and <code>extra_snippets</code> allow you to get up to 5 additional, alternative excerpts. Only available under Free AI, Base AI, Pro AI, Base Data, Pro Data and Custom plans.',
	},
	{
		displayName: 'Summary',
		name: 'summary',
		type: 'boolean',
		default: false,
		description:
			'Whether to include summary key generation in web search results. This is required for summarizer to be enabled.',
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
