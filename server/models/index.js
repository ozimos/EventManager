import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configs from '../config/config.js';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
// Test the connection
/* eslint no-console: off */
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => console.error('Unable to connect to the database:', err));

// Load Models
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Associate Models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync();
// This will run .sync() only if database name ends with '_test'
// db.sequelize.sync({ force: true, match: /_test$/ });

export default db;
