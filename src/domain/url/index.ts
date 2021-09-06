import { Application } from 'express';
import { URLS_CONFIG, config } from '@config/config';
import { BaseRouter } from '@shared/abstract/router.base';
import { UrlModel } from '@models/url.model';
import { UrlService } from './service/url.service';
import { UrlController } from './controller/url.controller';
import { KeyService } from './service/key.service';

const { alphabet, shortUrlLength, expiresIn } = config[URLS_CONFIG];

class UrlRouter extends BaseRouter {
  constructor(app: Application) {
    super(app, 'urlRoutes');
  }

  protected registerRoutes(): Application {
    const keyService = new KeyService(alphabet);
    const urlController = new UrlController(
      new UrlService(UrlModel, keyService, shortUrlLength, expiresIn)
    );
    this.app.post('/', urlController.createAlias.bind(urlController));
    this.app.get('/:alias', urlController.redirectByAlias.bind(urlController));
    return this.app;
  }
}

export { UrlRouter };
