/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
import { initRouters } from './domain';
import { mapError } from '@lib/errors/map-error';

const app: express.Application = express();

app.use(express.json());
app.use(cors());
void initRouters(app);

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message, error } = mapError(err);
  res.status(status).json({ status, message, error });
};

app.use(handleErrors);

export { app };
export default app;
