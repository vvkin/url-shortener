import { UrlDto } from '@shared/dto/url.dto';

export interface IUrlService {
  getUrl(alias: string): Promise<string>;
  createAlias(url: string): Promise<UrlDto>;
  deleteAlias(alias: string): Promise<void>;
}
