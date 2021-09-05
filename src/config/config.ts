import { CacheConfig } from './interfaces/cache.config';
import { DatabaseConfig } from './interfaces/database.config';
import { ServerConfig } from './interfaces/server.config';

export const SERVER_CONFIG = 'SERVER';
export const DATABASE_CONFIG = 'DATABASE';
export const CACHE_CONFIG = 'CACHE';

export const config = {
  [SERVER_CONFIG]: {
    port: process.env.PORT ?? 8080,
    host: process.env.HOST ?? '0.0.0.0',
  } as ServerConfig,
  [DATABASE_CONFIG]: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      host: process.env.DB_HOST,
      dialect: 'mysql',
    },
  } as DatabaseConfig,
  [CACHE_CONFIG]: {
    socket: {
      host: process.env.CACHE_HOST,
    },
  } as CacheConfig,
};
