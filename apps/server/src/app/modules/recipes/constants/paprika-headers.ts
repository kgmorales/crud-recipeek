import { Headers } from 'request';

export const paprikaBaseHeaders: Headers = {
  Host: 'www.paprikaapp.com',
  Accept: '*/*',
  Connection: 'keep-alive',
  'Accept-Language': 'en-US;q=1.0',
  'Accept-Encoding': 'br;q=1.0, gzip;q=0.9, deflate;q=0.8',
  'User-Agent':
    'Paprika Recipe Manager 3/3.7.2 (com.hindsightlabs.paprika.mac.v3; build:36; macOS 13.3.1) Alamofire/5.2.2',
};
