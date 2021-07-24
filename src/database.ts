import { migrateUp } from "./migrate";
import { Sequelize } from "sequelize";
import { initRegistrant, Registrant } from "./registrant";

export async function initializeDatabase() {
  const url = process.env.DATABASE_URL || "";
  if (!url) {
    throw new Error("DATABASE_URL env variable not set.");
  }
  let sequelize = new Sequelize(url);
  try {
    await sequelize.authenticate();
  } catch (err) {
    if (err.message.indexOf("SSL") >= 0) {
      sequelize = new Sequelize(url, {
        dialectOptions: {
          ssl: { rejectUnauthorized: false },
        },
      });
      try {
        await sequelize.authenticate();
      } catch (err2) {
        console.log("ssl error too", err2.message);
        throw err; // throw the original error
      }
    }
  }
  await migrateUp(sequelize);
  initRegistrant(sequelize);
}

export { Registrant };
