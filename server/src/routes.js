// routes.js

const express = require('express');
const verifyToken = require('../middleware');
const connection = require('../db'); // import conexao com db

const router = express.Router();

// !!EXEMPLO!! de rota protegida para administradores
router.get('/admin', verifyToken, (req, res) => {
  if (req.userRole !== 1) { //(1 representa admin, por exemplo).
    return res.status(403).json({ message: 'Acesso não autorizado' }); // Se não for admin, retorna 403.
  }

  res.json({ message: 'Conectado como admin' }); // sucesso
});

// !!EXEMPLO!! de rota para obter usuários
router.get('/usuarios', verifyToken, (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err; // Lança erro se a consulta falhar.
    res.json(results); // Retorna todos os usuários.
  });
});

// !!EXEMPLO!! de rota para criar uma nova solicitaçao
router.post('/solicitacoes', verifyToken, (req, res) => {
  const { idaprovador, status, valor_pedido, tipo_dedutivel } = req.body;
  const idusuario = req.userId; // Usa o ID do usuário autenticado

  connection.query(
    'INSERT INTO solicitacoes (idusuario, idaprovador, status, valor_pedido, tipo_dedutivel) VALUES (?, ?, ?, ?, ?)',
    [idusuario, idaprovador, status, valor_pedido, tipo_dedutivel],
    (err, result) => {
      if (err) throw err; // Lança erro se a consulta falhar.
      res.json({ idsolicitacao: result.insertId, message: 'Solicitação criada com sucesso!' }); // retorna o ID da nova solicitaçao
    }
  );
});

module.exports = router; // Exporta as rotas protegidas.
