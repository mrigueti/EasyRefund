import express from 'express';
import cors from 'cors';
import { usuariosRouter } from "./routes/usuarios.js";
import 'dotenv/config';
import { unidadesRouter } from './routes/unidades.js';
import { cargosSetoresUnidadesRouter } from './routes/cargosSetoresUnidades.js';
import { solicitacoesRouter } from './routes/solicitacoes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/api/usuarios", usuariosRouter);
app.use("/api/unidades", unidadesRouter)
app.use("/api/cargos-setores-unidades", cargosSetoresUnidadesRouter)
app.use("/api/solicitacoes", solicitacoesRouter)
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send("Oi, tá funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
