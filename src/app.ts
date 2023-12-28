import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandalers from './app/middlewears/globalErrorHandalers';
import routeNOtFound from './app/middlewears/routeNotFound';
import router from './app/routes';
const app: Application = express();
app.use(cors());
//data parser
app.use(express.json());

//application route
app.use('/api', router);

//main route
app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

//global Error Handalers
app.use(globalErrorHandalers);
// not found route
app.use(routeNOtFound);

export default app;
