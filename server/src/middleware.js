// middleware.js

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'easyrefund987';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // pega o token do cabeçalho de autorização.

  if (!token) { // nao houver token, retorna erro 403.
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) { // token inválido ou expirado, retorna erro 401.
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.userId = decoded.id; // coloca o id do usuário na requisição.
    req.userRole = decoded.role; // coloca o cargo do usuário na requisição.
    next(); // Continua para a próxima função/middleware.
  });
};

module.exports = verifyToken;
