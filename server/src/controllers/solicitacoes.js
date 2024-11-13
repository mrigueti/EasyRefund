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
