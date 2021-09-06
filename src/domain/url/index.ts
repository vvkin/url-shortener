import { Application } from 'express';
import { BaseRouter } from '@shared/abstract/router.base';
import { UrlService } from './service/url.service';
import { UrlController } from './controller/url.controller';
import { UrlModel } from '@models/url.model';

class UrlRouter extends BaseRouter {
  constructor(app: Application) {
    super(app, 'urlRoutes');
  }

  protected registerRoutes(): Application {
    const urlService = new UrlService(UrlModel);
    const urlController = new UrlController(urlService);
    this.app.get('/', urlController.get);
    return this.app;
  }
}

export { UrlRouter };
