import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';
import { BraveSearchOperation } from './_base';

const KEY: string = 'web';
const ENDPOINT: string = '/web/search';

const OPTION: INodePropertyOptions = {
	name: 'Web Search',
	value: KEY,
	description: 'Search the Web',
	action: 'Search the Web',
};

const PROPERTIES: INodeProperties[] = [
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
		description: 'Number of results to return. Must be between 1 and 20.',
		typeOptions: {
			minValue: 1,
			maxValue: 20,
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

// TODO: Add advanced options
// {
// 	displayName: 'Advanced Options',
// 	name: 'advancedOptions',
// 	type: 'collection',
// 	default: {},
// 	placeholder: 'Add Advanced Options',
// 	description:
// 		'Advanced options for the Brave Search API. These options are optional and can be used to customize the search results.',
// 	options: [
// 		{
// 			displayName: 'Country',
// 			name: 'country',
// 			type: 'string',
// 			default: 'US',
// 			description:
// 				'The search query country, where the results come from. Use 2-character country codes (e.g., US, GB).',
// 		},
// 		{
// 			displayName: 'Search Language',
// 			name: 'search_lang',
// 			type: 'string',
// 			default: 'en',
// 			description:
// 				'The search language preference. Use 2 or more character language codes (e.g., en, es).',
// 		},
// 		{
// 			displayName: 'UI Language',
// 			name: 'ui_lang',
// 			type: 'string',
// 			default: 'en-US',
// 			description:
// 				'User interface language preferred in response. Format: &lt;language_code&gt;-&lt;country_code&gt; (e.g., en-US).',
// 		},
// 		{
// 			displayName: 'Count',
// 			name: 'count',
// 			type: 'number',
// 			default: 10,
// 			description: 'Number of results to return',
// 			typeOptions: {
// 				minValue: 1,
// 				maxValue: 20,
// 			},
// 		},
// 		{
// 			displayName: 'Offset',
// 			name: 'offset',
// 			type: 'number',
// 			default: 0,
// 			description:
// 				'The zero-based offset indicating the number of search results to skip before returning results. Maximum is 9.',
// 		},
// 		{
// 			displayName: 'Safe Search',
// 			name: 'safesearch',
// 			type: 'options',
// 			options: [
// 				{
// 					name: 'Off',
// 					value: 'off',
// 					description: 'No filtering is done',
// 				},
// 				{
// 					name: 'Moderate',
// 					value: 'moderate',
// 					description:
// 						'Filters explicit content like images and videos but allows adult domains in the search results',
// 				},
// 				{
// 					name: 'Strict',
// 					value: 'strict',
// 					description: 'Drops all adult content from search results',
// 				},
// 			],
// 			default: 'moderate',
// 			description: 'Filters search results for adult content',
// 		},
// 		{
// 			displayName: 'Freshness',
// 			name: 'freshness',
// 			type: 'options',
// 			options: [
// 				{
// 					name: 'Past Day',
// 					value: 'pd',
// 					description: 'Discovered within the last 24 hours',
// 				},
// 				{
// 					name: 'Past Week',
// 					value: 'pw',
// 					description: 'Discovered within the last 7 days',
// 				},
// 				{
// 					name: 'Past Month',
// 					value: 'pm',
// 					description: 'Discovered within the last 31 days',
// 				},
// 				{
// 					name: 'Past Year',
// 					value: 'py',
// 					description: 'Discovered within the last 365 days',
// 				},
// 			],
// 			default: 'py',
// 			description: 'Filters search results by when they were discovered',
// 		},
// 		{
// 			displayName: 'Text Decorations',
// 			name: 'text_decorations',
// 			type: 'boolean',
// 			default: true,
// 			description:
// 				'Whether display strings (e.g., result snippets) should include decoration markers (e.g., highlighting characters)',
// 		},
// 		{
// 			displayName: 'Spellcheck',
// 			name: 'spellcheck',
// 			type: 'boolean',
// 			default: true,
// 			description:
// 				'Whether to spellcheck the provided query. If enabled, the modified query is always used for search.',
// 		},
// 		{
// 			displayName: 'Result Filter',
// 			name: 'result_filter',
// 			type: 'multiOptions',
// 			default: ['web', 'query'],
// 			description:
// 				'Which result types to permit in the search response (e.g., discussions, videos)',
// 			options: [
// 				{
// 					name: 'Discussions',
// 					value: 'discussions',
// 					description: 'Include discussion results',
// 				},
// 				{
// 					name: 'FAQ',
// 					value: 'faq',
// 					description: 'Include FAQ results',
// 				},
// 				{
// 					name: 'Infobox',
// 					value: 'infobox',
// 					description: 'Include infobox results',
// 				},
// 				{
// 					name: 'Locations',
// 					value: 'locations',
// 					description: 'Include location results',
// 				},
// 				{
// 					name: 'News',
// 					value: 'news',
// 					description: 'Include news results',
// 				},
// 				{
// 					name: 'Query',
// 					value: 'query',
// 					description: 'Include query details',
// 				},
// 				{
// 					name: 'Summarizer',
// 					value: 'summarizer',
// 					description: 'Include summarizer results',
// 				},
// 				{
// 					name: 'Videos',
// 					value: 'videos',
// 					description: 'Include video results',
// 				},
// 				{
// 					name: 'Web',
// 					value: 'web',
// 					description: 'Include web results',
// 				},
// 			],
// 		},
// 		{
// 			displayName: 'Goggles',
// 			name: 'goggles',
// 			type: 'string',
// 			typeOptions: {
// 				multipleValues: true,
// 			},
// 			default: [],
// 			hint: 'This is the hint',
// 			description:
// 				'Custom re-ranking on top of Brave’s search index. Supports both a URL where the Goggle is hosted or the definition of the Goggle.',
// 			placeholder: 'Example: https://raw.githubusercontent.com/…/tech_blogs.goggle',
// 		},
// 		{
// 			displayName: 'Units',
// 			name: 'units',
// 			type: 'options',
// 			options: [
// 				{
// 					name: 'None',
// 					value: '',
// 					description: 'No specific measurement system',
// 				},
// 				{
// 					name: 'Metric',
// 					value: 'metric',
// 					description: 'The standardized measurement system',
// 				},
// 				{
// 					name: 'Imperial',
// 					value: 'imperial',
// 					description: 'The British Imperial system of units',
// 				},
// 			],
// 			default: '',
// 			description:
// 				'The measurement units. If not provided, units are derived from the search country.',
// 		},
// 		{
// 			displayName: 'Extra Snippets',
// 			name: 'extra_snippets',
// 			type: 'boolean',
// 			default: false,
// 			description:
// 				'Whether to include up to 5 additional, alternative excerpts (snippets) from a page. Only available under Free AI, Base AI, Pro AI, Base Data, Pro Data, and Custom plans.',
// 		},
// 		{
// 			displayName: 'Summary',
// 			name: 'summary',
// 			type: 'boolean',
// 			default: false,
// 			description:
// 				'Whether to include summary key generation in web search results. Required for summarizer to be enabled.',
// 		},
// 	],
// },
// ];
