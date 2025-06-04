export interface ApiResponse {
	type: 'spellcheck';
	query: Query;
	results: SpellCheckResult[];
}

export interface Query {
	original: string;
}

export interface SpellCheckResult {
	query: string;
}
