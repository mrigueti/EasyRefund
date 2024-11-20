import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import logo_login from '../../icons/logo_login.png'
import user from '../../icons/user.png';
import lock from '../../icons/cadeado.png';

const url_login = 'http://localhost:3001/api/usuarios/login';

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
    setNameError("");
    setPasswordError("");

    if (!email) {
      setNameError("Usuário não pode estar vazio.");
    }
    if (!senha) {
      setPasswordError("Senha não pode estar vazia.");
    }
    if (!email || !senha) {
      return;
    }

    try {
      const response = await fetch(url_login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const responseJson = await response.json();

      if (responseJson.token) {
        sessionStorage.setItem('token', responseJson.token)
      }

      if (response.status === 401) {
        setPasswordError("Email ou Senha incorretos.");
        return;
      }

      const primeiroLogin = (senha) => {
        if (senha == "123456") {
          navigate("/change-password")
        }
      }

      if (responseJson.user.role_nome === "Aprovador") {
        navigate("/manegement");
        primeiroLogin(senha)
      } else if (responseJson.user.role_nome === "Funcionário") {
        navigate("/Home");
        primeiroLogin(senha)
      } else if (responseJson.user.role_nome === "Gerente") {
        navigate("/manager");
        primeiroLogin(senha)
      }

      //console.log("Login bem-sucedido!");

    } catch (error) {
      setNameError("Erro ao fazer login. Verifique os dados inseridos.");
      console.error("Erro no login:", error);
    }
  };

  const handleRegisterPage = () => {
    navigate("/register");
  };

  return (
    <div className={styles.LoginPermission}>
      <div style={{ justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo_login} style={{ height: '200px', width: '400px', justifyContent: 'center', alignItems: 'center' }} />
      </div>
      <form>
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
      </form>
    </div>
  );
};

export default Login;
