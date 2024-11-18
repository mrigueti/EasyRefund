import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import { createSolicitacao, getAllSolicitacoes } from '../controllers/solicitacoes.js';
import multer from 'multer';

export const solicitacoesRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const userId = req.body.id_usuario;
    cb(null, userId + '-' + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

solicitacoesRouter.post('/create', upload.single('anexo_nf'), checkAuth('Funcionário'), createSolicitacao);
solicitacoesRouter.get('/getAll', getAllSolicitacoes)