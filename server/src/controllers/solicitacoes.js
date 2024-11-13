// ./controllers/solicitacoes.js

import { db } from '../db.js'
import { insertNF } from './nfs.js'

export const createSolicitacao = (req, res) => {
  const { id_usuario, valor_pedido_solic, tipo_dedutivel_solic, descricao, categoria } = req.body

  if (!req.file) {
    return res.status(400).json({ message: "Nenhum arquivo enviado." })
  }

  const insertSolicitacao = `
        INSERT INTO solicitacoes (id_usuario, valor_pedido_solic, tipo_dedutivel_solic, descricao, categoria)
        VALUES (?, ?, ?, ?, ?)
    `;

  db.query(insertSolicitacao, [id_usuario, valor_pedido_solic, tipo_dedutivel_solic, descricao, categoria], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao inserir solicitção.' })
    }

    const id_solicitacao = result.inserId;
    const filePath = req.file.path;

    try {
      insertNF(id_solicitacao, filePath);
      console.log("NF adicionada com sucesso /controller solic");
    } catch (error) {
      console.error("Erro ao registrar o NF /controller solic:", error);
    }

  })

}