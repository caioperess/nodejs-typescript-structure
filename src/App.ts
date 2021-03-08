import express, { Express } from 'express';
import morgan from 'morgan';
import allowCors from '@middlewares/cors';
import routes from './routes';

class App {
  server: Express;

  nodeEnv: string;

  constructor() {
    this.nodeEnv = process.env.NODE_ENV;
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(allowCors);

    if (this.nodeEnv === 'development') {
      this.server.use(morgan('tiny'));
    } else {
      this.server.use(
        morgan(`[:date] - :method [:status] :url - :response-time ms`),
      );
    }
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
