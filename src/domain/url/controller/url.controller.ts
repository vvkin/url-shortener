import { NextFunction, Request, Response } from 'express';
import { UrlService } from '../service/url.service';

class UrlController {
  constructor(private urlService: UrlService) {}

  async postLongUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { longUrl } = req.body;
    try {
      const urlMapping = await this.urlService.createShortUrl(longUrl);
      res.status(200).send(urlMapping);
    } catch (err) {
      next(err);
    }
  }

  async redirectByShortUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { shortUrl } = req.params;
    try {
      const longUrl = await this.urlService.getLongUrl(shortUrl);
      res.status(301).redirect(longUrl);
    } catch (err) {
      next(err);
    }
  }
}

export { UrlController };
