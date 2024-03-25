import { type IAuthRepository, type IAuthServices, type IGoogleTokenInfo, type IGoogleUserinfo } from './types';
import { type IUserCreateDTO, type IUserEntity, type IUserService } from '../user/types';
import { refreshTokenExpiresIn, signJwt, verifyJwt } from './controller';
import { type ParsedQs } from 'hyper-express';

export class AuthService implements IAuthServices {
  constructor(
    private readonly userService: IUserService,
    private readonly authRepository: IAuthRepository,
  ) {}

  async findUserByEmail(email: string): Promise<IUserEntity | null> {
    return await this.userService.findOneByEmail(email);
  }

  async createUserByGoogle(user: IUserCreateDTO): Promise<IUserEntity> {
    return await this.userService.create(user);
  }

  getGoogleTokens = async (code: ParsedQs['code']): Promise<IGoogleTokenInfo> => {
    const { data } = await this.authRepository.getGoogleTokens(code);

    return data;
  };

  getGoogleUser = async (tokenType: string, token: string): Promise<IUserEntity> => {
    const { data: userinfo } = await this.authRepository.getGoogleUserInfo(tokenType, token);

    if (!userinfo.email_verified) {
      // return res.status(403).send('Google account is not verified');
    }

    let user = await this.userService.findOneByEmail(userinfo.email);

    if (!user) {
      const createUserParams: IUserCreateDTO = {
        username: userinfo.email,
        email: userinfo.email,
        firstName: userinfo.given_name,
        lastName: userinfo.family_name,
        avatarSrc: userinfo.picture,
      };

      user = await this.userService.create(createUserParams);
    }

    return user;
  };

  getTokens = async (user: IUserEntity): Promise<{ accessToken: string; refreshToken: string }> => {
    const accessToken = signJwt(user);
    const refreshToken = signJwt(user, {
      expiresIn: refreshTokenExpiresIn,
    });

    return { accessToken, refreshToken };
  };

  restoreTokens = async ({ token }: { token: string }): Promise<{ accessToken: string; refreshToken: string }> => {
    const { decoded } = verifyJwt(token);

    if (!decoded?.user) {
      throw new Error('Invalid refresh token');
    }

    const user = await this.userService.findOneByEmail(decoded.user.email);

    if (!user) {
      throw new Error('User not found on refresh token');
    }

    return await this.getTokens(user);
  };
}
