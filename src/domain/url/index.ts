import { Application } from 'express';
import { URLS_CONFIG, config } from '@config/config';
import { cacheClient } from '@database/index';
import { BaseRouter } from '@shared/abstract/router.base';
import { UrlModel } from '@models/url.model';
import { UrlService } from './service/url.service';
import { UrlController } from './controller/url.controller';
import { KeyService } from './service/key.service';
import { validateAlias, validateUrl } from './middleware/url.middleware';

const { aliasLength, expiresIn, creationAttempts, alphabet } =
  config[URLS_CONFIG];

class UrlRouter extends BaseRouter {
  constructor(app: Application) {
    super(app, 'urlRouter');
  }

  protected registerRoutes(): Application {
    const keyService = new KeyService(alphabet);
    const urlController = new UrlController(
      new UrlService(
        UrlModel,
        cacheClient,
        keyService,
        aliasLength,
        expiresIn,
        creationAttempts
      )
    );

    this.app.post(
      '/',
      validateUrl,
      urlController.createAlias.bind(urlController)
    );

    this.app.get(
      '/:alias',
      validateAlias,
      urlController.redirectByAlias.bind(urlController)
    );

    return this.app;
  }
}

export { UrlRouter };
