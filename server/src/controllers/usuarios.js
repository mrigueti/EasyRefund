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

    // Verificando a senha com bcrypt usando o campo correto
    const senhaCorreta = bcrypt.compareSync(senha, user.senha_usuario);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Gerando um token JWT
    const token = jwt.sign({ id: user.id_usuario, role: user.role_nome, nome: user.nome_usuario }, process.env.JWT_SECRET || 'easyrefund987', { expiresIn: '1h' });
    //console.log(user.role_nome);

    return res.status(200).json({ message: "Login bem-sucedido!", token, user });
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
  const userId = req.params.id; // ID do usuário vindo da URL
  const { nome_usuario, cpf_usuario, email_usuario } = req.body; // Dados enviados pelo frontend

  // Validação básica para evitar dados inválidos
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
  const { id } = req.params;  // Pega o id do usuário a partir da URL
  const { senhaAtual, novaSenha } = req.body;  // Recebe as senhas atuais e novas do corpo da requisição

  // Verifica se todos os dados necessários foram fornecidos
  if (!senhaAtual || !novaSenha) {
    return res.status(400).json({ message: "Senha atual e nova senha são obrigatórias." });
  }

  // Consulta o banco de dados para pegar o hash da senha do usuário
  db.query('SELECT senha_usuario FROM usuarios WHERE id_usuario = ?', [id], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar senha:', err);
      return res.status(500).json({ message: 'Erro no servidor ao buscar senha' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // A senha do banco de dados é armazenada como hash, então comparamos usando bcrypt
    const senhaHash = rows[0].senha_usuario;

    bcrypt.compare(senhaAtual, senhaHash, (err, result) => {
      if (err) {
        console.error('Erro ao comparar senhas:', err);
        return res.status(500).json({ message: 'Erro ao verificar senha atual' });
      }

      if (!result) {
        return res.status(400).json({ message: 'Senha atual incorreta' });
      }

      // Se a senha atual estiver correta, atualizamos com a nova senha
      bcrypt.hash(novaSenha, 10, (err, newHashedPassword) => {
        if (err) {
          console.error('Erro ao gerar novo hash de senha:', err);
          return res.status(500).json({ message: 'Erro ao gerar novo hash de senha' });
        }

        // Atualiza a senha do usuário no banco de dados com o novo hash
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
