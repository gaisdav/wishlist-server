import { NotFoundException } from '../exceptions/NotFoundException';
import { type GlobalNotFoundHandler } from 'hyper-express';

export const notFoundHandler: GlobalNotFoundHandler = (req) => {
  throw new NotFoundException(`Route ${req.url} (${req.method.toUpperCase()}) is not found`);
};
