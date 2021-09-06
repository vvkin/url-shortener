import { dbConfig } from '@database/sequelize/config';
import { CacheConfig } from './interfaces/cache.config';
import { DatabaseConfig } from './interfaces/database.config';
import { ServerConfig } from './interfaces/server.config';
import { UrlsConfig } from './interfaces/urls.config';

export const SERVER_CONFIG = 'SERVER';
export const DATABASE_CONFIG = 'DATABASE';
export const CACHE_CONFIG = 'CACHE';
export const URLS_CONFIG = 'URLS';

export const config = {
  [SERVER_CONFIG]: {
    port: process.env.PORT ?? 8080,
    host: process.env.HOST ?? '0.0.0.0',
  } as ServerConfig,
  [DATABASE_CONFIG]: dbConfig as DatabaseConfig,
  [CACHE_CONFIG]: {
    socket: {
      host: process.env.CACHE_HOST,
    },
  } as CacheConfig,
  [URLS_CONFIG]: {
    expiresIn: 1095, // 3 years
    shortUrlLength: 8,
    alphabet: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', // base62
  } as UrlsConfig,
};
