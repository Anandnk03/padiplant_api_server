const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    dateStrings: false,
    timezone: process.env.TIMEZONE,
    logging: false,
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
