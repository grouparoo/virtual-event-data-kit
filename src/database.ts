import { migrateUp } from "./migrate";
import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL)
  : null;

class Registrant extends Model {}

export async function initializeDatabase() {
  if (!sequelize) {
    throw new Error("DATABASE_URL env variable not set.");
  }
  await sequelize.authenticate();
  await migrateUp(sequelize);

  Registrant.init(
    {
      id: {
        type: DataTypes.STRING(191),
        primaryKey: true,
      },
      ticketNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Registrant",
      tableName: "registrants",
    }
  );
}

export { Registrant };
