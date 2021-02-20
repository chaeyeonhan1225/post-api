import mysql from 'mysql2/promise';
import dbConfig from '../common/dbConfig';

class DBpool {
  private pool;
  constructor() {
    this.pool = mysql.createPool(dbConfig);
  }
  async execute(sql: string, args?: any[]): Promise<any> {
    const conn = await this.pool.getConnection();
    try {
      const [result] = await conn.query(sql, args);
      return result;
    } catch (error) {
      conn.release();
      console.error(error);
    } finally {
      conn.release();
    }
  }
}

export const dbPool = new DBpool();
