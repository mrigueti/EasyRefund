import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import { json } from 'express';
import jwt from 'jsonwebtoken';

export const getNome = (req, res) =>{
  const query = 'SELECT nome_unidade FROM unidades';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar unidades' });
    res.json(results);
  });
}