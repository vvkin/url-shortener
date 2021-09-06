import { createClient } from 'redis';
import { config, CACHE_CONFIG } from '@config/config';

const options = config[CACHE_CONFIG];

const cacheClient = createClient(options);

export { cacheClient };
