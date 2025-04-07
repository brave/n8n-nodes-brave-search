import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export interface BraveEndpoint {
	KEY: string;
	ENDPOINT: string;
	OPTION: INodePropertyOptions;
	PROPERTIES: INodeProperties[];
	buildQuery(params: Record<string, any>): Record<string, any>;
}
