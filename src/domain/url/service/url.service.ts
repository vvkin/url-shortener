import { UrlModel } from '@models/url.model';
import { KeyService } from './key.service';

class UrlService {
  constructor(
    private urlModel: typeof UrlModel,
    private keyService: KeyService,
    private shortUrlLength: number,
    private expiresIn: number
  ) {}

  private getExpiresTime(date: Date): Date {
    const tempDate = new Date(date);
    tempDate.setDate(date.getDate() + this.expiresIn);
    return tempDate;
  }

  async createShortUrl(longUrl: string): Promise<UrlModel> {
    const shortUrl = await this.keyService.getRandomKey(this.shortUrlLength);
    const expiresAt = this.getExpiresTime(new Date());
    try {
      const attributes = { shortUrl, longUrl, expiresAt };
      const record = await this.urlModel.create(attributes);
      return record.toJSON() as UrlModel;
    } catch (err) {
      return this.createShortUrl(longUrl);
    }
  }
}

export { UrlService };
