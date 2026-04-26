import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

async function initDb() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    multipleStatements: true
  });

  try {
    const sql = readFileSync(join(__dirname, 'init-db.sql'), 'utf-8');
    await connection.query(sql);
    console.log('Database initialized successfully');
  } finally {
    await connection.end();
  }
}

initDb().catch(console.error);