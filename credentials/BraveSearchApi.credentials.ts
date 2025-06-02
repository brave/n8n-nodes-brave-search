import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BraveSearchApi implements ICredentialType {
	name = 'braveSearchApi';
	icon = 'file:../nodes/BraveSearch/braveSearch.svg' as const;
	displayName = 'Brave Search API';
	documentationUrl = 'https://api-dashboard.search.brave.com/app/documentation/';

	properties: INodeProperties[] = [
		{
			name: 'apiKey',
			displayName: 'API Key',
			type: 'string',
			default: '',
			typeOptions: { password: true },
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Subscription-Token': '={{$credentials.apiKey}}',
			},
		},
	};

	/**
	 * TODO (Sampson): When Brave Search API adds an endpoint for testing
	 * credentials, which doesn't cost the user a request, we should revisit
	 * and use that endpoint instead.
	 */
	test: ICredentialTestRequest = {
		request: {
			url: 'https://api.search.brave.com/res/v1/web/search',
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Accept-Encoding': 'gzip',
				'X-Subscription-Token': '={{$credentials.apiKey}}',
			},
			qs: {
				q: 'n8n',
				count: 1,
			},
		},
	};
}
