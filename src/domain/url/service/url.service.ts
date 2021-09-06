import { addDays, dateExpired } from '@lib/utils/date';
import { EntityConflict, EntityNotFound } from '@lib/errors/abstract-errors';
import { UrlDto } from '@shared/dto/url.dto';
import { ICacheClient } from '@shared/interfaces/cache.interface';
import { IKeyService, IUrlModel, IUrlService } from '../interface';

class UrlService implements IUrlService {
  constructor(
    private urlModel: IUrlModel,
    private cacheClient: ICacheClient,
    private keyService: IKeyService,
    private shortUrlLength: number,
    private expiresIn: number,
    private creationAttempts: number
  ) {}

  private async findInDatabase(alias: string): Promise<string | undefined> {
    const record = await this.urlModel.findByPk(alias);
    if (record) {
      if (!dateExpired(record.expiresAt)) {
        const { url } = record;
        await this.cacheClient.set(alias, url);
        return url;
      } else await this.deleteAlias(alias);
    }
  }

  private async findUrl(alias: string): Promise<string | undefined> {
    return (await this.cacheClient.get(alias)) ?? this.findInDatabase(alias);
  }

  private async deleteAlias(alias: string): Promise<void> {
    this.urlModel.destroy({ where: { alias } });
  }

  async getUrl(alias: string): Promise<string> {
    const url = await this.findUrl(alias);
    if (!url) {
      throw new EntityNotFound('Alias is invalid or has expired');
    } else return url;
  }

  async createAlias(url: string): Promise<UrlDto> {
    const expiresAt = addDays(new Date(), this.expiresIn);
    for (let i = 0; i < this.creationAttempts; ++i) {
      const alias = await this.keyService.getRandomKey(this.shortUrlLength);
      const attributes = { alias, url, expiresAt };
      const instance = this.urlModel.build(attributes);
      const record = await instance.tryToSave();
      if (record) return record;
    }
    throw new EntityConflict('Unable to create link alias');
  }
}

export { UrlService };
