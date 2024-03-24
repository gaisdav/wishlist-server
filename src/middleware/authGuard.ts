import { type IRequest, type IResponse } from '../common/types';
import { type MiddlewareNext } from 'hyper-express';

export const authGuard = async (req: IRequest, res: IResponse, next: MiddlewareNext): Promise<any> => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  next();
};
