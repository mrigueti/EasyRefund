import { db } from '../db.js';
import { insertNF } from './nfs.js';

export const createSolicitacao = async (req, res) => {
  const { id_usuario, valor_pedido_solic, tipo_dedutivel_solic, descricao, categoria } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Nenhum arquivo enviado." });
  }

  const insertSolicitacao = `
    INSERT INTO solicitacoes (id_usuario, valor_pedido_solic, tipo_dedutivel_solic, descricao, categoria)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(insertSolicitacao, [id_usuario, valor_pedido_solic, tipo_dedutivel_solic, descricao, categoria], async (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao inserir solicitação.' });
    }

    const id_solicitacao = result.insertId;
    const filePath = req.file.path;

    try {
      await insertNF(id_solicitacao, filePath);
      res.status(200).json({ message: 'Solicitação criada com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar o NF.' });
    }
  });
};

export const getAllSolicitacoes = async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        solicitacoes.*, 
        usuarios.nome_usuario AS nome_usuario
      FROM solicitacoes
      JOIN usuarios ON solicitacoes.id_usuario = usuarios.id_usuario
    `);
    res.status(200).json(rows); // Envia os dados ao cliente como JSON
  } catch (error) {
    console.error("(back) Erro ao buscar solicitações:", error);
    res.status(500).json({ error: "Erro ao buscar solicitações" }); // Retorna erro em caso de falha
  }
};
