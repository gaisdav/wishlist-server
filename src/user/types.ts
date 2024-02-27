export interface IUserEntity {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string;
  avatarSrc?: string;
  birthdate: Date;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
