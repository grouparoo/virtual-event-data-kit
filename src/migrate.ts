import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import path from "path";

export async function migrateUp(sequelize: Sequelize) {
  const migrator = getMigrator(sequelize);
  await migrator.up();
}

export async function migrateDown(sequelize: Sequelize) {
  const migrator = getMigrator(sequelize);
  await migrator.down();
}

function getMigrator(sequelize: Sequelize) {
  const dir = path.resolve(path.join(__dirname, "migrations"));
  const umzug = new Umzug({
    storage: new SequelizeStorage({ sequelize: sequelize }),
    migrations: {
      params: [sequelize.getQueryInterface(), sequelize.constructor],
      path: dir,
      pattern: /(\.js|\w{3,}\.ts)$/,
      nameFormatter: (filename) => path.parse(filename).name,
    },
    logging: console.log,
  });
  return umzug;
}
