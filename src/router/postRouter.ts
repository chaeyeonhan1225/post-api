import express, { Request, Response, NextFunction } from 'express';
import { PostService } from '../service/postService';

const router = express.Router();
const postService = new PostService();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postService.findAll();
    return res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.findById(postId);
    return res.json(post);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, userId } = req.body;
    // TODO: 로그인 인증 구현되면 다시 진행 !!
  } catch (error) {
    next(error);
  }
});

export = router;
