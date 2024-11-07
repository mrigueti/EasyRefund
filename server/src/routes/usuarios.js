// ./controllers/usuarios.js

import express from 'express';
import { login } from "../controllers/usuarios.js";

export const usuariosRouter = express.Router();

// Rota para login
usuariosRouter.post("/", login);

//router.get('/', usuariosController.getUsuarios);
//router.post('/', usuariosController.createUsuarios);
//router.put('/:id', usuariosController.updateUsuarios);
//router.delete('/:id', usuariosController.deleteUsuarios);