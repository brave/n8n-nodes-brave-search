import {
	NodeApiError,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { ENDPOINTS, ENDPOINT_MAP } from './endpoints';

/**
 * https://docs.n8n.io/integrations/creating-nodes/overview/
 * https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/
 * https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/
 * https://docs.n8n.io/integrations/creating-nodes/build/reference/ux-guidelines/
 */
export class BraveSearch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Brave Search',
		name: 'braveSearch',
		icon: 'file:braveSearch.svg',
		group: ['transform'],
		version: 1,
		description: 'Search the web using Brave Search',
		defaults: {
			name: 'Brave Search',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'braveSearchApi',
				required: true,
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			/* eslint-disable n8n-nodes-base/node-param-default-wrong-for-options */
			{
				displayName: 'Endpoint',
				description: 'The endpoint to use for the Brave Search API',
				name: 'endpoint',
				type: 'options',
				options: ENDPOINTS.map(({ OPTION }) => OPTION),
				default: 'web',
				required: true,
			},
			/* eslint-enable n8n-nodes-base/node-param-default-wrong-for-options */
			...ENDPOINTS.flatMap((e) => e.PROPERTIES),
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const raw_results: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				raw_results.push(await BraveSearch.performRequest(this, i));
			} catch (error) {
				// If the user has chosen to continue on failure (from within the node settings),
				if (this.continueOnFail()) {
					raw_results.push({ json: items[i].json, pairedItem: i, error });
					continue;
				}

				if (error.context) {
					error.context.itemIndex = i;
					throw error;
				}

				throw new NodeApiError(this.getNode(), error, { itemIndex: i });
			}
		}

		return [this.helpers.returnJsonArray(raw_results)];
	}

	static buildParams(ctx: IExecuteFunctions, endpoint: any, index: number): Record<string, any> {
		const params = Object.fromEntries(
			endpoint.PROPERTIES.map((param: any) => [
				param.name,
				ctx.getNodeParameter(param.name, index),
			]),
		);

		return params;
	}

	static async performRequest(ctx: IExecuteFunctions, index: number): Promise<any> {
		const endpoint = ENDPOINT_MAP[ctx.getNodeParameter('endpoint', index) as string];
		const params = BraveSearch.buildParams(ctx, endpoint, index);

		const response = await ctx.helpers.requestWithAuthentication.call(ctx, 'braveSearchApi', {
			url: `https://api.search.brave.com/res/v1${endpoint.ENDPOINT}`,
			qs: endpoint.buildQuery(params),
			json: true,
		});

		return response;
	}
}
