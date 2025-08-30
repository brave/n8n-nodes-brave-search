import type { IExecuteFunctions } from 'n8n-workflow';

export interface RequestDebugInfo {
    url: string;
    queryParams: Record<string, any>;
    headers?: Record<string, any>;
    operation: string;
    timestamp: string;
}

export interface ResponseDebugInfo {
    statusCode: number;
    headers?: Record<string, any>;
    bodySize: number;
    hasError: boolean;
    timestamp: string;
    duration: number;
}

export class BraveSearchDebugger {
    private static formatTimestamp(): string {
        return new Date().toISOString();
    }

    static async logRequest(ctx: IExecuteFunctions, requestInfo: RequestDebugInfo): Promise<void> {
        if (!(await this.shouldDebug(ctx))) return;
        const debugMessage = [
            'BRAVE SEARCH API REQUEST',
            ''.padEnd(50, '='),
            `Operation: ${requestInfo.operation}`,
            `URL: ${requestInfo.url}`,
            `Timestamp: ${requestInfo.timestamp}`,
            '',
            'Query Parameters:',
            JSON.stringify(requestInfo.queryParams, null, 2),
            '',
            'Headers:',
            JSON.stringify(requestInfo.headers || {}, null, 2),
            ''.padEnd(50, '='),
        ].join('\n');

        console.log(debugMessage);
    }

    static async logResponse(ctx: IExecuteFunctions, responseInfo: ResponseDebugInfo, responseBody?: any): Promise<void> {
        if (!(await this.shouldDebug(ctx))) return;
        const statusLabel = responseInfo.hasError ? 'ERROR' : 'OK';
        const debugMessage = [
            'BRAVE SEARCH API RESPONSE',
            ''.padEnd(50, '='),
            `Status: ${statusLabel}`,
            `Status Code: ${responseInfo.statusCode}`,
            `Duration: ${responseInfo.duration}ms`,
            `Response Size: ${responseInfo.bodySize} characters`,
            `Timestamp: ${responseInfo.timestamp}`,
            '',
            'Response Headers:',
            JSON.stringify(responseInfo.headers || {}, null, 2),
            '',
            'Response Body Preview (first 500 chars):',
            responseBody ? JSON.stringify(responseBody, null, 2).substring(0, 500) + '...' : 'No body',
            ''.padEnd(50, '='),
        ].join('\n');

        console.log(debugMessage);
    }

    static async logError(ctx: IExecuteFunctions, error: any, requestInfo?: RequestDebugInfo): Promise<void> {
        if (!(await this.shouldDebug(ctx))) return;
        const debugMessage = [
            'BRAVE SEARCH API ERROR',
            ''.padEnd(50, '='),
            `Error Type: ${error.constructor.name}`,
            `Message: ${error.message}`,
            `Timestamp: ${this.formatTimestamp()}`,
            '',
            ...(requestInfo ? [
                'Failed Request Details:',
                `Operation: ${requestInfo.operation}`,
                `URL: ${requestInfo.url}`,
                `Query Parameters: ${JSON.stringify(requestInfo.queryParams, null, 2)}`,
                ''
            ] : []),
            'Error Details:',
            JSON.stringify(error, null, 2),
            ''.padEnd(50, '='),
        ].join('\n');

        console.error(debugMessage);
    }

    static async shouldDebug(ctx?: IExecuteFunctions, index?: number): Promise<boolean> {
        if (ctx) {
            try {
                const credentials = (await ctx.getCredentials('braveSearchApi')) as { debug?: boolean };
                if (credentials?.debug) return true;
            } catch {
                // Ignore error if credentials are not available
            }

            if (index !== undefined) {
                try {
                    const debugMode = ctx.getNodeParameter('debugMode', index, false) as boolean;
                    if (debugMode) return true;
                } catch {
                    // Parameter may not exist
                }
            }
        }

        return process.env.BRAVE_SEARCH_DEBUG === 'true' || process.env.NODE_ENV === 'development';
    }
}
