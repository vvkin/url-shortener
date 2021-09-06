import { Application } from 'express';

abstract class BaseRouter {
  protected readonly app: Application;
  protected readonly name: string;

  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
    this.registerRoutes();
  }

  protected abstract registerRoutes(): Application;
}

export { BaseRouter };
