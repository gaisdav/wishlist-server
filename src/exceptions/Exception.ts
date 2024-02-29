import { type IException } from './types';

export class Exception extends Error {
  name: string;
  statusCode: number;
  errorMessage: string;
  errorStack: string;
  error?: unknown;
  errors?: unknown[];

  constructor({ message, statusCode, name, error, stack, errors }: IException) {
    super(message);
    this.name = name ?? this.constructor.name;
    this.statusCode = statusCode || 500;
    this.errorMessage = message;
    this.errorStack = stack ?? this.stack ?? '';
    this.error = error;
    this.errors = errors;
  }
}
