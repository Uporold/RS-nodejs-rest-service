import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { logger } from '../common/logger';
import { ValidationException } from '../common/validation-exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof ValidationException) {
      const body = {
        statusCode: HttpStatus.BAD_REQUEST,
        validationErrors: exception.getMessage().split('\n'),
      };
      return process.env['USE_FASTIFY'] === 'true'
        ? response.code(HttpStatus.BAD_REQUEST).send(body)
        : response.status(HttpStatus.BAD_REQUEST).json(body);
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    logger.error(exception.stack);

    const body = {
      statusCode: status,
      message: exception.message || 'Internal server error',
    };
    process.env['USE_FASTIFY'] === 'true'
      ? response.code(status).send(body)
      : response.status(status).json(body);
  }
}
