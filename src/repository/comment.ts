import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { dbPool } from './dbPool';

interface CommentType {
  id: number;
  content: string;
  userId: number;
  postId: number;
  status: string;
}

interface CommentInputType {
  content: string;
  userId: number;
  postId: number;
}

interface CommentUpdateInputType {
  id: number;
  content: string;
}

export class CommentRepository {
  private pool;
  constructor() {
    this.pool = dbPool;
  }
  async findAll(): Promise<CommentType[]> {
    return await this.pool.execute('SELECT * FROM Comment');
  }
  async findById(id: number): Promise<CommentType> {
    const [comment] = await this.pool.execute('SELECT * FROM Comment WHERE id = ?', [id]);
    return comment;
  }
  async findAllByPostId(postId: number): Promise<CommentType[]> {
    const comments = await this.pool.execute('SELECT * FROM Comment WHERE postId = ?', [postId]);
    return comments;
  }
  async findAllByUserId(userId: number): Promise<CommentType[]> {
    return await this.pool.execute('SELECT * FROM Comment WHERE userId = ?', [userId]);
  }
  async create(input: CommentInputType): Promise<ResultSetHeader> {
    const [result] = await this.pool.execute('INSERT INTO Comment (title, content, postId, userId) VALUES (?)', [
      input,
    ]);
    return result;
  }
  async update(input: CommentUpdateInputType): Promise<ResultSetHeader> {
    const [result] = await this.pool.execute('UPDATE Comment SET content = ? WHERE id = ?', [input.content, input.id]);
    return result;
  }
  async delete(id: number): Promise<ResultSetHeader> {
    const [result] = await this.pool.execute('UPDATE Comment SET status = ? WHERE id = ?', ['DELETED', id]);
    return result;
  }
}
