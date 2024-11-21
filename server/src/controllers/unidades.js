// ./controllers/unidades.js

import { db } from '../db.js';
import { json } from 'express';

export const get = (req, res) => {
  const query = 'SELECT * FROM unidades';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar unidades:', err);
      return res.status(500).json({ error: 'Erro ao buscar unidades' });
    }

    const unidades = Array.isArray(results) ? results : []; // 
    //console.log('(backend) Unidades formatadas:', unidades);
    //console.log(results);
    res.json(unidades);
  });
};