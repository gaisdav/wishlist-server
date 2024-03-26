import { Exception } from '../exceptions/Exception';
import { QueryFailedError } from 'typeorm';
import { type GlobalErrorHandler } from 'hyper-express';

export const errorHandler: GlobalErrorHandler = (_, res, error) => {
  if (error instanceof Exception) {
    // if (redirectUrl) {
    //    res.redirect('http://localhost:5173/login');
    //  }

    res.status(error.statusCode).json(error);
  } else if (error instanceof QueryFailedError) {
    const exception = new Exception({
      statusCode: 400,
      message: error.message,
      name: error.name,
      error,
    });

    res.status(exception.statusCode).json(exception);
  } else {
    const exception = new Exception({
      message: error.message,
      statusCode: 500,
      name: error.name,
      stack: error.stack,
      error,
    });

    res.status(exception.statusCode).json(exception);
  }
};
