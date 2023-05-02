import { Headers } from 'request';

export const paprikaBaseHeaders: Headers = {
  Host: 'www.paprikaapp.com',
  Accept: '*/*',
  'Accept-Language': 'en-US;q=1.0',
  Connection: 'keep-alive',
  'Accept-Encoding': 'br;q=1.0, gzip;q=0.9, deflate;q=0.8',
};
