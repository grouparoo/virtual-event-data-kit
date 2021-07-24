import Redis from "ioredis";

export function getRedisClient(): Redis.Redis {
  const url = process.env.REDIS_URL || "";
  if (!url) {
    throw new Error("REDIS_URL env variable not set.");
  }
  const protocol = url.split(":")[0].toLowerCase();
  const options = {
    tls: protocol === "rediss" ? { rejectUnauthorized: false } : undefined,
  };
  return new Redis(process.env.REDIS_URL, options);
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
