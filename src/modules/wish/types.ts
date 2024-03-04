import type { DeleteResult, UpdateResult } from 'typeorm';
import { type IArchivedBaseEntity, type IRequestBody } from '../../common/types';

export interface IWishEntity extends IArchivedBaseEntity {
  title: string;
  imageSrc?: string;
  description?: string;
}

export interface IWishCreateDTO
  extends Omit<IWishEntity, 'id' | 'createdAt' | 'updatedAt' | 'archivedAt' | 'deletedAt'> {}

export interface IWishUpdateDTO
  extends Omit<Partial<IWishEntity>, 'id' | 'createdAt' | 'updatedAt' | 'archivedAt' | 'deletedAt'> {}

export interface IWishRepository {
  create: (createWishDto: IWishCreateDTO) => Promise<IWishEntity>;
  findAll: () => Promise<IWishEntity[]>;
  findOne: (id: number) => Promise<IWishEntity | null>;
  update: (id: number, updateWishDto: Partial<IWishEntity>) => Promise<UpdateResult>;
  remove: (id: number) => Promise<DeleteResult>;
}

export interface IWishService {
  create: (body: IRequestBody) => Promise<IWishEntity>;
  findAll: () => Promise<IWishEntity[]>;
  findOne: (id: number) => Promise<IWishEntity | null>;
  update: (id: number, updateWishDto: Partial<IWishEntity>) => Promise<IWishEntity | null>;
  remove: (id: number) => Promise<DeleteResult>;
}
