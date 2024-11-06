import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import user from '../../icons/user.png';
import lock from '../../icons/cadeado.png';
import axios from 'axios';

const url_login = 'http://localhost:3001/login';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [namePermission, setNamePermission] = useState("");
  const [passwordPermission, setPasswordPermission] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url_login, {
        method: "POST",
        body: JSON.stringify({ email, senha }),
        headers: { "Content-Type": "application/json" },
      });
      
      const responseJson = await response.json();
      console.log(responseJson);
      // const response = await fetch(url_login, { email, senha });
      localStorage.setItem('token', response.data.token); // salva token no web storage
      alert('Login bem-sucedido!');

    } catch (error) {
      setError(error.response?.data?.error || "Erro ao fazer login.");
    }
  };

  const userPermission = {
    name: "Gabryel",
    password: "abc"
  };

  const userFuncionario = {
    nameFunc: "Lucas",
    passwordFun: "abc"
  };

  const userGerente = {
    nameGerente: "Maykel",
    passwordGerente: "abc"
  };

  const userAdmin = {
    nameAdmin: "Gregy",
    passwordAdmin: "abc"
  };

  const handleBtnLogin = (e) => {
    e.preventDefault();
    setNameError("");
    setPasswordError("");

    if (!namePermission && !passwordPermission) {
      setNameError("Usuário não pode estar vazio.");
      setPasswordError("Senha não pode estar vazia.");
      return;
    }

    if (!namePermission) {
      setNameError("Usuário não pode estar vazio.");
      return;
    }

    if (!passwordPermission) {
      setPasswordError("Senha não pode estar vazia.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (namePermission === userPermission.name && passwordPermission === userPermission.password) {
        navigate("/management");
      } else if (namePermission === userFuncionario.nameFunc && passwordPermission === userFuncionario.passwordFun) {
        navigate("/Home");
      } else if (
        (namePermission === userGerente.nameGerente && passwordPermission === userGerente.passwordGerente) ||
        (namePermission === userAdmin.nameAdmin && passwordPermission === userAdmin.passwordAdmin)
      ) {
        setIsAuthorized(true);
        navigate("/manager");
      } else {
        setNameError("Usuário ou senha incorretos.");
        setPasswordError("Usuário ou senha incorretos.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegisterPage = () => {
    navigate("/register");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <div className={styles.LoginPermission}>
      <form>
        <h1>Bem-vindo ao EasyRefund</h1>
        <div className={styles.UserInput}>
          <input
            type="email"
            id="namePermission"
            name="namePermission"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <img src={user} alt="icone de usuario" className={styles.Icon} />
        </div>
        {nameError && <div className={styles.errorAlert}>{nameError}</div>}
        <div className={styles.UserPassword}>
          <input
            type="password"
            name="passwordPermission"
            id="passwordPermission"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <img src={lock} alt="icone da senha" className={styles.Icon} />
        </div>
        {passwordError && <div className={styles.errorAlert}>{passwordError}</div>}
        <div className={styles.BtnLogin}>
          <button type="submit" onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando...." : "Login"}
          </button>
        </div>
        
        {isAuthorized && (
          <div className={styles.BtnCreateAccount}>
            <button type="button" onClick={handleRegisterPage}>Cadastrar-se</button>
          </div>
        )}

        <div className={styles.BtnForgotPassword}>
          <button type="button" onClick={handleChangePassword}>Trocar a Senha</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
