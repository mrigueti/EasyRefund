// ./routes/usuarios.js

import express from 'express';
import { login, register, get, update, updatePassword } from "../controllers/usuarios.js";
import { checkAuth } from '../middleware/checkAuth.js';

export const usuariosRouter = express.Router();

// Rota de login
usuariosRouter.post("/login", login);

// Rota de registro
usuariosRouter.post("/register", checkAuth('Gerente'), register);
usuariosRouter.get('/get/:id', get)
usuariosRouter.put('/update/:id', update)
usuariosRouter.put('/update-password/:id', updatePassword)
