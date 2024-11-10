import jwt from 'jsonwebtoken';

export const checkAuth = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const tokenOnly = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenOnly, process.env.JWT_SECRET || 'easyrefund987', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }

      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Acesso negado: role insuficiente' });
      }

      next();
    });
  };
};
