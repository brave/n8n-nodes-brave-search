import type { INodeProperties } from 'n8n-workflow';
import { SuggestCountryCodes, SuggestLanguageCodes } from './data';

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
			'The user’s suggest search query term. Query can not be empty. The max query length is 400 characters, and the word limit is 50.',
		required: true,
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number' as const,
		default: 50,
		description:
			'The number of suggestion search results returned in response. The actual number of results delivered may be less than requested. Minimum is 1, maximum is 20. The default is 5.',
		typeOptions: {
			minValue: 1,
			maxValue: 20,
		},
	}
);

// Optional Parameters
optional_parameters.push(
	{
		displayName: 'Country',
		name: 'country',
		type: 'options' as const,
		default: 'US',
		description: 'An associated country code. This is used as a hint. Default is "US".',
		options: SuggestCountryCodes.map(({ country, code }) => {
			return {
				name: `${country} (${code})`,
				value: code,
			};
		}),
	},
	{
		displayName: 'Language',
		name: 'lang',
		type: 'options' as const,
		default: 'en',
		description: 'An associated 2-or-more character language code. Default is "en".',
		options: SuggestLanguageCodes.map(({ language, code }) => {
			return {
				name: `${language} (${code})`,
				value: code,
			};
		}),
	},
	{
		displayName: 'Rich Results',
		name: 'rich',
		type: 'boolean' as const,
		default: false,
		description:
			'Whether to enhance suggestions with rich results',
        hint: 'Requires a paid <em>Suggest</em> subscription',
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
