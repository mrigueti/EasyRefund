import { db } from "../db.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

// export const getUsuarios = (_, res) => {
//   const q = `SELECT role_nome FROM usuarios WHERE email_usuario = ?`;

//   db.query(q, (err, data) => {
//     if (err)
//       return res.json(err);

//     return res.status(200).json(data);
//   })
// }

export const login = (req, res) => {
  const { email, senha } = req.body;
  const q = `SELECT * FROM usuarios WHERE email_usuario = ?`
  
  db.query(q, [email], (err, data) => {
    if(err)
      return res.status(500).json({ error: "Erro no servidor."});
    if(data.length === 0)
      return res.status(404).json({error: "Usuário não encontrado"})
    
    const user = data[0];
    
    //Verificando tela com o bcrypt
    const senhaCorreta = bcrypt.compareSync(senha, user.senha)
    if (!senhaCorreta){
      return res.status(401).json({error: "Senha incorreta."})
    }

    // Gerando um token JWT
    const token = jwt.sign({ id: user.id }, 'easyrefund987', { expiresIn: '1h' });

    return res.status(200).json({ message: "Login bem-sucedido!", token });
  })
}

// Precisa finalizar, mudanças na tela
// export const addUsuario = (req, res) => {
//   const nameRegisterP = req.body.nameRegisterP
//   const roleRegisterP = req.body.roleRegisterP
//   const sectorRegisterP = req.body.sectorRegisterP
//   const locationRegisterP = req.body.locationRegisterP
//   const emailRegisterP = req.body.emailRegisterP
//   const userRole = req.body.userRole


//   const sql = `INSERT INTO usuarios(??, ??, ??, ??, ??, ??) VALUES (?,
//   ? , ?, ?, ?, ?)`;
//   const data = ['nome_usuario', 'email_usuario', 'senha_usuario',
//     'id_cargo', 'role_name', nameRegisterP, emailRegisterP, '123456', , ]
// }