import { get } from 'lodash';
import { type IRequest, type IResponse } from '../common/types';
import { type MiddlewareNext } from 'hyper-express';
import { verifyJwt } from '../common/utils';
import { restoreTokens } from './restoreTokens';

export const deserializeUser = async (req: IRequest, res: IResponse, next: MiddlewareNext): Promise<void> => {
  const accessTokenKey = process.env.JWT_ACCESS_KEY;
  const refreshTokenKey = process.env.JWT_REFRESH_KEY;

  if (!accessTokenKey || !refreshTokenKey) {
    next(new Error('Access token or refresh token key is not provided'));
    return;
  }

  const accessToken: string = get(req, `cookies.${accessTokenKey}`, '');
  const refreshToken = get(req, `cookies.${refreshTokenKey}`, '');

  if (!accessToken) {
    next();
    return;
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded.user;
    return;
  }

  if (expired && refreshToken) {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await restoreTokens(refreshToken);

    res.cookie(accessTokenKey, newAccessToken);
    res.cookie(refreshTokenKey, newRefreshToken);

    const result = verifyJwt(newAccessToken);

    res.locals.user = result.decoded;
    return;
  }

  next();
};
