import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  ENV,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;

export default {
  port: PORT,
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  dbPort: POSTGRES_PORT,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  tokenSecret: TOKEN_SECRET,
};
