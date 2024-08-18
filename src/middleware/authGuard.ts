import { type IRequest, type IResponse } from '../common/types';
import { type MiddlewareNext } from 'hyper-express';
import { UnauthorizedException } from '../exceptions/UnauthorizedException.ts';

export const authGuard = (_: IRequest, res: IResponse, next: MiddlewareNext): void => {
  const userId = res.locals.userId;

  if (!userId) {
    next(new UnauthorizedException('Unauthorized'));
    return;
  }

  next();
};
