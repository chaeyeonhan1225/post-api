import express, { Router, Request, Response, NextFunction } from 'express';
import { UserService } from '../service/userService';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();

const userService = new UserService();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('test');
    const token = req.headers.authorization || '';
    console.log(token);
    const email = jwt.verify(token, 'secretkey');
    console.log(email);
    res.json(email);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);
    const user = await userService.findById(userId);
    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/join', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, nickname, password } = req.body;
    const newUser = await userService.join({ email: email, nickname: nickname, password: password });
    const token = jwt.sign({ email: newUser.email }, 'secretkey');
    return res.json({
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('login 요청 !');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export = router;
