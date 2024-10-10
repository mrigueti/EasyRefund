const express = require('express');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Bem-vindo ao EasyRefund!');
});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
