// db.js
// conexao com banco de dados mysql

// !! ATENÇAO !!
// os dados desse arquivo provavelmente precisarao de mudança nos dados para funcionar corretamente, 
// visto que é um repositório local que pode variar de máquina pra máquina.

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // host
  user: 'root', // usuário
  password: '98765421@', // senha
  database: 'db', // nome banco
  waitForConnections: true,   // espera por novas conexões se a pool estiver cheia
  connectionLimit: 10,        // limite de conexoes simultâneas na pool
  queueLimit: 0               // sem limite de fila de conexoes
});

connection.connect((err) => {
  if (err) throw err;
  console.log('banco mysql conectou');
});

module.exports = connection;