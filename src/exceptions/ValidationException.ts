import { Exception } from './Exception';
import { type ValidationError } from 'class-validator';

export class ValidationException extends Exception {
  constructor(message: string, errors: ValidationError[] = []) {
    super({ message, statusCode: 400, errors });
  }
}
