import { type IRequest, type IResponse } from '../common/types';
import { type MiddlewareNext } from 'hyper-express';
import { ForbiddenException } from '../exceptions/ForbiddenException';

export const authGuard = (_: IRequest, res: IResponse, next: MiddlewareNext): void => {
  const userId = res.locals.userId;

  if (!userId) {
    next(new ForbiddenException('Unauthorized'));
    return;
  }

  next();
};
