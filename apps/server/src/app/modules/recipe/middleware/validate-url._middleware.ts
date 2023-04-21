import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateUrlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const url = req.query.url;
    if (!url) {
      res.status(400).send('Missing URL parameter');
      return;
    }

    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator

    if (!pattern.test(url as string)) {
      res.status(400).send('Invalid URL parameter');
      return;
    }

    next();
  }
}
