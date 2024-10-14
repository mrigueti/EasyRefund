// auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connection = require('./db');

const router = express.Router();
const SECRET_KEY = 'easyrefund987';

// rota !! /login !! for acessada com um POST, o servidor vai capturar o username e a password enviados no corpo da requisição.
router.post('/login', (req, res) => { // !! ALTERAR /login !!
  const { email, senha } = req.body; // Extrai email e senha do corpo da requisição.

  // Verifica se o usuário existe no banco de dados.
  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) { // nao encontrar usuário retorna 404.
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const usuario = results[0]; // Pega o primeiro resultado.

    // Compara a senha fornecida com a senha criptografada do banco.
    const isValidPassword = bcrypt.compareSync(senha, usuario.senha);
    if (!isValidPassword) { 
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Gera o token JWT.
    const token = jwt.sign(
      { id: usuario.idusuario, role: usuario.idcargo }, // Payload do token com o id do usuário e o cargo.
      SECRET_KEY,
      { expiresIn: '1h' } // 1 hora
    );

    res.json({ token, userRole: usuario.idcargo }); // retorna token e o cargo do usuário.
  });
});

module.exports = router;