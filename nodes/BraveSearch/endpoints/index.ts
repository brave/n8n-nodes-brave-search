import web from './web';
import news from './news';
import images from './images';
import videos from './videos';

import type { BraveEndpoint } from './baseEndpoint';

const ENDPOINTS: BraveEndpoint[] = [web, news, images, videos];
const ENDPOINT_MAP = Object.fromEntries(ENDPOINTS.map((e) => [e.KEY, e]));

export { ENDPOINTS, ENDPOINT_MAP };
