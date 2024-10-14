import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import user from '../../icons/user.png';
import lock from '../../icons/cadeado.png';

const Login = () => {
  const navigate = useNavigate();

  const UserPermission = {
    name: "Gabryel",
    password: "abc"
  };

  const [namePermission, setNamePermission] = useState("");
  const [passwordPermission, setPasswordPermission] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    if (namePermission === UserPermission.name && passwordPermission === UserPermission.password) {
      navigate("/manegement");
    } else {
      setNameError("Usuário ou senha incorretos.");
      setPasswordError("Usuário ou senha incorretos.");
    }
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
            type="text"
            id="namePermission"
            name="namePermission"
            placeholder="Usuário"
            value={namePermission}
            onChange={(e) => setNamePermission(e.target.value)}
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
            value={passwordPermission}
            onChange={(e) => setPasswordPermission(e.target.value)}
          />
          <img src={lock} alt="icone da senha" className={styles.Icon} />
        </div>
        {passwordError && <div className={styles.errorAlert}>{passwordError}</div>}
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
