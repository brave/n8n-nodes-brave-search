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
);

// Optional Parameters
optional_parameters.push(
	{
		displayName: 'Country',
		name: 'country',
		type: 'options',
		default: 'US',
		description:
			'The search query country, where the results come from. The country string is limited to 2 character country codes of supported countries.',
		options: CountryCodes.map(({ country: name, code: value }) => ({ name, value })),
	},
	{
		displayName: 'Search Language',
		name: 'search_lang',
		type: 'options',
		default: 'en',
		description:
			'The search language preference. The 2 or more character language code for which the search results are provided.',
		options: LanguageCodes.map(({ language: name, code: value }) => ({ name, value })),
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number' as const,
		default: 20,
		description:
			'The maximum number of search results considered to select the LLM context data. The default is 20 and the maximum is 50.',
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
	},
	{
		displayName: 'Spellcheck',
		name: 'spellcheck',
		type: 'boolean',
		default: true,
		description: 'Whether to enable spellcheck on the query',
	},
	{
		displayName: 'Maximum Number of URLs',
		name: 'maximum_number_of_urls',
		type: 'number',
		default: 20,
		description: 'Maximum number of different URLs to include in LLM context',
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
	},
	{
		displayName: 'Maximum Number of Tokens',
		name: 'maximum_number_of_tokens',
		type: 'number',
		default: 8192,
		description:
			'Approximate maximum number of tokens to include in context. The default is 8192 and the maximum is 32768.',
		typeOptions: {
			minValue: 1024,
			maxValue: 32768,
		},
	},
	{
		displayName: 'Maximum Number of Snippets',
		name: 'maximum_number_of_snippets',
		type: 'number',
		default: 50,
		description:
			'Maximum number of different snippets (or chunks of text) to include in LLM context. The default is 50 and the maximum is 256.',
		typeOptions: {
			minValue: 1,
			maxValue: 256,
		},
	},
	{
		displayName: 'Context Threshold Mode',
		name: 'context_threshold_mode',
		type: 'options',
		default: 'balanced',
		description: 'The mode to use to determine the threshold for including content in context',
		options: [
			{ name: 'Disabled', value: 'disabled' },
			{ name: 'Strict', value: 'strict' },
			{ name: 'Balanced', value: 'balanced' },
			{ name: 'Lenient', value: 'lenient' },
		],
	},
	{
		displayName: 'Maximum Number of Tokens Per URL',
		name: 'maximum_number_of_tokens_per_url',
		type: 'number',
		default: 4096,
		description:
			'Maximum number of tokens to include per URL. The default is 4096 and the maximum is 8192.',
		typeOptions: {
			minValue: 512,
			maxValue: 8192,
		},
	},
	{
		displayName: 'Maximum Number of Snippets Per URL',
		name: 'maximum_number_of_snippets_per_url',
		type: 'number',
		default: 50,
		description:
			'Maximum number of snippets to include per URL. The default is 50 and the maximum is 100.',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
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
		placeholder: 'Example: https://raw.githubusercontent.com/…/tech_blogs.goggle',
	},
	{
		displayName: 'Freshness',
		name: 'freshness',
		type: 'options',
		default: '',
		description:
			'Filters search results by page age. The age of a page is determined by the most relevant date reported by the content, such as its published or last modified date.',
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
		displayName: 'Enable Local',
		name: 'enable_local',
		type: 'boolean',
		default: false,
		description:
			'Whether to enable local recall. Not setting this value means auto-detect and uses local recall if any of the localization headers are provided.',
	},
	{
		displayName: 'Enable Source Metadata',
		name: 'enable_source_metadata',
		type: 'boolean',
		default: false,
		description:
			'Whether to enable source metadata enrichment (site_name, favicon, thumbnail) in the sources attribute of the response',
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
