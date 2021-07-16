import { processOnLogger } from './logger';
import * as fs from 'fs';

const getErrorTemplate = (error: Error, errorType: string): void => {
  const date = `${new Date().toJSON().split('T')[0]} ${new Date()
    .toJSON()
    .split('T')[1]
    ?.replace('Z', '')}`;

  const errorTxt = `${date} ${errorType}: ${error.stack} \n`;

  processOnLogger.error(`${errorType}: ${error.stack}`);

  fs.appendFileSync(__dirname + '/../../logs/error.log', errorTxt);
  fs.appendFileSync(__dirname + '/../../logs/all.log', errorTxt);
  process.exit(1);
};

export const uncaughtExceptionHandler = (): void => {
  process.on('uncaughtException', (error) => {
    getErrorTemplate(error, 'uncaughtException');
  });
};

export const unhandledRejectionHandler = (): void => {
  process.on('unhandledRejection', (error: Error) => {
    getErrorTemplate(error, 'unhandledRejection');
  });
};
