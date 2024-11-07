import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const { email, senha } = req.body;
  console.log("ALO");
  

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  const q = `SELECT * FROM usuarios WHERE email_usuario = ?`;

  db.query(q, [email], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro no servidor." });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const user = data[0];

    // Verificando a senha com bcrypt
    const senhaCorreta = bcrypt.compareSync(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Gerando um token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'easyrefund987', { expiresIn: '1h' });

    return res.status(200).json({ message: "Login bem-sucedido!", token });
  });
};
