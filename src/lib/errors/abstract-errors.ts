class AbstractError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

class EntityNotFound extends AbstractError {
  constructor(message: string) {
    super(message);
  }
}

class EntityConflict extends AbstractError {
  constructor(message: string) {
    super(message);
  }
}

class InternalError extends AbstractError {
  constructor(message = 'Internal server error') {
    super(message);
  }
}

export { InternalError, EntityNotFound, EntityConflict };
