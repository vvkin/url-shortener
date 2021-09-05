import * as express from 'express';
import * as cors from 'cors';

const app: express.Application = express();

app.use(express.json());
app.use(cors());

export { app };
export default app;
