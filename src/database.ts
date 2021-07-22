import { migrateUp } from "./migrate";
import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL)
  : null;

interface RegistrantAttributes {
  id: string | null;
  email: string | null;
  name: string | null;
  username: string | null;
  ticketNumber: number | null;
}
class Registrant
  extends Model<RegistrantAttributes>
  implements RegistrantAttributes
{
  public id!: string;
  public email!: string;
  public name!: string;
  public username!: string;
  public ticketNumber!: number;

  public createdAt!: Date;
  public updatedAt!: Date;
}

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
      },
      email: {
        type: DataTypes.STRING(191),
      },
      name: {
        type: DataTypes.STRING(191),
      },
      username: {
        type: DataTypes.STRING(191),
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
