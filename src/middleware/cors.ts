import HyperExpress from 'hyper-express';

export interface CORSOptions {
  origin: string;
  credentials: boolean;
}

export const cors = (options: CORSOptions) => {
  return async (_: HyperExpress.Request, response: HyperExpress.Response) => {
    response.header('vary', 'Origin');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Origin', options.origin);
    response.header('Access-Control-Allow-Credentials', options.credentials.toString());
  };
};
