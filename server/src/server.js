import express from 'express';
import cors from 'cors';
import { usuariosRouter } from "./routes/usuarios.js";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Confirme que a rota foi configurada corretamente
app.use("/login", usuariosRouter);

app.get('/', (req, res) => {
  res.send("Oi, tá funcionando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
