import Umzug from 'umzug';
import db from '../server/models/index.js';

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: db.sequelize // here should be a sequelize instance, not the Sequelize module
  },
  migrations: {
    params: [
      db.sequelize.getQueryInterface(),
      db.Sequelize // Sequelize constructor - the required module
    ],
    path: './server/migrations',
    pattern: /\.js$/
  }
});

export default umzug;