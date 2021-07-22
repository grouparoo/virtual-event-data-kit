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

interface Processor {
  (key: string): Promise<void>;
}
export async function scanKeys(
  redis: Redis.Redis,
  pattern: string,
  processor: Processor
) {
  return new Promise((resolve, reject) => {
    const stream = redis.scanStream({ match: pattern });
    let count = 0;
    stream.on("data", (resultKeys) => {
      // `resultKeys` is an array of strings representing key names.
      // Note that resultKeys may contain 0 keys, and that it will sometimes
      // contain duplicates due to SCAN's implementation in Redis.
      stream.pause();
      Promise.all(resultKeys.map(processor)).then(() => {
        // Resume the stream here.
        count += resultKeys.length;
        stream.resume();
      });
    });
    stream.on("end", () => {
      resolve(count);
    });
  });
}
