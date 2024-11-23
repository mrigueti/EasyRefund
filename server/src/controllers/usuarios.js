// ./controllers/usuarios.js

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

    const senhaCorreta = bcrypt.compareSync(senha, user.senha_usuario);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    const token = jwt.sign({ id: user.id_usuario, role: user.role_nome, nome: user.nome_usuario }, process.env.JWT_SECRET || 'easyrefund987', { expiresIn: '1h' });
    //console.log(user.role_nome);

    return res.status(200).json({ message: "Login bem-sucedido!", token, user });
  });
};

export const register = async (req, res) => {
  const { nome_usuario, email_usuario, senha_usuario, role_nome, id_cargo, id_setor, id_unidade } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha_usuario, 10);
    const query = 'INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, role_nome, id_cargo, id_setor, id_unidade) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nome_usuario, email_usuario, hashedPassword, role_nome, id_cargo, id_setor, id_unidade], (err, result) => {
      if (err) {
        console.error("Erro ao registrar o usuário:", err);
        return res.status(500).json({ error: "Erro ao registrar o usuário." });
      }

      if (role_nome === "Aprovador") {
        try {
          registerAprovador(result.insertId);
          console.log("Usuário registrado como aprovador registrado com sucesso.");
        } catch (error) {
          console.error("Erro ao registrar o aprovador /usuarios:", error);
        }
      }
      const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET || 'easyrefund987', { expiresIn: '1h' });
      res.status(201).json({ message: "Usuário cadastrado com sucesso.", token });
    });
  } catch (err) {
    console.error("Erro ao processar registro do usuário:", err);
    res.status(500).json({ error: "Erro ao processar registro do usuário." });
  }
};

export const get = (req, res) => {
  const userId = req.params.id;

  const q = `SELECT id_usuario, nome_usuario, cpf_usuario, email_usuario, role_nome, id_cargo, id_setor, id_unidade FROM usuarios WHERE id_usuario = ?`;

  db.query(q, [userId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar o usuário." });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const user = data[0];
    return res.status(200).json({ user });
  });
};

export const update = (req, res) => {
  const userId = req.params.id;
  const { nome_usuario, cpf_usuario, email_usuario } = req.body;

  if (!nome_usuario || !cpf_usuario || !email_usuario) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const query = `
    UPDATE usuarios
    SET nome_usuario = ?, cpf_usuario = ?, email_usuario = ?
    WHERE id_usuario = ?`;

  db.query(query, [nome_usuario, cpf_usuario, email_usuario, userId], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar o usuário:", err);
      return res.status(500).json({ sucess: false, error: "Erro no servidor ao atualizar o usuário.", });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ sucess: false, error: "Usuário não encontrado.", });
    }

    return res.status(200).json({ sucess: true, message: "Usuário atualizado com sucesso!", });
  });
};

export const updatePassword = (req, res) => {
  const { id } = req.params;
  const { senhaAtual, novaSenha } = req.body;

  if (!senhaAtual || !novaSenha) {
    return res.status(400).json({ message: "Senha atual e nova senha são obrigatórias." });
  }

  db.query('SELECT senha_usuario FROM usuarios WHERE id_usuario = ?', [id], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar senha:', err);
      return res.status(500).json({ message: 'Erro no servidor ao buscar senha' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const senhaHash = rows[0].senha_usuario;

    bcrypt.compare(senhaAtual, senhaHash, (err, result) => {
      if (err) {
        console.error('Erro ao comparar senhas:', err);
        return res.status(500).json({ message: 'Erro ao verificar senha atual' });
      }

      if (!result) {
        return res.status(400).json({ message: 'Senha atual incorreta' });
      }

      bcrypt.hash(novaSenha, 10, (err, newHashedPassword) => {
        if (err) {
          console.error('Erro ao gerar novo hash de senha:', err);
          return res.status(500).json({ message: 'Erro ao gerar novo hash de senha' });
        }

        db.query('UPDATE usuarios SET senha_usuario = ? WHERE id_usuario = ?', [newHashedPassword, id], (err, result) => {
          if (err) {
            console.error('Erro ao atualizar a senha:', err);
            return res.status(500).json({ message: 'Erro ao atualizar a senha' });
          }

          return res.status(200).json({ message: 'Senha atualizada com sucesso' });
        });
      });
    });
  });
};
