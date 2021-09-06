import { UrlDto } from '@shared/dto/url.dto';
import { addDays } from '@lib/utils/add-days';
import { EntityNotFound } from '@lib/errors/abstract-errors';
import { IKeyService, IUrlModel, IUrlService } from '../interface';

class UrlService implements IUrlService {
  constructor(
    private urlModel: IUrlModel,
    private keyService: IKeyService,
    private shortUrlLength: number,
    private expiresIn: number
  ) {}

  async getUrl(alias: string): Promise<string> {
    const record = await this.urlModel.findByPk(alias);
    if (record) {
      return record.url;
    } else throw new EntityNotFound('Alias is invalid or has expired!');
  }

  async createAlias(url: string): Promise<UrlDto> {
    const expiresAt = addDays(new Date(), this.expiresIn);
    while (true) {
      const alias = await this.keyService.getRandomKey(this.shortUrlLength);
      const attributes = { alias, url, expiresAt };
      const instance = this.urlModel.build(attributes);
      const record = await instance.tryToSave();
      if (record) return record;
    }
  }

  async deleteAlias(alias: string): Promise<void> {
    // TODO: Delete by pk
  }
}

export { UrlService };
