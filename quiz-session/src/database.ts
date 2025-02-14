import { Pool } from "pg";

const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
const database = process.env.DB_NAME || "quiz";
const user = process.env.DB_USERNAME || "admin";
const password = process.env.DB_PASSWORD || "test";

export const pool = new Pool({
  host,
  port,
  database,
  user,
  password,
});