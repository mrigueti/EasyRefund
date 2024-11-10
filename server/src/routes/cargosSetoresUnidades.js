import express from 'express';
import { getCargosSetoresUnidades } from '../controllers/cargosSetoresUnidades.js'

export const cargosSetoresUnidadesRouter = express.Router();

cargosSetoresUnidadesRouter.get("/get", getCargosSetoresUnidades)