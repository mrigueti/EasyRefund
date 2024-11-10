// ./routes/unidades.js

import express from 'express';
import { get } from '../controllers/unidades.js'

export const unidadesRouter = express.Router();

//get unidade
unidadesRouter.get("/get", get)