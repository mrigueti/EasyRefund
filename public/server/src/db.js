// db.js

import mysql from "mysql2"
import 'dotenv/config';

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})
db.connect(err => {
  if (err) throw err;
  console.log('Conexão com o banco de dados estabelecida.');
});