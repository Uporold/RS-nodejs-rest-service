import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  ExceptionFilter,
} from '@nestjs/common';
import { logger } from '../common/logger';
// import { BaseExceptionFilter } from '@nestjs/core';

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: string[]) {
    super();
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof ValidationException) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        validationErrors: exception.validationErrors,
      });
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    logger.error(exception.stack);

    response.status(status).json({
      statusCode: status,
      message: exception.message || 'Internal server error',
    });
  }
}

// import {
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
//   BadRequestException,
// } from '@nestjs/common';
// import { logger } from '../common/logger';
// import { BaseExceptionFilter } from '@nestjs/core';
//
// export class ValidationException extends BadRequestException {
//   constructor(public validationErrors: string[]) {
//     super();
//   }
// }
//
// @Catch()
// export class AllExceptionsFilter extends BaseExceptionFilter {
//   catch(exception: Error, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//
//     if (exception instanceof ValidationException) {
//       return response.status(HttpStatus.BAD_REQUEST).json({
//         statusCode: HttpStatus.BAD_REQUEST,
//         validationErrors: exception.validationErrors,
//       });
//     }
//
//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;
//
//     logger.error(exception.stack);
//
//     response.status(status).json({
//       statusCode: status,
//       message: exception.message || 'Internal server error',
//     });
//   }
// }
