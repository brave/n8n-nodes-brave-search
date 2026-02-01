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
);

// Optional Parameters
optional_parameters.push(
	{
		displayName: 'Country',
		name: 'country',
		type: 'options',
		default: 'US',
		description: 'The search query country, where the results come from',
		options: CountryCodes.map(({ country: name, code: value }) => ({ name, value })),
	},
	{
		displayName: 'Search Language',
		name: 'search_lang',
		type: 'options',
		default: 'en',
		description: 'The search language preference',
		options: LanguageCodes.map(({ language: name, code: value }) => ({ name, value })),
	},
	{
		displayName: 'User Interface Language',
		name: 'ui_lang',
		type: 'options',
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
		displayName: 'Spellcheck',
		name: 'spellcheck',
		type: 'boolean',
		default: true,
		description:
			'Whether to spellcheck provided query. If the spellchecker is enabled, the modified query is always used for search. The modified query can be found in <code>altered</code> key from the <a href="https://api-dashboard.search.brave.com/app/documentation/video-search/responses#Query">query</a> response model.',
	},
	{
		displayName: 'Safe Search',
		name: 'safesearch',
		type: 'options',
		default: 'moderate',
		description: 'Filters search results for adult content',
		options: [
			{ name: 'Off', value: 'off' },
			{ name: 'Moderate', value: 'moderate' },
			{ name: 'Strict', value: 'strict' },
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
