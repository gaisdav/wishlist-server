import { type IRequest, type IResponse } from '../common/types';
import { type MiddlewareNext } from 'hyper-express';
import { ForbiddenException } from '../exceptions/ForbiddenException';

export const authGuard = async (_: IRequest, res: IResponse, next: MiddlewareNext): Promise<void> => {
  const user = res.locals.user;

  if (!user) {
    next(new ForbiddenException('Unauthorized'));
    return;
  }

  next();
};
