import type { INodeProperties } from 'n8n-workflow';

const parameters: INodeProperties[] = [];
const optional_parameters: INodeProperties[] = [
	{
		displayName: 'Search Language',
		name: 'search_lang',
		type: 'string',
		default: '',
		description:
			'The search language preference. Use 2 or more character language codes (e.g., en, es).',
	},
	{
		displayName: 'UI Language',
		name: 'ui_lang',
		type: 'string',
		default: '',
		description:
			'User interface language preferred in response. Format: &lt;language_code&gt;-&lt;country_code&gt; (e.g., en-US).',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		description:
			'The zero-based offset indicating the number of search results to skip before returning results. Maximum is 9.',
		typeOptions: {
			minValue: 0,
			maxValue: 9,
		},
	},
	{
		displayName: 'Safe Search',
		name: 'safesearch',
		type: 'options',
		options: [
			{
				name: 'Off',
				value: 'off',
				description: 'No filtering is done',
			},
			{
				name: 'Moderate',
				value: 'moderate',
				description:
					'Filters explicit content like images and videos but allows adult domains in the search results',
			},
			{
				name: 'Strict',
				value: 'strict',
				description: 'Drops all adult content from search results',
			},
		],
		default: 'moderate',
		description: 'Filters search results for adult content',
	},
	{
		displayName: 'Freshness',
		name: 'freshness',
		type: 'options',
		options: [
			{
				name: 'Any',
				value: '',
				description: 'No date range filtering',
			},
			{
				name: 'Past Day',
				value: 'pd',
				description: 'Discovered within the last 24 hours',
			},
			{
				name: 'Past Month',
				value: 'pm',
				description: 'Discovered within the last 31 days',
			},
			{
				name: 'Past Week',
				value: 'pw',
				description: 'Discovered within the last 7 days',
			},
			{
				name: 'Past Year',
				value: 'py',
				description: 'Discovered within the last 365 days',
			},
		],
		default: '',
		description: 'Filters search results by when they were discovered',
	},
	{
		displayName: 'Freshness Range From',
		name: 'freshness_from',
		type: 'dateTime',
		default: '',
		description:
			'Start date for a custom freshness range (YYYY-MM-DD). When both From and To are set, they override the Freshness option.',
	},
	{
		displayName: 'Freshness Range To',
		name: 'freshness_to',
		type: 'dateTime',
		default: '',
		description:
			'End date for a custom freshness range (YYYY-MM-DD). When both From and To are set, they override the Freshness option.',
	},
	{
		displayName: 'Text Decorations',
		name: 'text_decorations',
		type: 'boolean',
		default: true,
		description:
			'Whether display strings (e.g., result snippets) should include decoration markers (e.g., highlighting characters)',
	},
	{
		displayName: 'Spellcheck',
		name: 'spellcheck',
		type: 'boolean',
		default: true,
		description:
			'Whether to spellcheck the provided query. If enabled, the modified query is always used for search.',
	},
	{
		displayName: 'Result Filter',
		name: 'result_filter',
		type: 'multiOptions',
		default: ['web', 'query'],
		description:
			'Which result types to permit in the search response (e.g., discussions, videos)',
		options: [
			{
				name: 'Discussions',
				value: 'discussions',
				description: 'Include discussion results',
			},
			{
				name: 'FAQ',
				value: 'faq',
				description: 'Include FAQ results',
			},
			{
				name: 'Infobox',
				value: 'infobox',
				description: 'Include infobox results',
			},
			{
				name: 'Locations',
				value: 'locations',
				description: 'Include location results',
			},
			{
				name: 'News',
				value: 'news',
				description: 'Include news results',
			},
			{
				name: 'Query',
				value: 'query',
				description: 'Include query details',
			},
			{
				name: 'Summarizer',
				value: 'summarizer',
				description: 'Include summarizer results',
			},
			{
				name: 'Videos',
				value: 'videos',
				description: 'Include video results',
			},
			{
				name: 'Web',
				value: 'web',
				description: 'Include web results',
			},
		],
	},
	{
		displayName: 'Extra Snippets',
		name: 'extra_snippets',
		type: 'boolean',
		default: false,
		description:
			'Whether to include up to 5 additional, alternative excerpts (snippets) from a page. Only available under Free AI, Base AI, Pro AI, Base Data, Pro Data, and Custom plans.',
	},
	{
		displayName: 'Summary',
		name: 'summary',
		type: 'boolean',
		default: false,
		description:
			'Whether to include summary key generation in web search results. This is required for summarizer to be enabled.',
	},
	{
		displayName: 'Units',
		name: 'units',
		type: 'options',
		options: [
			{
				name: 'None',
				value: '',
				description: 'No specific measurement system',
			},
			{
				name: 'Metric',
				value: 'metric',
				description: 'The standardized measurement system',
			},
			{
				name: 'Imperial',
				value: 'imperial',
				description: 'The measurement system used in the US',
			},
		],
		default: '',
		description:
			'The measurement system to use for displaying results, such as for weather and conversions',
	},
];

// The parameters for this operation
parameters.push(
	{
		displayName: 'Query',
		name: 'query',
		type: 'string' as const,
		default: '',
		description:
			"The user's search query term. Cannot be empty. Maximum of 400 characters and 50 words in the query.",
		required: true,
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'options',
		options: [
			{ name: 'Any', value: 'ALL' },
			{ name: 'Argentina', value: 'AR' },
			{ name: 'Australia', value: 'AU' },
			{ name: 'Austria', value: 'AT' },
			{ name: 'Belgium', value: 'BE' },
			{ name: 'Brazil', value: 'BR' },
			{ name: 'Canada', value: 'CA' },
			{ name: 'Chile', value: 'CL' },
			{ name: 'China', value: 'CN' },
			{ name: 'Denmark', value: 'DK' },
			{ name: 'Finland', value: 'FI' },
			{ name: 'France', value: 'FR' },
			{ name: 'Germany', value: 'DE' },
			{ name: 'Great Britain (UK)', value: 'GB' },
			{ name: 'Hong Kong', value: 'HK' },
			{ name: 'India', value: 'IN' },
			{ name: 'Indonesia', value: 'ID' },
			{ name: 'Italy', value: 'IT' },
			{ name: 'Japan', value: 'JP' },
			{ name: 'Korea (South)', value: 'KR' },
			{ name: 'Malaysia', value: 'MY' },
			{ name: 'Mexico', value: 'MX' },
			{ name: 'Netherlands', value: 'NL' },
			{ name: 'New Zealand (Aotearoa)', value: 'NZ' },
			{ name: 'Norway', value: 'NO' },
			{ name: 'Philippines', value: 'PH' },
			{ name: 'Poland', value: 'PL' },
			{ name: 'Portugal', value: 'PT' },
			{ name: 'Russian Federation', value: 'RU' },
			{ name: 'Saudi Arabia', value: 'SA' },
			{ name: 'South Africa', value: 'ZA' },
			{ name: 'Spain', value: 'ES' },
			{ name: 'Sweden', value: 'SE' },
			{ name: 'Switzerland', value: 'CH' },
			{ name: 'Taiwan', value: 'TW' },
			{ name: 'Turkey', value: 'TR' },
			{ name: 'United States', value: 'US' },
		],
		default: 'ALL',
		description:
			'The search query country, where the results come from. Use 2-character country codes or "Any" for global results. We default to "Any" (global results), while API defaults to "US".',
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
