import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../common/logger';

export class CustomError extends Error {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    logger.error(`Status code: ${err.statusCode}.`, err);
    res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    logger.error(`Status code: 500. Internal Server Error.`, err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Internal Server Error',
      message: err.message,
    });
  }
  next();
};
