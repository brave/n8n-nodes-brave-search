import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export interface BraveSearchOperation {
	KEY: string;
	ENDPOINT: string;
	OPTION: INodePropertyOptions;
	PROPERTIES: INodeProperties[];
	buildQuery(params: Record<string, any>): Record<string, any>;
}
