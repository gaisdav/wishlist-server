import { type IUserCreateDTO } from '../types';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDTO implements IUserCreateDTO {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  avatarSrc?: string;

  @IsString()
  birthdate: string;

  @IsString()
  email: string;
}
