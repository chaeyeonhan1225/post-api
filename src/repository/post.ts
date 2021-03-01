import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { dbPool } from './dbPool';

export interface PostType {
  id: number;
  title: string;
  content: string;
  userId: number;
  status: string;
}

export interface PostInputType {
  title: string;
  content: string;
  userId: number;
}

export interface PostUpdateType {
  id: number;
  title: string;
  content: string;
}

export class PostRepository {
  private pool;
  constructor() {
    this.pool = dbPool;
  }
  // Post 여러개를 조회
  async findAll(): Promise<PostType[]> {
    return await this.pool.execute('SELECT * FROM Post');
  }
  // Post 한개를 조회
  async findById(id: number): Promise<PostType> {
    console.log(id);
    const [post] = await this.pool.execute('SELECT * FROM Post WHERE id = ?', [id]);
    console.log(post);
    return post;
  }
  // Post 생성
  async create(input: PostInputType): Promise<PostType> {
    const [result]: [ResultSetHeader] = await this.pool.execute('INSERT INTO Post (title, content, userId) VALUES(?)', [
      input.title,
      input.content,
      input.userId,
    ]);
    return await this.findById(result.insertId);
  }
  // Post 수정
  async update(input: PostUpdateType): Promise<PostType> {
    const [result]: [ResultSetHeader] = await this.pool.execute('UPDATE Post SET title = ?, content = ? WHERE id = ?', [
      input.title,
      input.content,
      input.id,
    ]);
    return await this.findById(result.insertId);
  }
  // Post 삭제
  async delete(id: number): Promise<ResultSetHeader> {
    const [result] = await this.pool.execute('UPDATE Post SET status = ? WHERE id = ?', ['DELETED', id]);
    return result;
  }
}
