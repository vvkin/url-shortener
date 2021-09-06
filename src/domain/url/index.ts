import { Application } from 'express';
import { BaseRouter } from '@shared/abstract/router.base';
import { UrlService } from './service/url.service';
import { UrlController } from './controller/url.controller';
import { UrlModel } from '@models/url.model';
import { KeyService } from './service/key.service';

import { URLS_CONFIG, config } from '@config/config';

const { alphabet, shortUrlLength, expiresIn } = config[URLS_CONFIG];

class UrlRouter extends BaseRouter {
  constructor(app: Application) {
    super(app, 'urlRoutes');
  }

  protected registerRoutes(): Application {
    const keyService = new KeyService(alphabet);
    const urlService = new UrlService(
      UrlModel,
      keyService,
      shortUrlLength,
      expiresIn
    );
    const urlController = new UrlController(urlService);

    this.app.post('/', urlController.postLongUrl.bind(urlController));
    this.app.get(
      '/:shortUrl',
      urlController.redirectByShortUrl.bind(urlController)
    );
    return this.app;
  }
}

export { UrlRouter };
