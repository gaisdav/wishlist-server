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
