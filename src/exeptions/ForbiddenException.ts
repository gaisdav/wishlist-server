import { Exception } from './Exception';

export class ForbiddenException extends Exception {
  constructor(message: string) {
    super(message, 403);
  }
}
