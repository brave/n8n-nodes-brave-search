import type { INodeProperties } from 'n8n-workflow';
import { CountryCodes, LanguageCodes } from './data';

const parameters: INodeProperties[] = [];
const optional_parameters: INodeProperties['options'] = [];

// The parameters for this operation
parameters.push({
	displayName: 'Query',
	name: 'query',
	type: 'string' as const,
	default: '',
	description:
		'The user’s spellcheck search query. Query can not be empty. Maximum of 400 characters and 50 words in the query.',
	required: true,
});

// Optional Parameters
optional_parameters.push(
	{
		displayName: 'Country',
		name: 'country',
		type: 'options' as const,
		default: 'US',
		description: 'An associated country code. This is used as a hint. Default is "US".',
		options: CountryCodes.map(({ country, code }) => {
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
		options: LanguageCodes.map(({ language, code }) => {
			return {
				name: `${language} (${code})`,
				value: code,
			};
		}),
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
