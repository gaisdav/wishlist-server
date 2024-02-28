import type { Request as ExpressRequest, Response as ExpressResponse } from 'hyper-express';

export interface IRequestBody extends Record<number, string> {}

export interface IRequest extends ExpressRequest {
  body: IRequestBody;
}

export interface IResponse extends ExpressResponse {}
