import { get } from 'lodash-es';
import { accessTokenKey, verifyJwt } from '../modules/auth/controller';
import { type IRequest, type IResponse } from '../common/types';
import { type MiddlewareNext } from 'hyper-express';

export const deserializeUser = async (req: IRequest, res: IResponse, next: MiddlewareNext): Promise<any> => {
  const accessToken: string = get(req, `cookies.${accessTokenKey}`, '').replace(/^Bearer\s/, '');
  // const refreshToken = get(req, `cookies.${refreshTokenKey}`, '');

  if (!accessToken) {
    next();
    return;
  }

  const { decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded.user;
    next();
  }

  // // TODO add 403 Error
  // if (expired && refreshToken) {
  //   const newAccessToken = await reIssueAccessToken({ refreshToken });
  //
  //   if (newAccessToken) {
  //     res.cookie('accessToken', newAccessToken, {
  //       maxAge: 900000, // 15 mins
  //       httpOnly: true,
  //       domain: 'localhost',
  //       path: '/',
  //       sameSite: 'strict',
  //       secure: false,
  //     });
  //   }
  //
  //   const result = verifyJwt(newAccessToken as string);
  //
  //   res.locals.user = result.decoded;
  // }
};
