// ./controllers/unidades.js

import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import { json } from 'express';
import jwt from 'jsonwebtoken';

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