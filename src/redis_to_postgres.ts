import { getRedisClient, scanKeys } from "./redis";
import { initializeDatabase, Registrant } from "./database";
import Redis from "ioredis";

export async function cmd(argsv: { [key: string]: string }) {
  const syncer = new Syncer(argsv);
  await syncer.init();
  console.log("connected");
  await syncer.registrants();
  console.log("done");
}

class Syncer {
  redis: Redis.Redis;
  constructor(argsv: { [key: string]: string }) {
    this.redis = getRedisClient();
  }
  async init() {
    await initializeDatabase();
  }

  async processRegistrant(key: string) {
    try {
      console.log("registrant", key);
      const id = key.split(":")[1];
      if (!id) {
        throw new Error(`Unknown registrant key: ${key}`);
      }
      const data: any[] = await this.redis.hmget(
        key,
        "ticketNumber",
        "email",
        "name",
        "username",
        "createdAt"
      );
      const [found] = await Registrant.findOrBuild({ where: { id } });
      found.ticketNumber = parseInt(data[0], 10);
      found.email = data[1];
      found.name = data[2];
      found.username = data[3];
      found.createdAt = new Date(parseInt(data[4], 10));
      await found.save();
    } catch (err: any) {
      console.error(`Error saving registrant (${key}): ${err?.message}`);
    }
  }
  async registrants() {
    await scanKeys(this.redis, "id:*", this.processRegistrant.bind(this));
  }
}
