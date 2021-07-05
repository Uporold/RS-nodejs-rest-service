import { processOnLogger } from './logger';
import * as fs from 'fs';

const getErrorTemplate = (error: Error): void => {
  const errorTxt = `${new Date().toDateString()} error: ${error.stack} \n`;
  processOnLogger.error(error.stack);
  fs.appendFileSync(__dirname + '/../../logs/error.log', errorTxt);
  fs.appendFileSync(__dirname + '/../../logs/all.log', errorTxt);
  process.exit(1);
};

export const uncaughtExceptionHandler = (): void => {
  process.on('uncaughtException', (error) => {
    getErrorTemplate(error);
  });
};

export const unhandledRejectionHandler = (): void => {
  process.on('unhandledRejection', (error: Error) => {
    getErrorTemplate(error);
  });
};
