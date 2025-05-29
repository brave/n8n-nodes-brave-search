import {
	NodeApiError,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { ENDPOINTS, ENDPOINT_MAP } from './endpoints';

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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][] | null> {
		const items = this.getInputData();
		const raw_results: any[] = [];
		for (let i = 0; i < items.length; i++) {
			const result = await BraveSearch.performRequest(this, i);
			raw_results.push(result);
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

	static async handleRateLimitHeaders(response: any): Promise<void> {
		const rlResetHeader = response.headers['x-ratelimit-reset'];
		if (rlResetHeader) {
			const [perSecReset] = rlResetHeader.split(',').map((v: string) => parseInt(v.trim(), 10));
			if (!isNaN(perSecReset) && perSecReset > 0) {
				await new Promise((resolve) => setTimeout(resolve, perSecReset * 1000));
			}
		}
	}

	static async performRequest(ctx: IExecuteFunctions, index: number): Promise<any> {
		const maxTries = 5;
		let attempt = 0;
		let response = null;

		while (attempt < maxTries) {
			try {
				const endpointKey = ctx.getNodeParameter('endpoint', index) as string;
				const endpoint = ENDPOINT_MAP[endpointKey];
				const params = BraveSearch.buildParams(ctx, endpoint, index);

				response = await ctx.helpers.requestWithAuthentication.call(ctx, 'braveSearchApi', {
					url: `https://api.search.brave.com/res/v1${endpoint.ENDPOINT}`,
					qs: endpoint.buildQuery(params),
					json: true,
					resolveWithFullResponse: true,
				});

				await BraveSearch.handleRateLimitHeaders(response);

				return response.body;
			} catch (error: any) {
				if (error.statusCode === 429) {
					await BraveSearch.handleRateLimitHeaders(error.response);
					attempt++;
					continue;
				}

				throw error;
			}
		}

		throw new NodeApiError(ctx.getNode(), response.body);
	}
}
