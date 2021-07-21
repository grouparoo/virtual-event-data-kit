import { migrateUp } from "./migrate";
import { Sequelize } from "sequelize";

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL)
  : undefined;

export async function initializeDatabase() {
  if (!sequelize) {
    throw new Error("DATABASE_URL env variable not set.");
  }
  await sequelize.authenticate();
  await migrateUp(sequelize);
}
