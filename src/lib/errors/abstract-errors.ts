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

export { AbstractError, EntityNotFound, EntityConflict };
