import { Injectable, NestMiddleware } from '@nestjs/common';
import { loggingMiddleware } from './http-logging.middleware';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    loggingMiddleware(req, res, (err) => {
      console.log(err);
    });
    next();
  }
}
