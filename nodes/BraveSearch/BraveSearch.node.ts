import {
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
		// Maybe get data from previous node
		const items = this.getInputData();
		const raw_results: any[] = [];

		// Runs for each input item received from the previous node
		for (let i = 0; i < items.length; i++) {
			// TODO (Sampson): Implement a better rate limiting strategy
			await new Promise((resolve) => setTimeout(resolve, 1100));

			// Determine which API endpoint will be queried
			const endpointKey = this.getNodeParameter('endpoint', i) as string;
			const endpoint = ENDPOINT_MAP[endpointKey];

			// Construct the parameters for the API request
			const params = Object.fromEntries(
				endpoint.PROPERTIES.map((param) => {
					return [param.name, this.getNodeParameter(param.name, i)];
				}),
			);

			// Query the Brave Search API
			const response = await this.helpers.requestWithAuthentication.call(this, 'braveSearchApi', {
				url: `https://api.search.brave.com/res/v1${endpoint.ENDPOINT}`,
				qs: endpoint.buildQuery(params),
				json: true,
			});

			// Add response for this item to the return data
			raw_results.push(response);
		}

		// Leverage the n8n's `returnJsonArray` to format the response data appropriately
		return [this.helpers.returnJsonArray(raw_results)];
	}
}
