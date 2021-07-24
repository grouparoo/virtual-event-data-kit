import { migrateUp } from "./migrate";
import { Sequelize, Options } from "sequelize";
import { initRegistrant, Registrant } from "./registrant";

export async function initializeDatabase() {
  const url = process.env.DATABASE_URL || "";
  if (!url) {
    throw new Error("DATABASE_URL env variable not set.");
  }
  const options: Options = {};
  if (process.env.DATABASE_SSL_SELF_SIGNED?.toLowerCase() === "true") {
    options.dialectOptions = {
      ssl: { rejectUnauthorized: false },
    };
  }

  let sequelize = new Sequelize(url, options);
  await sequelize.authenticate();
  await migrateUp(sequelize);
  initRegistrant(sequelize);
}

export { Registrant };
