import * as express from 'express';
import * as cors from 'cors';
import { initRouters } from './domain';

const app: express.Application = express();

app.use(express.json());
app.use(cors());
void initRouters(app);

export { app };
export default app;
