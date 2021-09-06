import { UrlModel } from '@models/url.model';

class UrlService {
  constructor(private urlModel: typeof UrlModel) {}
}

export { UrlService };
