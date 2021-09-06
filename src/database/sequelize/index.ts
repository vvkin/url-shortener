import { Sequelize } from 'sequelize';
import { config, DATABASE_CONFIG } from '@config/config';

const { database, username, password, options } = config[DATABASE_CONFIG];

const sequelize = new Sequelize(database, username, password, options);

export { sequelize };
