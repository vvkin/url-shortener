import { Options } from 'sequelize/types';

export interface DatabaseConfig {
  database: string;
  username: string;
  password: string;
  options: Options;
}
