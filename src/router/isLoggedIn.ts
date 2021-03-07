import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export = function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  if (token) {
    const email = jwt.verify(token, 'secretkey');
    next();
  } else {
    res.status(403).json({
      message: '로그인이 필요합니다.',
    });
  }
};
