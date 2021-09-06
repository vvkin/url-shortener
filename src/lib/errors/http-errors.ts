import { STATUS_CODES } from 'http';

class HttpError extends Error {
  public name: string;
  public status: number;

  constructor(message: string, status: number) {
    super(message || STATUS_CODES[status]);
    this.name = new.target.name;
    this.status = status;
  }
}

class HttpNotFound extends HttpError {
  constructor(message: string) {
    super(message, 404);
  }
}

class HttpConflict extends HttpError {
  constructor(message: string) {
    super(message, 409);
  }
}

export { HttpNotFound, HttpConflict };
