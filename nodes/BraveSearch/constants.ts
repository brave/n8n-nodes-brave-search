export const API_BASE_URL = 'https://api.search.brave.com/res/v1';

export function resolveBaseUrl(value: unknown, fallback: string): string {
	const trimmed = typeof value === 'string' ? value.trim() : '';
	return (trimmed || fallback).replace(/\/+$/, '');
}
