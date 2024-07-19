import { type IRequest, type IResponse } from '../common/types';
import { type MiddlewareNext } from 'hyper-express';
import { verifyJwt } from '../common/utils';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

export const deserializeUser = async (req: IRequest, res: IResponse, next: MiddlewareNext): Promise<void> => {
  try {
    const accessTokenKey = process.env.JWT_ACCESS_KEY;
    const refreshTokenKey = process.env.JWT_REFRESH_KEY;

    if (!accessTokenKey || !refreshTokenKey) {
      return;
    }

    const accessToken = req.cookies[accessTokenKey];

    if (!accessToken) {
      return;
    }

    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
      res.locals.userId = decoded.userId;
    }

    // if (expired) {
    //   throw new UnauthorizedException('Access token is expired');
    // }
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    }
  }
};
