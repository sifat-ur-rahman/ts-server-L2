import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

//application route.

app.use('/api/v1/students', StudentRoute);

//route error handler
app.all('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is rending',
  });
});
app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route is not found',
  });
});

export default app;
