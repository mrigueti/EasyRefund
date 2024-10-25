import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import user from '../../icons/user.png';
import lock from '../../icons/cadeado.png';

const Login = () => {
  const navigate = useNavigate();

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

  const [namePermission, setNamePermission] = useState("");
  const [passwordPermission, setPasswordPermission] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false); // Verifica se é gerente ou admin

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
        navigate("/manegement");
      } else if (namePermission === userFuncionario.nameFunc && passwordPermission === userFuncionario.passwordFun) {
        navigate("/Home");
      } else if (
        (namePermission === userGerente.nameGerente && passwordPermission === userGerente.passwordGerente) ||
        (namePermission === userAdmin.nameAdmin && passwordPermission === userAdmin.passwordAdmin)
      ) {
        setIsAuthorized(true); // Gerente ou Admin autorizados
        navigate("/manager");
      } else {
        setNameError("Usuário ou senha incorretos.");
        setPasswordError("Usuário ou senha incorretos.");
      }
      setLoading(false);
    }, 1000); // Simulando um atraso de 1 segundo
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
          <button type="submit" onClick={handleBtnLogin} disabled={loading}>
            {loading ? "Entrando...." : "Login"}
          </button>
        </div>
        
        {/*Só exibe o botão de cadastro se o usuário for o gerente ou administrador */}
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


// import styles from "./Login.module.css";
// import { useNavigate } from "react-router-dom";
// import { useState } from 'react';
// import user from '../../icons/user.png';
// import lock from '../../icons/cadeado.png';

// const Login = () => {
//   const navigate = useNavigate();

//   const userPermission = {
//     name: "Gabryel",
//     password: "abc"
//   };

//   const userFuncionario = {
//     nameFunc: "Lucas",
//     passwordFun: "abc"
//   }

//   // const userGerente = {
//   //   nameGerente: "Maykel",
//   //   passwordGerente: "abc"
//   // }

//   const [namePermission, setNamePermission] = useState("");
//   const [passwordPermission, setPasswordPermission] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleBtnLogin = (e) => {
//     e.preventDefault();
//     setNameError("");
//     setPasswordError("");

//     if (!namePermission && !passwordPermission) {
//       setNameError("Usuário não pode estar vazio.");
//       setPasswordError("Senha não pode estar vazia.");
//       return;
//     }

//     if (!namePermission) {
//       setNameError("Usuário não pode estar vazio.");
//       return;
//     }

//     if (!passwordPermission) {
//       setPasswordError("Senha não pode estar vazia.");
//       return;
//     }

//     setLoading(true)

//       setTimeout(() => {
//       if (namePermission === userPermission.name && passwordPermission === userPermission.password) {
//         navigate("/manegement");
//       } else if (namePermission === userFuncionario.nameFunc && passwordPermission === userFuncionario.passwordFun) {
//         navigate("/Home");
//       } else {
//         setNameError("Usuário ou senha incorretos.");
//         setPasswordError("Usuário ou senha incorretos.");
//       }
//       setLoading(false);  // Desativando loading
//     }, 1000); // Simulando um atraso de 1 segundo
//   };


//   const handleRegisterPage = () => {
//     navigate("/register");
//   };

//   const handleChangePassword = () => {
//     navigate("/change-password");
//   };

//   return (
//     <div className={styles.LoginPermission}>
//       <form>
//         <h1>Bem-vindo ao EasyRefund</h1>
//         <div className={styles.UserInput}>
//           <input
//             type="text"
//             id="namePermission"
//             name="namePermission"
//             placeholder="Usuário"
//             value={namePermission}
//             onChange={(e) => setNamePermission(e.target.value)}
//           />
//           <img src={user} alt="icone de usuario" className={styles.Icon} />
//         </div>
//         {nameError && <div className={styles.errorAlert}>{nameError}</div>}
//         <div className={styles.UserPassword}>
//           <input
//             type="password"
//             name="passwordPermission"
//             id="passwordPermission"
//             placeholder="Senha"
//             value={passwordPermission}
//             onChange={(e) => setPasswordPermission(e.target.value)}
//           />
//           <img src={lock} alt="icone da senha" className={styles.Icon} />
//         </div>
//         {passwordError && <div className={styles.errorAlert}>{passwordError}</div>}
//         <div className={styles.BtnLogin}>
//           <button type="submit" onClick={handleBtnLogin}>
//             {loading ? "Entrando...." : "Login"}
//           </button>
//         </div>
//         <div className={styles.BtnCreateAccount}>
//           <button type="button" onClick={handleRegisterPage}>Cadastrar-se</button>
//         </div>
//         <div className={styles.BtnForgotPassword}>
//           <button type="button" onClick={handleChangePassword}>Trocar a Senha</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;