import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export interface BraveSearchOperation {
	key: string;
	endpoint: string;
	details: INodePropertyOptions;
	parameters: INodeProperties[];
	buildQuery(parameters: Record<string, any>): Record<string, any>;
}
