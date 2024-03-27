import { get } from 'lodash';
import { type IRequest, type IResponse } from '../common/types';
import { type MiddlewareNext } from 'hyper-express';
import { verifyJwt } from '../common/utils';

export const deserializeUser = async (req: IRequest, res: IResponse, next: MiddlewareNext): Promise<any> => {
  const accessTokenKey = process.env.JWT_ACCESS_KEY;

  if (!accessTokenKey) {
    throw new Error('Access token key is not provided');
  }

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

  // TODO: implement refresh token logic
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
