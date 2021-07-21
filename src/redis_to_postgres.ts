import { getRedisClient } from "./redis";
import { initializeDatabase } from "./sequelize";

export async function cmd(argsv: { [key: string]: any }) {
  await initializeDatabase();
  const redis = getRedisClient();
  console.log("connected");
}
