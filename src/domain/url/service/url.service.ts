import { UrlAttributes, UrlModel } from '@models/url.model';
import { UrlDto } from '@shared/dto/url.dto';
import { EntityNotFound } from '@src/lib/errors/abstract-errors';
import { UniqueConstraintError } from 'sequelize';
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

  private isOperationalError(err: Error): boolean {
    return err instanceof UniqueConstraintError;
  }

  private async tryToInsert(attributes: UrlAttributes): Promise<UrlDto> {
    try {
      const record = await this.urlModel.create(attributes);
      return record;
    } catch (err) {
      if (this.isOperationalError(err as Error)) {
        return this.createShortUrl(attributes.longUrl);
      } else throw new Error('Internal server error');
    }
  }

  async createShortUrl(longUrl: string): Promise<UrlDto> {
    const shortUrl = await this.keyService.getRandomKey(this.shortUrlLength);
    const expiresAt = this.getExpiresTime(new Date());
    const attributes = { shortUrl, longUrl, expiresAt };
    return this.tryToInsert(attributes);
  }

  async getLongUrl(shortUrl: string): Promise<string> {
    const record: UrlDto | null = await this.urlModel.findByPk(shortUrl);
    if (record) {
      return record.longUrl;
    } else throw new EntityNotFound('Link is invalid or expired!');
  }
}

export { UrlService };
