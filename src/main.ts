import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config';
import * as path from 'path';
import * as YAML from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import { logger } from './common/logger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from './common/processOnErrorHandlers';
import { HttpLoggingInterceptor } from './interceptors/http-logging.interceptor';
import { ValidationException } from './common/validation-exception';

async function bootstrap() {
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
      exceptionFactory: (errors) => {
        return new ValidationException(errors);
      },
    })
  );

  app.useGlobalInterceptors(new HttpLoggingInterceptor());

  config.USE_FASTIFY === 'true'
    ? await app.listen(config.PORT, '0.0.0.0', () => {
        logger.debug(`Started by fastify on ${config.PORT} port`);
      })
    : await app.listen(config.PORT, () => {
        logger.debug(`Started by express on ${config.PORT} port`);
      });
}

uncaughtExceptionHandler();
bootstrap();
unhandledRejectionHandler();
