import { dataSource } from '../dataSource';
import { User } from '../modules/user/entity';
import type { IUserEntity } from '../modules/user/types';

export const getUserByEmail = async (email: string): Promise<IUserEntity | null> => {
  return await dataSource.getRepository(User).findOneBy({ email });
};
