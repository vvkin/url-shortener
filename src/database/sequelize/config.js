'use strict';

const config = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const options = {
  host: process.env.DB_HOST,
  dialect: 'mysql',
};

const exportConfig = { ...config, options };
const sequelizeConfig = { ...config, ...options };

module.exports = {
  dbConfig: exportConfig,
  production: sequelizeConfig,
  development: sequelizeConfig,
};
