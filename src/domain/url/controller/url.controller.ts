import { Request, Response } from 'express';
import { UrlService } from '../service/url.service';

class UrlController {
  constructor(private urlService: UrlService) {}

  async postLongUrl(req: Request, res: Response): Promise<void> {
    const { longUrl } = req.body;
    const urlMapping = await this.urlService.createShortUrl(longUrl);
    res.status(200).send(urlMapping);
  }
}

export { UrlController };
