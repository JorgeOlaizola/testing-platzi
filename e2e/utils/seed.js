const sequelize = require('./../../src/db/sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const umzug = new Umzug({
  migrations: { glob: './src/db/seeders/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined,
});

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true });
    await umzug.up();
  } catch (error) {
    console.log(error);
  }
};

const downSeed = async () => {
  await sequelize.drop(); // Dropping tables
};

module.exports = { upSeed, downSeed };
