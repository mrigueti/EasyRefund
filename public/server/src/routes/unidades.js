// ./routes/unidades.js

import express from 'express';
import getNome from '../controllers/unidades'

export const unidadesRouter = express.Router();

unidadesRouter.get("/get-nome", getNome)