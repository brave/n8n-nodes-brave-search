import type { INodeProperties } from 'n8n-workflow';
import { CountryCodes, LanguageCodes, MarketCodes } from './data';

const parameters: INodeProperties[] = [];
const optional_parameters: INodeProperties['options'] = [];

parameters.push(
	{
		displayName: 'Query',
		name: 'query',
		type: 'string' as const,
		default: '',
		description:
			'Optional text to find points of interest. If empty, the API returns general POIs for the area you specify with Location or coordinates.',
	},
	{
		displayName: 'Location',
		name: 'location',
		type: 'string' as const,
		default: '',
		description:
			'Area to search, as a plain-text place (alternative to Latitude and Longitude). For US cities prefer “city state country”, e.g. <code>san francisco ca united states</code>. Else use <code>city country</code>.',
		placeholder: 'e.g. tokyo japan',
	},
	{
		displayName: 'Latitude',
		name: 'latitude',
		type: 'string' as const,
		default: '',
		description:
			'Latitude in decimal degrees. Use together with Longitude (alternative to Location). Leave empty when using Location only.',
		placeholder: 'e.g. 37.7749',
	},
	{
		displayName: 'Longitude',
		name: 'longitude',
		type: 'string' as const,
		default: '',
		description:
			'Longitude in decimal degrees. Use together with Latitude (alternative to Location). Leave empty when using Location only.',
		placeholder: 'e.g. -122.4194',
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number' as const,
		default: 20,
		description: 'Number of results (1–50). Default is 20.',
		typeOptions: {
			minValue: 1,
			maxValue: 50,
		},
	},
);

optional_parameters.push(
	{
		displayName: 'Radius (meters)',
		name: 'radius',
		type: 'number' as const,
		default: 0,
		description:
			'Bias toward results closer to the coordinates, in meters. Not a strict result radius; search is global if omitted.',
		typeOptions: {
			minValue: 0,
		},
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'options',
		default: 'US',
		description: 'Two-letter country code to scope the search',
		options: CountryCodes.map(({ country: name, code: value }) => ({ name, value })),
	},
	{
		displayName: 'Search Language',
		name: 'search_lang',
		type: 'options',
		default: 'en',
		description: 'Language for search results',
		options: LanguageCodes.map(({ language: name, code: value }) => ({ name, value })),
	},
	{
		displayName: 'User Interface Language',
		name: 'ui_lang',
		type: 'options',
		default: 'en-US',
		description: 'UI language for the response (often <code>language-region</code>)',
		options: MarketCodes.map(({ country, language, code }) => ({
			name: `${language} (${country})`,
			value: code,
		})),
	},
	{
		displayName: 'Units',
		name: 'units',
		type: 'options',
		default: 'metric',
		description: 'Units for distance values in the response',
		options: [
			{ name: 'Metric', value: 'metric' },
			{ name: 'Imperial', value: 'imperial' },
		],
	},
	{
		displayName: 'Safe Search',
		name: 'safesearch',
		type: 'options',
		default: 'strict',
		description: 'Safe search level for results',
		options: [
			{ name: 'Off', value: 'off' },
			{ name: 'Moderate', value: 'moderate' },
			{ name: 'Strict', value: 'strict' },
		],
	},
	{
		displayName: 'Spellcheck',
		name: 'spellcheck',
		type: 'boolean',
		default: true,
		description: 'Whether to spellcheck the query before search',
	},
	{
		displayName: 'Geolocation',
		name: 'geoloc',
		type: 'string',
		default: '',
		description:
			'Optional user position as <code>&lt;latitude&gt;x&lt;longitude&gt;</code>, used to compute distances in results',
		placeholder: 'e.g. 37.7749x-122.4194',
	},
);

parameters.push({
	displayName: 'Additional Parameters',
	name: 'additionalParameters',
	type: 'collection' as const,
	default: {},
	placeholder: 'Add Parameter',
	options: optional_parameters,
});

export default parameters satisfies INodeProperties[];
