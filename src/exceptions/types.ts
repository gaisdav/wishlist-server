export interface IException {
  statusCode: number;
  message: string;
  stack?: string;
  name?: string;
  error?: unknown;
  errors?: unknown[];
}
