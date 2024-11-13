// ./controllers/nfs.js

import { db } from '../db.js'

export const insertNF = async (id_solicitacao, filePath) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO nfs (anexo_nf, id_solicitacao) VALUES (?, ?)'
    db.query(query, [filePath, id_solicitacao], (err) => {
      if (err) {
        console.error("Erro ao adicionar nf no banco: /nfs controller", err);
        return reject(err);
      }
      resolve(result);
    });
  })
}