import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config';
import * as path from 'path';
import * as YAML from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { logger } from './common/logger';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import {
  AllExceptionsFilter,
  ValidationException,
} from './middlewares/error-logging.middleware';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from './common/processOnErrorHandlers';

async function bootstrap() {
  console.log(config.USE_FASTIFY);
  const app =
    config.USE_FASTIFY === 'true'
      ? await NestFactory.create<NestFastifyApplication>(
          AppModule,
          new FastifyAdapter()
        )
      : await NestFactory.create(AppModule);

  const document = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, document);
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors.map((error) => {
          return `${error.property} has wrong value ${error.value}, ${
            error.constraints ? Object.values(error.constraints) : ''
          }`;
        });
        return new ValidationException(message);
      },
    })
  );
  //app.useGlobalPipes(new ValidationPipe());
  config.USE_FASTIFY === 'true'
    ? await app.listen(config.PORT, '0.0.0.0', () => {
        logger.debug(`Started by fastify on ${config.PORT} port`);
      })
    : await app.listen(config.PORT, () => {
        logger.debug(`Started by express on ${config.PORT} port`);
      });

  // if (config.USE_FASTIFY) {
  //   await app.listen(config.PORT, '0.0.0.0', () => {
  //     logger.debug(`Started by fastify on ${config.PORT} port`);
  //   });
  // } else {
  //   await app.listen(config.PORT, () => {
  //     logger.debug(`Started by express on ${config.PORT} port`);
  //   });
  // }
}
// process.on('uncaughtException', (error) => {
//   logger.error('uncaught exception', error);
// });
uncaughtExceptionHandler();
bootstrap();
unhandledRejectionHandler();
