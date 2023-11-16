import express, { Application, NextFunction, Request, Response } from 'express';
//import cors from 'cors'
const app: Application = express();

app.use(express.json());
app.use(express.text());

const userRouter = express.Router();

app.use('/api/v1/user', userRouter);

userRouter.get('/create-user', (req: Request, res: Response) => {
  const user = req.body;
 // console.log(user);

  res.json({
    success: true,
    message: 'User is created Successfully',
    data: user,
  });
});

const logger = (req: Request, res: Response, next: NextFunction) => {
  //console.log(req.url, req.method, req.hostname);
  next();
};

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello sifat!');
});

app.post('/', logger, (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: 'Successfully received data',
  });
});

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route is not found',
  });
});

export default app;
