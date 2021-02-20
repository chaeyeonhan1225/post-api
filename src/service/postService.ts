import { ResultSetHeader } from 'mysql2';
import { ForbiddenError } from '../common/clientErrors';
import { PostRepository, PostType, PostInputType, PostUpdateType } from '../repository/post';

const postRepository = new PostRepository();

export class PostService {
  // constructor() {}
  async findAll(): Promise<PostType[]> {
    return await postRepository.findAll();
  }
  async findById(id: number): Promise<PostType> {
    return await postRepository.findById(id);
  }
  async create(user: any, postInput: PostInputType): Promise<PostType> {
    if (!user) throw new ForbiddenError('로그인한 회원만 게시글 작성 가능');
    const postInputArgs: PostInputType = { userId: user.id, title: postInput.title, content: postInput.content };
    const result: ResultSetHeader = await postRepository.create(postInputArgs);
    console.log(result);
    const newPost: PostType = await postRepository.findById(result.insertId);
    return newPost;
  }
}
