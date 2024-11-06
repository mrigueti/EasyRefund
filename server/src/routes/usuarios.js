// usuarios.js

import express from "express";
import { login } from "../controllers/usuarios.js";

export const userRoutes = express.Router()

// userRoutes.get("/", getUsuarios)
userRoutes.post("/", login)

