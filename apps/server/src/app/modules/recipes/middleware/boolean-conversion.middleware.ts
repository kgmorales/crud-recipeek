import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class BooleanConversionMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = req.query as any;

    for (const key in query) {
      if (query[key] === 'true') {
        query[key] = true;
      } else if (query[key] === 'false') {
        query[key] = false;
      } else if (!isNaN(query[key])) {
        query[key] = parseInt(query[key]);
      }
    }

    next();
  }
}
