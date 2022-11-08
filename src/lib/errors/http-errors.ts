import { STATUS_CODES } from 'http';

class HttpError extends Error {
  public status: number;
  public error: string;

  constructor(message = 'Internal Server Error', status = 500) {
    super(message);
    this.name = new.target.name;
    this.status = status;
    this.error = STATUS_CODES[status] || message;
  }
}

class HttpBadRequest extends HttpError {
  constructor(message: string) {
    super(message, 400);
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

class HttpInternal extends HttpError {
  constructor(message?: string) {
    super(message);
  }
}

export { HttpError, HttpBadRequest, HttpNotFound, HttpConflict, HttpInternal };
