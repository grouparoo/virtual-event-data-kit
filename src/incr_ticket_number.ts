import { getRedisClient } from "./redis";

export async function cmd(argsv: { [key: string]: string }) {
  const redis = getRedisClient();
  const some = 1000 + Math.round(Math.random() * 200);
  const now = await redis.incrby("count", some);
  console.log(`incremented by ${some} -- now: ${now}`);
}
