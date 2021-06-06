import { NextFunction, Request, RequestHandler, Response } from 'express';

export const routeWrapper = (handler: RequestHandler) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
};
