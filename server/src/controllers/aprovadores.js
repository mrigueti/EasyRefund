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

export const getAprovador = async (id_usuario) => {
  try {
    const q = `SELECT * FROM aprovadores WHERE id_usuario = ?`;
    const result = await new Promise((resolve, reject) => {
      db.query(q, [id_usuario], (err, result) => {
        if (err) {
          reject(err);
        }
        console.log("(back)Aprovador encontrado:", result);
        resolve(result);
      });
    });

    if (result.length === 0) {
      throw new Error('Aprovador não encontrado');
    }

    return result[0];
  } catch (err) {
    console.error("Erro ao encontrar o aprovador /aprovadores", err);
    throw err;
  }
};