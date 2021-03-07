import { ResultSetHeader } from 'mysql2';
import { BadRequestError, ForbiddenError, NotFoundError } from '../common/clientErrors';
import { PostRepository, PostType, PostInputType, PostUpdateType } from '../repository/post';
import { UserType } from '../repository/user';

const postRepository = new PostRepository();

export class PostService {
  // constructor() {}
  async findAll(): Promise<PostType[]> {
    return await postRepository.findAll();
  }
  async findById(id: number): Promise<PostType> {
    const post = await postRepository.findById(id);
    if (!post) throw new NotFoundError('게시글이 존재하지 않음');
    return post;
  }
  async create(user: UserType, param: PostInputType): Promise<PostType> {
    if (!user) throw new ForbiddenError('로그인한 회원만 게시글 작성 가능');
    if (!param.title || !param.content) throw new BadRequestError('잘못된 입력입니다!');
    const postInputArgs: PostInputType = {
      userId: user.id,
      title: param.title,
      content: param.content,
    };
    const newPost: PostType = await postRepository.create(postInputArgs);
    return newPost;
  }
  async update(user: UserType, param: PostUpdateType): Promise<PostType> {
    if (!user) throw new ForbiddenError('로그인한 회원만 게시글 작성 가능');
    const postUpdateParam = {
      id: user.id,
      userId: user.id,
      title: param.title,
      content: param.content,
    };
    const updatedPost = await postRepository.update(postUpdateParam);
    return updatedPost;
  }
}
