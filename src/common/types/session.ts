import { type JwtPayload } from 'jsonwebtoken';

export interface IJwtPayload extends JwtPayload {
  userId: number;
}

export interface IDecodedToken {
  valid: boolean;
  expired: boolean;
  decoded: IJwtPayload | null;
}
