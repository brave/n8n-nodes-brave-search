/**
 * The LLM Context endpoint accepts the same country and language codes
 * as the standard Web Search endpoint, so we re-export them from there
 * to keep a single source of truth.
 *
 * @see https://api-dashboard.search.brave.com/api-reference/summarizer/llm_context/get
 */
export { CountryCodes, LanguageCodes } from '../web/data';
