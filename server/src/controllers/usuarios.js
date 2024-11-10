import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import { json } from 'express';
import jwt from 'jsonwebtoken';
import { registerAprovador } from './aprovadores.js';

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

    // Verificando a senha com bcrypt usando o campo correto
    const senhaCorreta = bcrypt.compareSync(senha, user.senha_usuario);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Gerando um token JWT
    const token = jwt.sign({ id: user.id_usuario, role: user.role_nome}, process.env.JWT_SECRET || 'easyrefund987', { expiresIn: '1h' });
    //console.log(user.role_nome);
    
    return res.status(200).json({ message: "Login bem-sucedido!", token, user});
  });
};

export const register = async (req, res) => {
  const { nome_usuario, email_usuario, senha_usuario, role_nome, id_cargo, id_setor, id_unidade } = req.body;

  try {
    console.log("Recebendo dados do frontend:", req.body); // Log para conferir os dados recebidos
    const hashedPassword = await bcrypt.hash(senha_usuario, 10);
    const query = 'INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, role_nome, id_cargo, id_setor, id_unidade) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nome_usuario, email_usuario, hashedPassword, role_nome, id_cargo, id_setor, id_unidade], (err, result) => {
      if (err) {
        console.error("Erro ao registrar o usuário:", err); // Log do erro no servidor
        return res.status(500).json({ error: "Erro ao registrar o usuário." });
      }
      
      if (role_nome === "Aprovador") {
        try {
          registerAprovador(result.insertId); // Chama a função passando o ID do usuário inserido
          console.log("Usuário registrado como aprovador registrado com sucesso.");
        } catch (error) {
          console.error("Erro ao registrar o aprovador /usuarios:", error);
        }
      }
      const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET || 'easyrefund987', { expiresIn: '1h' });
      res.status(201).json({ message: "Usuário cadastrado com sucesso.", token });
    });
  } catch (err) {
    console.error("Erro ao processar registro do usuário:", err); // Log do erro no servidor
    res.status(500).json({ error: "Erro ao processar registro do usuário." });
  }
};
