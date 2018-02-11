export default {
  development: {
    username: 'ozimos',
    password: 'l7bz4ZJRmZNPicPIHYpo',
    database: 'events_manager_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'ozimos',
    password: 'l7bz4ZJRmZNPicPIHYpo',
    database: 'events_manager_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres'
  }
};
