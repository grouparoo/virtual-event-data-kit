import { QueryInterface } from "sequelize";
export default {
  up: async function (migration: QueryInterface, DataTypes: any) {
    await migration.sequelize.transaction(async () => {
      await migration.createTable("registrants", {
        ticketNumber: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },

        email: {
          type: DataTypes.STRING(191),
          allowNull: false,
        },

        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
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
