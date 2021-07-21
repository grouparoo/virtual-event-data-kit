import { getRedisClient } from "./redis";

export async function cmd(argsv: { [key: string]: any }) {
  const redis = getRedisClient();
}
