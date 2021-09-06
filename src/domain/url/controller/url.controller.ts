import { NextFunction, Request, Response } from 'express';
import { IUrlService } from '../interface/url.service.interface';

class UrlController {
  constructor(private urlService: IUrlService) {}

  async createAlias(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { url } = req.body;
    try {
      const urlMapping = await this.urlService.createAlias(url);
      res.status(200).send(urlMapping);
    } catch (err) {
      next(err);
    }
  }

  async redirectByAlias(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { alias } = req.params;
    try {
      const url = await this.urlService.getUrl(alias);
      res.status(301).redirect(url);
    } catch (err) {
      next(err);
    }
  }
}

export { UrlController };
