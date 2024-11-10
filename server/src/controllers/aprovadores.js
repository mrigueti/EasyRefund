// ./controllers/aprovadores.js

import { db } from '../db.js';

export const registerAprovador = async (id_usuario) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO aprovadores (id_usuario) VALUES (?)';
    db.query(query, [id_usuario], (err, result) => {
      if (err) {
        console.error("Erro ao registrar o aprovador: /aprovadores", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};