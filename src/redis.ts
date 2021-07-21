import Redis from "ioredis";

const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : undefined;

export function getRedisClient(): Redis.Redis {
  if (!redis) {
    throw new Error("REDIS_URL env variable not set.");
  }
  return redis;
}
