import { type Server } from 'hyper-express';
import { QueryFailedError } from 'typeorm';
import { Exception } from './exceptions/Exception';
import { type IResponse } from './common/types';

export abstract class AbstractController {
  abstract init(server: Server): void;

  errorHandler(res: IResponse, error: unknown): void {
    if (error instanceof Exception) {
      res.status(error.statusCode).json(error);
    } else if (error instanceof QueryFailedError) {
      const exception = new Exception({
        message: error.message,
        statusCode: 400,
        name: error.name,
        error,
      });
      res.status(exception.statusCode).json(exception);
    } else if (error instanceof Error) {
      const exception = new Exception({
        message: error.message,
        statusCode: 500,
        name: error.name,
        stack: error.stack,
        error,
      });
      res.status(exception.statusCode).json(exception);
    } else {
      res.status(500).json(error);
    }
  }
}
