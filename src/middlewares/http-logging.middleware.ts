import morgan, { StreamOptions } from 'morgan';
import { Request } from 'express';
import { logger } from '../common/logger';

morgan.token('query', (req: Request) => {
  return JSON.stringify({
    query: req.query,
  });
});

morgan.token('body', (req: Request) => {
  if (req.body && req.body.password) {
    delete req.body.password;
  }
  return JSON.stringify({
    body: req.body,
  });
});

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

export const httpLoggingMiddleware = morgan(
  ':method :url :status :query :body',
  {
    stream,
  }
);
