import type { Request as ExpressRequest, Response as ExpressResponse } from 'hyper-express';

export interface IRequest<T> extends ExpressRequest {
  body: T;
}

export interface IResponse extends ExpressResponse {}
