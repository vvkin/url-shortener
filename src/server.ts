import { createServer } from 'http';
import { app } from './app';
import { config, SERVER_CONFIG } from '@config/config';

const { port, host } = config[SERVER_CONFIG];

const server = createServer(app);

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});
