import express from "express"
import { userRoutes } from "./routes/usuarios.js"
import cors from "cors"

const app = express()
const PORT = 3001;

app.use(express.json())
app.use(cors())

app.use("/login", userRoutes)

app.use("/", (req, res) => {
  res.send("Foi meu mano")
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}/`);
});