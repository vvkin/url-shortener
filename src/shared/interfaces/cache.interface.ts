import { createClient } from 'redis';

export type ICacheClient = ReturnType<typeof createClient>;
