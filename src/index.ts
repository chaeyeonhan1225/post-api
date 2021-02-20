import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import userRouter from './router/userRouter';
import postRouter from './router/postRouter';
import passport from 'passport';
import { passportConfig } from './passport';

const app: express.Application = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
passportConfig();

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.get('/', (req: Request, res: Response, _next: NextFunction) => {
  res.send('first page');
});

app.listen('3000', () => {
  console.log('Serer start at 3000 port');
});
