import { db } from '../db.js';

export const insertNF = (id_solicitacao, filePath) => {
  return new Promise((resolve, reject) => {
    const insertNFQuery = `
      INSERT INTO nfs (id_solicitacao, anexo_nf)
      VALUES (?, ?)
    `;

    db.query(insertNFQuery, [id_solicitacao, filePath], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
