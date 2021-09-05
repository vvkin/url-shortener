FROM redis:6.2-alpine AS base
COPY docker/redis/redis.conf /usr/local/etc/redis/redis.conf
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
