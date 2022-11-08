const BANNED_HOSTS = ['localhost']; // add URL after deploy here
const VALID_PROTOCOLS = ['http:', 'https:'];

const isValidProtocol = (url: string): boolean =>
  VALID_PROTOCOLS.some((protocol) => url.startsWith(protocol));

const isHostBanned = (host: string): boolean => BANNED_HOSTS.includes(host);

const isValidUrl = (url: string): boolean => {
  try {
    const instance = new URL(url);
    const { protocol, hostname } = instance;
    return isValidProtocol(protocol) && !isHostBanned(hostname);
  } catch (err) {
    return false;
  }
};

export { isValidUrl };
