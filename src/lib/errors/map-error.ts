import { EntityConflict, EntityNotFound } from './abstract-errors';
import {
  HttpError,
  HttpNotFound,
  HttpConflict,
  HttpInternal,
} from './http-errors';

type ErrorMap = Map<string, typeof HttpError>;

const errorMap: ErrorMap = new Map([
  [EntityNotFound.name, HttpNotFound],
  [EntityConflict.name, HttpConflict],
]);

const mapError = (error: Error): HttpError => {
  if (!(error instanceof HttpError)) {
    const { name, message } = error;
    return new (errorMap.get(name) || HttpInternal)(message);
  } else return error;
};

export { mapError };
