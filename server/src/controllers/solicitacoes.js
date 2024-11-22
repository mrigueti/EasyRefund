import { db } from '../db.js';
import { getAprovador } from './aprovadores.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { insertNF } from './nfs.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export const getAllSolicitacoes = (req, res) => {
  const query = `
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
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error("(back) Erro ao buscar solicitações:", error);
      return res.status(500).json({ error: "Erro ao buscar solicitações" });
    }
    res.status(200).json(results);
  });
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

    db.query(query, [status_solicitacao, valorFinal, id_aprovador.id_aprovador, id_solicitacao], (err, result) => {
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

export const getSolicitacoesById = (req, res) => {
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

export const getSolicitacao = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT s.*, u.nome_usuario as name, u.setor, u.cargo, un.nome_unidade as unidade, 
           nf.anexo_nf, nf.id_nf
    FROM solicitacoes s 
    JOIN usuarios u ON s.id_usuario = u.id_usuario 
    JOIN unidades un ON u.id_unidade = un.id_unidade 
    LEFT JOIN nfs nf ON s.id_solicitacao = nf.id_solicitacao 
    WHERE s.id_solicitacao = ?
  `;

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Erro ao buscar solicitação:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Solicitação não encontrada' });
    }

    const solicitacao = results[0];
    if (solicitacao.anexo_nf) {
      solicitacao.nomeArquivo = path.basename(solicitacao.anexo_nf);
    }

    res.json(solicitacao);
  });
};

export const downloadArquivo = (req, res) => {
  const { id_nf } = req.params;
  const query = 'SELECT anexo_nf FROM nfs WHERE id_nf = ?';

  db.query(query, [id_nf], (error, results) => {
    if (error) {
      console.error('Erro ao buscar arquivo:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Arquivo não encontrado' });
    }

    const filePath = path.join(__dirname, '..', results[0].anexo_nf);

    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).json({ message: 'Arquivo não encontrado no servidor' });
    }
  });
};