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
    navigate("/Register")
  }

  const handleChangePassword = () => {
    navigate("/ChangePassword")
  }


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