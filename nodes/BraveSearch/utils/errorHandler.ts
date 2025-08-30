import { NodeApiError, type INode } from 'n8n-workflow';

export interface BraveSearchApiError {
    id: string;
    status: number;
    code: string;
    detail: string;
    meta?: {
        errors?: Array<{
            type: string;
            loc: string[];
            msg: string;
            input?: string;
            ctx?: {
                expected?: string;
            };
        }>;
    };
}

export interface BraveSearchErrorResponse {
    type: string;
    error: BraveSearchApiError;
    time: number;
}

export class BraveSearchErrorHandler {
    /**
     * Creates a user-friendly error message from Brave Search API error response
     */
    static createUserFriendlyError(node: INode, originalError: any, itemIndex?: number): NodeApiError {
        const errorResponse = this.parseBraveSearchError(originalError);

        if (errorResponse) {
            const friendlyMessage = this.buildFriendlyMessage(errorResponse);
            const suggestions = this.getSuggestions(errorResponse);

            const fullMessage = [
                friendlyMessage,
                '',
                suggestions.length > 0 ? 'Suggestions:' : undefined,
                ...suggestions.map(s => `• ${s}`),
                '',
                `Error ID: ${errorResponse.error.id}`,
            ].filter(line => line !== undefined).join('\n');

            return new NodeApiError(node, originalError, {
                message: fullMessage,
                description: friendlyMessage,
                itemIndex,
                httpCode: errorResponse.error.status.toString(),
            });
        }

        // Fallback to original error if not a Brave Search API error
        return new NodeApiError(node, originalError, { itemIndex });
    }

    /**
     * Attempts to parse a Brave Search API error from the error object
     */
    private static parseBraveSearchError(error: any): BraveSearchErrorResponse | null {
        try {
            // Check if it's an axios error with response data
            if (error.response?.data) {
                return error.response.data as BraveSearchErrorResponse;
            }

            // Check if it's already in the context.data format
            if (error.context?.data?.error) {
                return error.context.data as BraveSearchErrorResponse;
            }

            // Check if the error itself contains the structure
            if (error.error && error.type) {
                return error as BraveSearchErrorResponse;
            }

            return null;
        } catch {
            return null;
        }
    }

    /**
     * Builds a friendly message based on the error type and details
     */
    private static buildFriendlyMessage(errorResponse: BraveSearchErrorResponse): string {
        const { error } = errorResponse;

        switch (error.code) {
            case 'VALIDATION':
                return this.buildValidationMessage(error);
            case 'AUTHORIZATION':
                return 'Authentication failed. Please check your API key and ensure it\'s valid.';
            case 'RATE_LIMIT':
                return 'Rate limit exceeded. Please wait before making additional requests.';
            case 'QUOTA_EXCEEDED':
                return 'API quota exceeded. Please check your subscription plan or wait for quota reset.';
            default:
                return `API Error (${error.code}): ${error.detail}`;
        }
    }

    /**
     * Builds a detailed validation error message
     */
    private static buildValidationMessage(error: BraveSearchApiError): string {
        if (!error.meta?.errors?.length) {
            return `Validation Error: ${error.detail}`;
        }

        const validationErrors = error.meta.errors.map(validationError => {
            const field = validationError.loc.join('.');
            const value = validationError.input ? `"${validationError.input}"` : 'the provided value';

            switch (validationError.type) {
                case 'enum':
                    const expected = validationError.ctx?.expected || 'a valid option';
                    return `Invalid value ${value} for "${field}". Expected one of: ${expected}`;
                case 'string_too_long':
                    return `Value for "${field}" is too long. ${validationError.msg}`;
                case 'string_too_short':
                    return `Value for "${field}" is too short. ${validationError.msg}`;
                case 'type_error':
                    return `Invalid type for "${field}". ${validationError.msg}`;
                case 'value_error':
                    return `Invalid value for "${field}". ${validationError.msg}`;
                default:
                    return `Validation error for "${field}": ${validationError.msg}`;
            }
        });

        return `Parameter Validation Failed:\n${validationErrors.join('\n')}`;
    }

    /**
     * Provides helpful suggestions based on the error type
     */
    private static getSuggestions(errorResponse: BraveSearchErrorResponse): string[] {
        const { error } = errorResponse;
        const suggestions: string[] = [];

        switch (error.code) {
            case 'VALIDATION':
                if (error.meta?.errors?.length) {
                    error.meta.errors.forEach(validationError => {
                        const field = validationError.loc.join('.');

                        if (field === 'query.country' && validationError.type === 'enum') {
                            suggestions.push('Select a supported country from the dropdown list or use "Any" for global results');
                        } else if (field === 'query.q' && validationError.type === 'string_too_long') {
                            suggestions.push('Shorten your search query to under 400 characters and 50 words');
                        } else if (field === 'query.count') {
                            suggestions.push('Set count to a value between 1 and 20');
                        } else if (field === 'query.offset') {
                            suggestions.push('Set offset to a value between 0 and 9');
                        } else {
                            suggestions.push(`Check the "${field}" parameter value and ensure it meets the API requirements`);
                        }
                    });
                } else {
                    suggestions.push('Check all parameter values and ensure they meet the API requirements');
                }
                break;

            case 'AUTHORIZATION':
                suggestions.push('Verify your API key is correct in the Brave Search credentials');
                suggestions.push('Ensure your API key has the necessary permissions');
                suggestions.push('Check if your API key has expired');
                break;

            case 'RATE_LIMIT':
                suggestions.push('Wait a few seconds before retrying the request');
                suggestions.push('Consider upgrading your API plan for higher rate limits');
                suggestions.push('Implement delays between requests in your workflow');
                break;

            case 'QUOTA_EXCEEDED':
                suggestions.push('Check your current quota usage in the Brave Search dashboard');
                suggestions.push('Upgrade your subscription plan for higher quotas');
                suggestions.push('Wait for your quota to reset (usually monthly)');
                break;

            default:
                suggestions.push('Enable debug logging to see the full request details');
                suggestions.push('Check the Brave Search API documentation for more information');
                break;
        }

        return suggestions;
    }

    /**
     * Gets a short description for common error types
     */
    static getErrorTypeDescription(code: string): string {
        switch (code) {
            case 'VALIDATION':
                return 'Invalid request parameters';
            case 'AUTHORIZATION':
                return 'Authentication failed';
            case 'RATE_LIMIT':
                return 'Too many requests';
            case 'QUOTA_EXCEEDED':
                return 'API quota exceeded';
            default:
                return 'API error';
        }
    }
}
