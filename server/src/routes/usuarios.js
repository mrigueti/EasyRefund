// ./routes/usuarios.js

import express from 'express';
import { login, register } from "../controllers/usuarios.js";

export const usuariosRouter = express.Router();

// Rota de login
usuariosRouter.post("/login", login);

// Rota de registro
usuariosRouter.post("/register", register);
