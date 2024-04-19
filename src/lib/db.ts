// lib/db.ts
import mysql from 'mysql2'; // Altere de 'mysql' para 'mysql2'

// Assegure-se que as variáveis de ambiente estão carregadas.
// Com Next.js, process.env já deveria estar disponível, mas você pode usar pacotes como 'dotenv' se necessário.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const query = (sql: string, params?: any[]) => {
  return new Promise<any>((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};
