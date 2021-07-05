import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export const level = (): 'debug' | 'warn' => {
  const env = process.env['NODE_ENV'] || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => {
    return `${info['timestamp']} ${info.level}: ${info.message}`;
  })
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({
        all: true,
      })
    ),
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: winston.format.splat(),
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
];

const transportOnlyConsole = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({
        all: true,
      })
    ),
  }),
];

export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export const processOnLogger = winston.createLogger({
  level: 'error',
  levels,
  format,
  transports: transportOnlyConsole,
});
