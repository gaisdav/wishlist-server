import HyperExpress from 'hyper-express';

interface CORSOptions {
  origin: string;
  credentials: boolean;
  optionsRoute?: boolean;
}

const cors = (options: CORSOptions) => {
  return async (request: HyperExpress.Request, response: HyperExpress.Response) => {
    response.header('vary', 'Origin');
    response.header('Access-Control-Allow-Headers', 'content-type');
    response.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, POST, GET, PUT, DELETE, PATCH, HEAD, CONNECT, TRACE, PURGE',
    );
    response.header('Access-Control-Allow-Origin', options.origin);
    response.header('Access-Control-Allow-Credentials', options.credentials.toString());

    if (options.optionsRoute === true) {
      response.send('');
    }
  };
};

export default cors;