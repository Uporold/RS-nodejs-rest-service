import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from './error';
import { UserEntity } from '../resources/users/user.entity';
import { config } from '../common/config';

interface JwtPayload {
  userId: string;
  login: string;
  token: string;
}

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const type = req.headers.authorization?.split(' ')[0];
  const sessionToken = req.headers.authorization?.split(' ')[1];
  if (!sessionToken || type !== 'Bearer')
    next(new CustomError(StatusCodes.UNAUTHORIZED, 'No token provided'));
  else {
    try {
      const decoded = jwt.verify(
        sessionToken,
        config.JWT_SECRET_KEY
      ) as JwtPayload;
      const user = await UserEntity.findOne({ where: { id: decoded.userId } });
      if (user) next();
      else {
        next(
          new CustomError(
            StatusCodes.UNAUTHORIZED,
            'Wrong token provided (No user)'
          )
        );
      }
    } catch (err) {
      next(new CustomError(StatusCodes.UNAUTHORIZED, 'Wrong token provided'));
    }
  }
};
