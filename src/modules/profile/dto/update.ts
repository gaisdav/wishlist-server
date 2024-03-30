import { type IProfileUpdateDTO } from '../types';
import { IsDateString, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProfileDTO implements IProfileUpdateDTO {
  @IsString()
  @MinLength(1)
  @IsOptional()
  username: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  firstName: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  avatarSrc: string;

  @IsDateString()
  @IsOptional()
  birthdate: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
