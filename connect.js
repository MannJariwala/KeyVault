import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = await createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "db_keyvault",
});

export default db;
