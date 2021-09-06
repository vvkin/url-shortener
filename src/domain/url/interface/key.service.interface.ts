export interface IKeyService {
  getRandomKey(keyLength: number): Promise<string>;
}
