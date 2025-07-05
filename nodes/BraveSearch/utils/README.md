# Brave Search Node Debugging & Error Handling

This module provides comprehensive debugging capabilities and enhanced error handling for the Brave Search node to help troubleshoot API requests and responses.

## Features

### Debugging
- **Clean, formatted console output** with emojis and clear sections
- **Request logging** showing URL, query parameters, and headers
- **Response logging** with status codes, timing, and body previews
- **Error logging** with detailed error information and context
- **Modular design** for easy maintenance and extension

### Enhanced Error Handling
- **User-friendly error messages** that explain what went wrong
- **Specific suggestions** for fixing common issues
- **Parameter validation feedback** with expected values
- **Structured error parsing** from Brave Search API responses

## How to Enable Debugging

### Option 1: Through the Node UI (Recommended)
1. Open your Brave Search node
2. Toggle the "Enable Debug Logging" option to `true`
3. Run your workflow

### Option 2: Environment Variable
Set the environment variable:
```bash
export BRAVE_SEARCH_DEBUG=true
```

### Option 3: Development Mode
Debugging is automatically enabled when `NODE_ENV=development`

## Enhanced Error Messages

Instead of generic error messages, you'll now see helpful, structured errors:

### Before (Generic Error)
```
NodeApiError: Request failed with status code 422
Your request is invalid or could not be processed by the service
```

### After (Enhanced Error)
```
Parameter Validation Failed:
Invalid value "UA" for "query.country". Expected one of: 'AR', 'AU', 'AT', 'BE', 'BR', 'CA', 'CL', 'DK', 'FI', 'FR', 'DE', 'HK', 'IN', 'ID', 'IT', 'JP', 'KR', 'MY', 'MX', 'NL', 'NZ', 'NO', 'CN', 'PL', 'PT', 'PH', 'RU', 'SA', 'ZA', 'ES', 'SE', 'CH', 'TW', 'TR', 'GB', 'US' or 'ALL'

Suggestions:
• Select a supported country from the dropdown list or use "Any" for global results

Error ID: 3593d800-ba80-4038-bad9-dc53c7d0ed29
```

## Supported Error Types

### Validation Errors (VALIDATION)
- **Parameter format issues**: Wrong data types, invalid enums, etc.
- **Length constraints**: Query too long, count out of range
- **Required fields**: Missing mandatory parameters
- **Specific suggestions** for each validation error

### Authentication Errors (AUTHORIZATION)
- **Invalid API key**: Key doesn't exist or is malformed
- **Expired credentials**: API key has expired
- **Permission issues**: Key doesn't have required permissions

### Rate Limiting (RATE_LIMIT)
- **Too many requests**: Exceeded requests per second/minute
- **Helpful timing suggestions**: When to retry
- **Upgrade recommendations**: Higher tier plans

### Quota Exceeded (QUOTA_EXCEEDED)
- **Monthly/daily limits**: Used up your plan's quota
- **Reset timing**: When quota will refresh
- **Plan upgrade suggestions**: Options for higher quotas

## Debug Output Format

### Request Log Example
```
🔍 BRAVE SEARCH API REQUEST
==================================================
Operation: web
URL: https://api.search.brave.com/res/v1/web/search
Timestamp: 2024-01-15T10:30:00.000Z

📤 Query Parameters:
{
  "q": "search query",
  "country": "US",
  "count": 10
}

🔧 Headers:
{
  "X-Subscription-Token": "[REDACTED]",
  "Accept": "application/json",
  "Accept-Encoding": "gzip"
}
==================================================
```

### Response Log Example
```
✅ BRAVE SEARCH API RESPONSE
==================================================
Status Code: 200
Duration: 245ms
Response Size: 1524 characters
Timestamp: 2024-01-15T10:30:00.245Z

📥 Response Headers:
{
  "content-type": "application/json",
  "x-ratelimit-remaining": "999"
}

📋 Response Body Preview (first 500 chars):
{
  "type": "search",
  "query": {
    "original": "search query",
    "show_strict_warning": false
  },
  "web": {
    "type": "search",
    "results": [...]
  }
}...
==================================================
```

### Error Log Example
```
💥 BRAVE SEARCH API ERROR
==================================================
Error Type: NodeApiError
Message: Request failed with status code 422
Timestamp: 2024-01-15T10:30:00.000Z

🔍 Failed Request Details:
Operation: web
URL: https://api.search.brave.com/res/v1/web/search
Query Parameters: {...}

📊 Error Details:
{
  "message": "Request failed with status code 422",
  "status": 422,
  "response": {...}
}
==================================================
```

## Security Notes

- API keys are automatically redacted in logs as `[REDACTED]`
- Only the first 500 characters of response bodies are shown to prevent overwhelming logs
- Headers are logged but sensitive values should be automatically masked
- Error IDs are preserved for support purposes

## Troubleshooting Common Issues

1. **Country Validation Errors**: The error message will show exactly which countries are supported
2. **Query Length Issues**: Clear feedback on character/word limits
3. **Rate Limiting**: Specific suggestions on wait times and plan upgrades
4. **Authentication**: Step-by-step troubleshooting for API key issues

## Development

The utilities are located in `nodes/BraveSearch/utils/`:

### Debug Module (`debug.ts`)
- `BraveSearchDebugger.logRequest()` - Log outgoing requests
- `BraveSearchDebugger.logResponse()` - Log API responses  
- `BraveSearchDebugger.logError()` - Log errors with context
- `BraveSearchDebugger.shouldDebug()` - Determine if debugging is enabled

### Error Handler Module (`errorHandler.ts`)
- `BraveSearchErrorHandler.createUserFriendlyError()` - Create enhanced error messages
- `BraveSearchErrorHandler.getErrorTypeDescription()` - Get short error descriptions
- Support for parsing Brave Search API error structures
- Contextual suggestions based on error types
