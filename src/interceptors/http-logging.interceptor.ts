import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { httpLoggingMiddleware } from '../middlewares/http-logging.middleware';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    httpLoggingMiddleware(request, response, (err) => {
      if (err) {
        throw new Error(err.stack);
      }
    });

    return next.handle();
  }
}
