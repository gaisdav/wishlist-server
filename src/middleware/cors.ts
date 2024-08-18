import HyperExpress from 'hyper-express';

export interface CORSOptions {
  origin: string;
  credentials: boolean;
  optionsRoute?: boolean;
}

export const cors = (options: CORSOptions) => {
  return async (request: HyperExpress.Request, response: HyperExpress.Response) => {
    response.header('vary', 'Origin');
    response.header('Access-Control-Allow-Headers', 'content-type');
    response.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE, PATCH');
    response.header('Access-Control-Allow-Origin', options.origin);
    response.header('Access-Control-Allow-Credentials', options.credentials.toString());

    if (options.optionsRoute === true) {
      response.send('');
    }
  };
};
