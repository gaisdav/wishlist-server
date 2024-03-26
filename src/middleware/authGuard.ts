import { type IRequest, type IResponse } from '../common/types';
import { type MiddlewareNext } from 'hyper-express';
import { ForbiddenException } from '../exceptions/ForbiddenException';

export const authGuard = async (req: IRequest, res: IResponse, next: MiddlewareNext): Promise<any> => {
  const user = res.locals.user;

  if (!user) {
    throw new ForbiddenException('Unauthorized');
  }

  next();
};
