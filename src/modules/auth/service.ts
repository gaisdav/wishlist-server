import { type IAuthRepository, type IAuthServices, type IGoogleTokenInfo, type ITokens } from './types';
import { type IUserCreateDTO, type IUserEntity, type IUserService } from '../user/types';
import { type ParsedQs } from 'hyper-express';
import { ForbiddenException } from '../../exceptions/ForbiddenException';
import { signJwt, verifyJwt } from '../../common/utils';
import { ValidationException } from '../../exceptions/ValidationException';

export class AuthService implements IAuthServices {
  constructor(
    private readonly userService: IUserService,
    private readonly authRepository: IAuthRepository,
  ) {}

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
      throw new ForbiddenException('Google account is not verified');
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
    const refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;
    const accessToken = signJwt(user);
    const refreshToken = signJwt(user, {
      expiresIn: refreshTokenExpiresIn,
    });

    return { accessToken, refreshToken };
  };

  restoreTokens = async (token: string): Promise<ITokens> => {
    console.log('restoreTokens', token);
    const { decoded } = verifyJwt(token);

    if (!decoded?.user) {
      throw new Error('Invalid refresh token');
    }

    const user = await this.userService.findOneByEmail(decoded.user.email);

    if (!user) {
      throw new ValidationException('User not found on refresh token');
    }

    return await this.getTokens(user);
  };
}
