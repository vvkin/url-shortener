class KeyService {
  constructor(private alphabet: string) {}

  async getRandomKey(keyLength: number): Promise<string> {
    const randomChars: string[] = [];
    const { length } = this.alphabet;

    for (let i = 0; i < keyLength; ++i) {
      const index = Math.round(Math.random() * length);
      const char = this.alphabet[index];
      randomChars.push(char);
    }

    return randomChars.join('');
  }
}

export { KeyService };
