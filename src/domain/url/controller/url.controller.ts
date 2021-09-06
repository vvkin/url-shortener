import { Request, Response } from 'express';
import { UrlService } from '../service/url.service';

class UrlController {
  constructor(private urlService: UrlService) {}

  async get(req: Request, res: Response): Promise<void> {
    res.status(200).json({ hello: 'world' });
  }
}

export { UrlController };
