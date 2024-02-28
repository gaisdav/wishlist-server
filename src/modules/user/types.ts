import type { DeleteResult, UpdateResult } from 'typeorm';
import { type IRequestBody } from '../../common/types';

export interface IUserEntity {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string;
  avatarSrc?: string;
  birthdate: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreateDTO extends Omit<IUserEntity, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IUserRepository {
  create: (createUserDto: IUserCreateDTO) => Promise<IUserEntity>;
  findAll: () => Promise<IUserEntity[]>;
  findOne: (id: number) => Promise<IUserEntity | null>;
  update: (id: number, updateUserDto: Partial<IUserEntity>) => Promise<UpdateResult>;
  remove: (id: number) => Promise<DeleteResult>;
}

export interface IUserService {
  create: (body: IRequestBody) => Promise<IUserEntity>;
  findAll: () => Promise<IUserEntity[]>;
  findOne: (id: number) => Promise<IUserEntity | null>;
  update: (id: number, updateUserDto: Partial<IUserEntity>) => Promise<UpdateResult>;
  remove: (id: number) => Promise<DeleteResult>;
}
