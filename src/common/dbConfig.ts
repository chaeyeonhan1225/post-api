interface dbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
}

const dbConfig: dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dailypost',
  connectionLimit: 10,
};

export = dbConfig;
