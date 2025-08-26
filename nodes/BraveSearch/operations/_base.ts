import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export interface BraveSearchOperation {
	key: string;
	endpoint: string;
	details: INodePropertyOptions;
	parameters: INodeProperties[];
	buildQuery(parameters: Record<string, any>): Record<string, any>;
}

/** Country Codes: For use with the `country` parameter. */
export const country_codes: { country: string; code: string }[] = [
	{
		country: 'All Regions',
		code: 'ALL',
	},
	{
		country: 'Argentina',
		code: 'AR',
	},
	{
		country: 'Australia',
		code: 'AU',
	},
	{
		country: 'Austria',
		code: 'AT',
	},
	{
		country: 'Belgium',
		code: 'BE',
	},
	{
		country: 'Brazil',
		code: 'BR',
	},
	{
		country: 'Canada',
		code: 'CA',
	},
	{
		country: 'Chile',
		code: 'CL',
	},
	{
		country: 'Denmark',
		code: 'DK',
	},
	{
		country: 'Finland',
		code: 'FI',
	},
	{
		country: 'France',
		code: 'FR',
	},
	{
		country: 'Germany',
		code: 'DE',
	},
	{
		country: 'Hong Kong',
		code: 'HK',
	},
	{
		country: 'India',
		code: 'IN',
	},
	{
		country: 'Indonesia',
		code: 'ID',
	},
	{
		country: 'Italy',
		code: 'IT',
	},
	{
		country: 'Japan',
		code: 'JP',
	},
	{
		country: 'Korea',
		code: 'KR',
	},
	{
		country: 'Malaysia',
		code: 'MY',
	},
	{
		country: 'Mexico',
		code: 'MX',
	},
	{
		country: 'Netherlands',
		code: 'NL',
	},
	{
		country: 'New Zealand',
		code: 'NZ',
	},
	{
		country: 'Norway',
		code: 'NO',
	},
	{
		country: 'Peoples Republic of China',
		code: 'CN',
	},
	{
		country: 'Poland',
		code: 'PL',
	},
	{
		country: 'Portugal',
		code: 'PT',
	},
	{
		country: 'Republic of the Philippines',
		code: 'PH',
	},
	{
		country: 'Russia',
		code: 'RU',
	},
	{
		country: 'Saudi Arabia',
		code: 'SA',
	},
	{
		country: 'South Africa',
		code: 'ZA',
	},
	{
		country: 'Spain',
		code: 'ES',
	},
	{
		country: 'Sweden',
		code: 'SE',
	},
	{
		country: 'Switzerland',
		code: 'CH',
	},
	{
		country: 'Taiwan',
		code: 'TW',
	},
	{
		country: 'Turkey',
		code: 'TR',
	},
	{
		country: 'United Kingdom',
		code: 'GB',
	},
	{
		country: 'United States',
		code: 'US',
	},
];

/** Language Codes: For use with the `search_lang` parameter. */
export const language_codes: { language: string; code: string }[] = [
	{
		language: 'Arabic',
		code: 'ar',
	},
	{
		language: 'Basque',
		code: 'eu',
	},
	{
		language: 'Bengali',
		code: 'bn',
	},
	{
		language: 'Bulgarian',
		code: 'bg',
	},
	{
		language: 'Catalan',
		code: 'ca',
	},
	{
		language: 'Chinese Simplified',
		code: 'zh-hans',
	},
	{
		language: 'Chinese Traditional',
		code: 'zh-hant',
	},
	{
		language: 'Croatian',
		code: 'hr',
	},
	{
		language: 'Czech',
		code: 'cs',
	},
	{
		language: 'Danish',
		code: 'da',
	},
	{
		language: 'Dutch',
		code: 'nl',
	},
	{
		language: 'English',
		code: 'en',
	},
	{
		language: 'English United Kingdom',
		code: 'en-gb',
	},
	{
		language: 'Estonian',
		code: 'et',
	},
	{
		language: 'Finnish',
		code: 'fi',
	},
	{
		language: 'French',
		code: 'fr',
	},
	{
		language: 'Galician',
		code: 'gl',
	},
	{
		language: 'German',
		code: 'de',
	},
	{
		language: 'Gujarati',
		code: 'gu',
	},
	{
		language: 'Hebrew',
		code: 'he',
	},
	{
		language: 'Hindi',
		code: 'hi',
	},
	{
		language: 'Hungarian',
		code: 'hu',
	},
	{
		language: 'Icelandic',
		code: 'is',
	},
	{
		language: 'Italian',
		code: 'it',
	},
	{
		language: 'Japanese',
		code: 'jp',
	},
	{
		language: 'Kannada',
		code: 'kn',
	},
	{
		language: 'Korean',
		code: 'ko',
	},
	{
		language: 'Latvian',
		code: 'lv',
	},
	{
		language: 'Lithuanian',
		code: 'lt',
	},
	{
		language: 'Malay',
		code: 'ms',
	},
	{
		language: 'Malayalam',
		code: 'ml',
	},
	{
		language: 'Marathi',
		code: 'mr',
	},
	{
		language: 'Norwegian Bokmål',
		code: 'nb',
	},
	{
		language: 'Polish',
		code: 'pl',
	},
	{
		language: 'Portuguese Brazil',
		code: 'pt-br',
	},
	{
		language: 'Portuguese Portugal',
		code: 'pt-pt',
	},
	{
		language: 'Punjabi',
		code: 'pa',
	},
	{
		language: 'Romanian',
		code: 'ro',
	},
	{
		language: 'Russian',
		code: 'ru',
	},
	{
		language: 'Serbian Cyrylic',
		code: 'sr',
	},
	{
		language: 'Slovak',
		code: 'sk',
	},
	{
		language: 'Slovenian',
		code: 'sl',
	},
	{
		language: 'Spanish',
		code: 'es',
	},
	{
		language: 'Swedish',
		code: 'sv',
	},
	{
		language: 'Tamil',
		code: 'ta',
	},
	{
		language: 'Telugu',
		code: 'te',
	},
	{
		language: 'Thai',
		code: 'th',
	},
	{
		language: 'Turkish',
		code: 'tr',
	},
	{
		language: 'Ukrainian',
		code: 'uk',
	},
	{
		language: 'Vietnamese',
		code: 'vi',
	},
];

/** Market Codes: For use with the `ui_lang` parameter. */
export const market_codes: { country: string; language: string; code: string }[] = [
	{
		country: 'Argentina',
		language: 'Spanish',
		code: 'es-AR',
	},
	{
		country: 'Australia',
		language: 'English',
		code: 'en-AU',
	},
	{
		country: 'Austria',
		language: 'German',
		code: 'de-AT',
	},
	{
		country: 'Belgium',
		language: 'Dutch',
		code: 'nl-BE',
	},
	{
		country: 'Belgium',
		language: 'French',
		code: 'fr-BE',
	},
	{
		country: 'Brazil',
		language: 'Portuguese',
		code: 'pt-BR',
	},
	{
		country: 'Canada',
		language: 'English',
		code: 'en-CA',
	},
	{
		country: 'Canada',
		language: 'French',
		code: 'fr-CA',
	},
	{
		country: 'Chile',
		language: 'Spanish',
		code: 'es-CL',
	},
	{
		country: 'Denmark',
		language: 'Danish',
		code: 'da-DK',
	},
	{
		country: 'Finland',
		language: 'Finnish',
		code: 'fi-FI',
	},
	{
		country: 'France',
		language: 'French',
		code: 'fr-FR',
	},
	{
		country: 'Germany',
		language: 'German',
		code: 'de-DE',
	},
	{
		country: 'Hong Kong SAR',
		language: 'Traditional Chinese',
		code: 'zh-HK',
	},
	{
		country: 'India',
		language: 'English',
		code: 'en-IN',
	},
	{
		country: 'Indonesia',
		language: 'English',
		code: 'en-ID',
	},
	{
		country: 'Italy',
		language: 'Italian',
		code: 'it-IT',
	},
	{
		country: 'Japan',
		language: 'Japanese',
		code: 'ja-JP',
	},
	{
		country: 'Korea',
		language: 'Korean',
		code: 'ko-KR',
	},
	{
		country: 'Malaysia',
		language: 'English',
		code: 'en-MY',
	},
	{
		country: 'Mexico',
		language: 'Spanish',
		code: 'es-MX',
	},
	{
		country: 'Netherlands',
		language: 'Dutch',
		code: 'nl-NL',
	},
	{
		country: 'New Zealand',
		language: 'English',
		code: 'en-NZ',
	},
	{
		country: 'Norway',
		language: 'Norwegian',
		code: 'no-NO',
	},
	{
		country: "People's republic of China",
		language: 'Chinese',
		code: 'zh-CN',
	},
	{
		country: 'Poland',
		language: 'Polish',
		code: 'pl-PL',
	},
	{
		country: 'Republic of the Philippines',
		language: 'English',
		code: 'en-PH',
	},
	{
		country: 'Russia',
		language: 'Russian',
		code: 'ru-RU',
	},
	{
		country: 'South Africa',
		language: 'English',
		code: 'en-ZA',
	},
	{
		country: 'Spain',
		language: 'Spanish',
		code: 'es-ES',
	},
	{
		country: 'Sweden',
		language: 'Swedish',
		code: 'sv-SE',
	},
	{
		country: 'Switzerland',
		language: 'French',
		code: 'fr-CH',
	},
	{
		country: 'Switzerland',
		language: 'German',
		code: 'de-CH',
	},
	{
		country: 'Taiwan',
		language: 'Traditional Chinese',
		code: 'zh-TW',
	},
	{
		country: 'Turkey',
		language: 'Turkish',
		code: 'tr-TR',
	},
	{
		country: 'United Kingdom',
		language: 'English',
		code: 'en-GB',
	},
	{
		country: 'United States',
		language: 'English',
		code: 'en-US',
	},
	{
		country: 'United States',
		language: 'Spanish',
		code: 'es-US',
	},
];
