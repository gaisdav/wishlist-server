export class Exception extends Error {
  statusCode: number;
  errorMessage: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.errorMessage = message;
    this.statusCode = statusCode || 500;
  }
}
