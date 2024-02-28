import { type IUserCreateDTO } from '../types';
import { IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateUserDTO implements IUserCreateDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthdate: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  avatarSrc?: string;
}
