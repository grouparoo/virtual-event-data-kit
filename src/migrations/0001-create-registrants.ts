import { QueryInterface } from "sequelize";
export default {
  up: async function (migration: QueryInterface, DataTypes: any) {
    await migration.sequelize.transaction(async () => {
      await migration.createTable("registrants", {
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
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      });
    });
  },

  down: async function (migration: QueryInterface) {
    await migration.sequelize.transaction(async () => {
      await migration.dropTable("registrants");
    });
  },
};
