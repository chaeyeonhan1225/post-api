import { dbPool } from '../repository/dbPool';
import { ResultSetHeader } from 'mysql2/promise';

export interface UserType {
  id: number;
  email: string;
  nickname: string;
  password: string;
  status: boolean;
}

export interface UserInput {
  email: string;
  nickname: string;
  password: string;
}
export class UserRepository {
  private pool;
  constructor() {
    this.pool = dbPool;
  }
  async findAll(): Promise<UserType[]> {
    return await this.pool.execute('SELECT * FROM User');
  }
  async findById(id: number): Promise<UserType> {
    const [user] = await this.pool.execute('SELECT * FROM User WHERE id = ?', [id]);
    return user;
  }
  async findByEmail(email: string): Promise<UserType> {
    const [user] = await this.pool.execute('SELECT * FROM User WHERE email = ?', [email]);
    return user;
  }
  // TODO: 닉네임 추가해야됨
  async create(user: UserInput): Promise<ResultSetHeader> {
    return await this.pool.execute('INSERT INTO User (email, nickname, password) VALUES (?, ?, ?)', [
      user.email,
      user.nickname,
      user.password,
    ]);
  }
}
