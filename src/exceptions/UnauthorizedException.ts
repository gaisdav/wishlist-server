import { Exception } from './Exception';

export class UnauthorizedException extends Exception {
  constructor(message: string) {
    super({ message, statusCode: 401 });
  }
}
