// ./controllers/administradores.js

import { db } from '../db.js';

export const registerAdministrador = async (id_usuario) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO administradores (id_usuario) VALUES (?)';
    db.query(query, [id_usuario], (err, result) => {
      if (err) {
        console.error("Erro ao registrar o administrador: /administradores", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

export const getAdministrador = async (id_usuario) => {
  try {
    const q = `SELECT * FROM administradores WHERE id_usuario = ?`;
    const result = await new Promise((resolve, reject) => {
      db.query(q, [id_usuario], (err, result) => {
        if (err) {
          reject(err);
        }
        console.log("(back)Adm encontrado:", result);
        resolve(result);
      });
    });

    if (result.length === 0) {
      throw new Error('Adm não encontrado');
    }

    return result[0];
  } catch (err) {
    console.error("Erro ao encontrar o adm /adm", err);
    throw err;
  }
};