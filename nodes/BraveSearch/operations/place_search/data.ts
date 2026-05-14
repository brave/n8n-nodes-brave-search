/**
 * The Place Search endpoint accepts the same country and language codes
 * as the standard Web Search endpoint, so we re-export them from there
 * to keep a single source of truth.
 *
 * @see https://api-dashboard.search.brave.com/api-reference/web/place_search
 */
export { CountryCodes, LanguageCodes, MarketCodes } from '../web/data';
