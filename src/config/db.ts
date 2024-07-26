import { Pool } from "pg";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const pool = new Pool({
  host: process.env.HOST!,
  user: process.env.USER!,
  password: process.env.PASSWORD!,
  database: process.env.DATABASE!,
  port: Number(process.env.DB_PORT) || 5432,
});

export default pool;
