import { createClient } from 'redis';
import { config, CACHE_CONFIG } from '@config/config';

const options = config[CACHE_CONFIG];

const cache = createClient(options);

export { cache };
