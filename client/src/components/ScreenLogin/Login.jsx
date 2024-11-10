import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState} from 'react';



const Login = () => {
  const navigate = useNavigate();

  const UserPermission = {
    name: "Gabryel",
    password: "abc"
  };


  const [namePermission, setNamePermission] = useState("")
  const [passwordPermission, setPasswordPermission] = useState("")

  const handleBtnLogin = (e) => {
    e.preventDefault()


    if(!namePermission || !passwordPermission) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if(namePermission ===  UserPermission.name && passwordPermission === UserPermission.password){
      navigate("/manegement")
    } else {
      alert("Usuário ou senha incorretos!")
    }
  };

  const handleRegisterPage = () => {
    navigate("/register")
  }

  const handleChangePassword = () => {
    navigate("/change-password")
  }



  // const [email, setEmail] = useState('');
  // const [senha, setSenha] = useState('');
  // const [error, setError] = useState('');

  // const handleLogin = async (e) => {
  //   e.preventDefault(); // Previne o comportamento padrão do formulário.
  //   try {
  //     const response = await api.post('/login', { email, senha }); // Faz a requisição para o backend.
  //     localStorage.setItem('token', response.data.token); // armazena o token no localStorage.
  //     localStorage.setItem('userRole', response.data.userRole); // armazena o cargo do usuário.
  //     // !! TROCAR HREF !!
  //     window.location.href = '/'; 
  //   } catch (err) {
  //     setError('Email ou senha inválidos'); 
  //   }
  // };

  return (
    <div className={styles.LoginPermission}>
      <form>
      <h1>Bem-vindo ao EasyRefund</h1>
        <div className={styles.UserInput}>
          <input
            type="text"
            id="namePermission"
            name="namePermission"
            placeholder="Usuário"
            value={namePermission}
            onChange={(e) => setNamePermission(e.target.value)}          
            />
        </div>
        <div className={styles.UserPassword}>
          <input
            type="password"
            name="passwordPermission"
            id="passwordPermission"
            placeholder="Senha"
            value={passwordPermission}
            onChange={(e) => setPasswordPermission(e.target.value)}
          />
        </div>
        <div className={styles.BtnLogin}>
          <button type="submit" onClick={handleBtnLogin}>
            Login
          </button>
        </div>
        <div className={styles.BtnCreateAccount}>
        <button type="button" onClick={handleRegisterPage}>Cadastrar-se</button>
        </div>
        <div className={styles.BtnForgotPassword}>
            <button type="button" onClick={handleChangePassword}>Trocar a Senha</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
