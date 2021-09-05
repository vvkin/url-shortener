import { createServer } from 'http';
import { Application } from 'express';
import { app } from './app';
import { sequelize } from '@database/index';
import { cache } from '@database/index';
import { config, SERVER_CONFIG } from '@config/config';

const { port, host } = config[SERVER_CONFIG];

const bootstrap = async (app: Application) => {
  const server = createServer(app);
  try {
    await sequelize.authenticate();
    await cache.connect();
    server.listen(port, host, () => {
      console.log(`Server started on http://${host}:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

bootstrap(app);
