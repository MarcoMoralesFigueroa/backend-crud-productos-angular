import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;
const dbDataBase = process.env.DB_DATABASE;

if (!dbHost || !dbUser || !dbPassword || !dbPort || !dbDataBase) {
  console.error("Faltan variables de entorno necesarias.");
  process.exit(1);
}

export const pool = createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  port: dbPort,
  database: dbDataBase,
});