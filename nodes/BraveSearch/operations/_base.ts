import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export interface BraveSearchOperation {
	key: string;
	endpoint: string;
	details: INodePropertyOptions;
	parameters: INodeProperties[];
	buildQuery(parameters: Record<string, any>): Record<string, any>;
}

/**
 * Filters out properties that are null, undefined, or empty strings.
 * The request client automatically handles array-to-CSV conversion.
 * @param params - The parameters object to filter.
 * @returns A new object with only the valuable properties.
 */
export function filterEmptyOrNil(params: Record<string, any>): Record<string, any> {
	const result: Record<string, any> = {};
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null && value !== '') {
			result[key] = value;
		}
	}
	return result;
}
