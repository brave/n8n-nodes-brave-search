import {
	NodeParameterValue,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { OPERATIONS, PROPERTIES, type BraveSearchOperation } from './operations';
import { BraveSearchDebugger, type RequestDebugInfo, type ResponseDebugInfo } from './utils/debug';
import { BraveSearchErrorHandler } from './utils/errorHandler';

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

				// Use enhanced error handling for better user experience
				const enhancedError = BraveSearchErrorHandler.createUserFriendlyError(
					this.getNode(),
					error,
					i
				);
				throw enhancedError;
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
			if (type === 'collection') {
				const collectionParams =
					(ctx.getNodeParameter(name, index, {}) as Record<string, NodeParameterValue>) ?? {};
				Object.assign(params, collectionParams);
			} else {
				params[name] = ctx.getNodeParameter(name, index) as NodeParameterValue;
			}
		}

		return params;
	}

	static async performRequest(ctx: IExecuteFunctions, index: number): Promise<any> {
		const operation = OPERATIONS[ctx.getNodeParameter('operation', index)];
		const params = BraveSearch.buildParams(ctx, operation, index);
		const queryParams = operation.buildQuery(params);
		const url = `https://api.search.brave.com/res/v1${operation.endpoint}`;

		const startTime = performance.now();
		let requestInfo: RequestDebugInfo | undefined;

		if (await BraveSearchDebugger.shouldDebug(ctx, index)) {
			requestInfo = {
				url,
				queryParams,
				headers: {
					'X-Subscription-Token': '[REDACTED]',
					'Accept': 'application/json',
					'Accept-Encoding': 'gzip'
				},
				operation: operation.key,
				timestamp: new Date().toISOString()
			};
			await BraveSearchDebugger.logRequest(ctx, requestInfo);
		}

		try {
			const response = await ctx.helpers.httpRequestWithAuthentication.call(ctx, 'braveSearchApi', {
				url,
				qs: queryParams,
				returnFullResponse: true,
				json: true,
			});

			if (await BraveSearchDebugger.shouldDebug(ctx, index)) {
				const responseInfo: ResponseDebugInfo = {
					statusCode: response.statusCode,
					headers: response.headers,
					bodySize: JSON.stringify(response.body).length,
					hasError: false,
					timestamp: new Date().toISOString(),
					duration: Math.round(performance.now() - startTime)
				};
				await BraveSearchDebugger.logResponse(ctx, responseInfo, response.body);
			}

			return response.body;
		} catch (error) {
			if (await BraveSearchDebugger.shouldDebug(ctx, index)) {
				await BraveSearchDebugger.logError(ctx, error, requestInfo);
			}

			// Enhanced error handling - create user-friendly error
			throw BraveSearchErrorHandler.createUserFriendlyError(ctx.getNode(), error);
		}
	}
}
