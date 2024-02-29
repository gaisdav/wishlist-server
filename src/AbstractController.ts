import { type Server } from 'hyper-express';
import { Exception } from './exceptions/Exception';
import { type IResponse } from './common/types';

export abstract class AbstractController {
  abstract init(server: Server): void;

  errorHandler(res: IResponse, error: unknown): void {
    if (error instanceof Exception) {
      res.status(error.statusCode).json(error);
    } else {
      res.status(500).json(error);
    }
  }
}
