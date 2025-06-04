import {
	NodeApiError,
	NodeParameterValue,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { OPERATIONS, PROPERTIES, type BraveSearchOperation } from './operations';

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
		subtitle: '={{$parameter["operation"]}}',
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
		usableAsTool: true,
		properties: PROPERTIES,
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

	static buildParams(
		ctx: IExecuteFunctions,
		operation: BraveSearchOperation,
		index: number,
	): Record<string, NodeParameterValue> {
		const params = {} as Record<string, NodeParameterValue>;

		for (const { name, type } of operation.parameters) {
			const nodeParam = ctx.getNodeParameter(name, index);

			// We use collections for 'Additional Parameters', so we need to iterate over their options
			if (type === 'collection' && name === 'additionalParameters') {
				const additional_parameters = ctx.getNodeParameter('additionalParameters', index) ?? {};
				Object.entries(additional_parameters).forEach(([key, value]) => {
					params[key] = value;
				});
			} else {
				params[name] = nodeParam as NodeParameterValue;
			}
		}
		ctx.logger.debug(`Params for operation: ${operation.key}: ` + JSON.stringify(params, null, 4));
		return params;
	}

	static async performRequest(ctx: IExecuteFunctions, index: number): Promise<any> {
		const operation = OPERATIONS[ctx.getNodeParameter('operation', index)];
		const params = BraveSearch.buildParams(ctx, operation, index);
		const response = await ctx.helpers.httpRequestWithAuthentication.call(ctx, 'braveSearchApi', {
			url: `https://api.search.brave.com/res/v1${operation.endpoint}`,
			qs: operation.buildQuery(params),
			returnFullResponse: true,
			json: true,
		});

		return response.body;
	}
}
