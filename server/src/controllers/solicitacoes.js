import { db } from '../db.js';
import { getAprovador } from './aprovadores.js';
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
    u.nome_usuario,
    c.nome_cargo,
    s.nome_setor,
    u2.nome_unidade,
    sol.id_solicitacao,
    sol.status_solicitacao,
    sol.valor_pedido_solic,
    sol.dt_criacao_solic,
    sol.valor_aprovado_solic,
    sol.descricao,
    sol.categoria,
    sol.dt_aprovacao,
    n.anexo_nf
    FROM 
    solicitacoes sol
    JOIN 
    usuarios u ON sol.id_usuario = u.id_usuario
    JOIN 
    cargos c ON u.id_cargo = c.id_cargo
    JOIN 
    setores s ON u.id_setor = s.id_setor
    JOIN 
    unidades u2 ON u.id_unidade = u2.id_unidade
    LEFT JOIN 
    nfs n ON sol.id_solicitacao = n.id_solicitacao
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("(back) Erro ao buscar solicitações:", error);
    res.status(500).json({ error: "Erro ao buscar solicitações" });
  }
};

export const updateSolicitacao = async (req, res) => {
  const { id_usuario, id_solicitacao, status_solicitacao, valor_aprovado_solic } = req.body;

  try {
    const id_aprovador = await getAprovador(id_usuario);

    if (!id_solicitacao || !status_solicitacao || !valor_aprovado_solic || !id_aprovador) {
      return res.status(400).json({ error: "Dados insuficientes" });
    }

    const validStatuses = ['Pendente', 'Aprovada', 'Recusada'];
    if (!validStatuses.includes(status_solicitacao)) {
      return res.status(400).json({ error: '(back)Status inválido.' });
    }

    const valorFinal = status_solicitacao === 'Recusada' ? null : valor_aprovado_solic;

    const query = `
      UPDATE solicitacoes
      SET
        status_solicitacao = ?,
        valor_aprovado_solic = ?,
        id_aprovador = ?
      WHERE id_solicitacao = ?
    `;

    db.query(query, [status_solicitacao, valor_aprovado_solic, id_aprovador.id_aprovador, id_solicitacao], (err, result) => {
      if (err) {
        console.error("(back)Erro ao executar a query:", err);
        return res.status(500).json({ error: '(back)Erro ao atualizar a solicitação.', details: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: '(back)Solicitação não encontrada.' });
      }
      return res.status(200).json({ message: '(back)Solicitação atualizada com sucesso.' });
    });
  } catch (err) {
    console.error("Erro ao atualizar solicitação:", err);
    return res.status(500).json({ error: '(back)Erro ao atualizar a solicitação.', details: err });
  }
};

export const getSolicitacoesById = async (req, res) => {
  const userId = req.params.id;

  const q = `SELECT * FROM solicitacoes WHERE id_usuario = ?`;

  db.query(q, [userId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar as solicitações." });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Nenhuma solicitação encontrada." });
    }

    return res.status(200).json({ solicitacoes: data });
  });
};
