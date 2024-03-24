import type { Request as ExpressRequest, Response as ExpressResponse } from 'hyper-express';

export interface IRequestBody extends Record<number, string> {}

export interface IRequest extends ExpressRequest {
  body: IRequestBody;
}

// <{
//     user: IUserEntity;
//   }>
export interface IResponse extends ExpressResponse {}

export interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IArchivedBaseEntity extends IBaseEntity {
  archivedAt: Date;
}
