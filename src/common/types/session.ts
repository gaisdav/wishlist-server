import { type JwtPayload } from 'jsonwebtoken';
import { type IUserEntity } from '../../modules/user/types';

export interface IJwtPayload extends JwtPayload {
  user: IUserEntity;
}

export interface IDecodedToken {
  valid: boolean;
  expired: boolean;
  decoded: IJwtPayload | null;
}
