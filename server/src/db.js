// db.js

import mysql from "mysql2"

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "98765421@",
  database: "EasyRefund"
})
db.connect(err => {
  if (err) throw err;
  console.log('Conexão com o banco de dados estabelecida.');
});