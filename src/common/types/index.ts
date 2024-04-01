import type { Request as ExpressRequest, Response as ExpressResponse } from 'hyper-express';

export type TRequestBody = ExpressRequest['body'];

export interface IRequest extends ExpressRequest {}

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
