![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)
# n8n-nodes-brave-search

This is an n8n community node. It lets you use the [Brave Search API](https://brave.com/search/api/) in your n8n workflows.

Power your search and AI apps with the fastest growing independent search engine since Bing. Access an index of billions of pages with a single call. Get started for free at https://brave.com/search/api/.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)
- [Development](#development)
- [Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node presently supports search operations for general _web_ results, as well as _images_, _news_, and _videos_.

## Credentials

An API key is required in order to issue calls to the Brave Search API. Get started for FREE with 1 query/second, and 2,000 queries/month. Sign up to retrieve your API key at https://brave.com/search/api/.

## Compatibility

Tested locally against n8n v1.93.0.

## Usage

You should familarize yourself with the various _response objects_, to understand what data is provided by the API, and how to access individual insights. Response object formats are available in the Brave Search API documentation. For example, to understand how a standard Web Search response looks, you can visit https://api-dashboard.search.brave.com/app/documentation/web-search/responses.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Brave Search API documentation](https://api-dashboard.search.brave.com/app/documentation/)

## Development

To streamline and accelerate the development process, follow these steps:

### Quick Start (Recommended)

1. Install _n8n_ globally (`pnpm add -g n8n`).
2. Install dependencies: `pnpm install`
3. Run the full development environment: `pnpm run dev:full`
4. Open the n8n editor UI in your browser (typically at http://localhost:5678).

The `dev:full` script automatically:
- Builds the project
- Starts TypeScript compilation in watch mode
- Launches n8n with the proper environment variables set
- Enables hot reloading for development

### Manual Development Setup

If you prefer to run commands separately:

1. Install _n8n_ globally (`pnpm add -g n8n`).
2. Install dependencies: `pnpm install`
3. Build the project: `pnpm build`
4. Start TypeScript watch mode: `pnpm dev`
5. In a separate terminal, start n8n: `pnpm run dev:n8n`

### Alternative: System Environment Variables

You can also set environment variables manually if preferred:
- Set `N8N_CUSTOM_EXTENSIONS` to the `/dist` directory of this repository
- Set `N8N_DEV_RELOAD` to `true`
- Run `pnpm run dev` and `n8n start` separately

You should now be able to search for and use the Brave Search node in your n8n workflows.

### First-Time Setup Notes

> **Important:** When launching n8n locally for the first time, the startup process may take 1-2 minutes to initialize. Wait for the "Editor is now accessible via web browser" message in the terminal before opening your browser.
> 
> On first access to http://localhost:5678, you'll be prompted to create an admin user account for your local n8n instance. 
> 
> **Remember:** You'll need to configure your Brave Search API credentials in the n8n interface before the node will function. See the [Credentials](#credentials) section above for API key information.
> 
> If you encounter issues or need to start fresh, you can reset n8n to its initial state by running `n8n user-management:reset`.
