import styles from "./Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const dataRegister = {
    cpf: "00000000000",
    name: "gabryel",
    email: "gabryel@gmail.com",
    password: "abcABC1!",
    confirmPassword: "abcABC1!",
  };

  const [cpfRegisterP, setCpfRegister] = useState("");
  const [nameRegisterP, setNameRegister] = useState("");
  const [emailRegisterP, setEmailRegister] = useState("");
  const [passwordRegisterP, setPasswordRegister] = useState("");
  const [confirmPasswordRegisterP, setConfirmPasswordRegister] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleRegisterPermission = (e) => {
    e.preventDefault();

    if (!cpfRegisterP || !nameRegisterP || !emailRegisterP || !passwordRegisterP || !confirmPasswordRegisterP) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (cpfRegisterP.length < 11) {
      alert("Insira todos os números do CPF");
      return;
    }

    if (!validatePassword(passwordRegisterP)) {
      alert("A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.");
      return;
    }

    if (passwordRegisterP !== confirmPasswordRegisterP) {
      alert("As senhas não correspondem!");
      return;
    }

    if (
      cpfRegisterP === dataRegister.cpf &&
      nameRegisterP.toLowerCase() === dataRegister.name &&
      emailRegisterP.toLowerCase() === dataRegister.email &&
      passwordRegisterP === dataRegister.password
    ) {
      alert(`Cadastro realizado com sucesso!\nBem-vindo, ${dataRegister.name}`);
      navigate("/");
    } else {
      alert("Não foi possível efetuar o cadastro!");
    }
  };

  const handleBackPageLogin = () => {
    navigate("/");
  };

  const handleCpfChange = (e) => {
    const value = e.target.value;
    setCpfRegister(value.replace(/\D/g, ""));
  };

  return (
    <div className={styles.RegisterPermission}>
      <form>
        <h1>Cadastro EasyRefund</h1>
        <div className={styles.RegisterCpfInput}>
          <div className={styles.IconInput}></div>
          <input
            type="text"
            name="cpfRegisterP"
            id="cpfRegisterP"
            placeholder="CPF"
            value={cpfRegisterP}
            onChange={handleCpfChange}
            required
            maxLength={11}
          />
        </div>
        <div className={styles.RegisterNameInput}>
          <div className={styles.IconInput}></div>
          <input
            type="text"
            name="nameRegisterP"
            id="nameRegisterP"
            placeholder="Nome"
            value={nameRegisterP}
            onChange={(e) => setNameRegister(e.target.value)}
            required
          />
        </div>
        <div className={styles.RegisterEmailInput}>
          <div className={styles.IconInput}></div>
          <input
            type="email"
            name="emailRegisterP"
            id="emailRegisterP"
            placeholder="E-mail"
            value={emailRegisterP}
            onChange={(e) => setEmailRegister(e.target.value)}
            required
          />
        </div>
        <div className={styles.RegisterPasswordInput}>
          <div className={styles.IconInput}></div>
          <input
            type="password"
            name="passwordRegisterP"
            id="passwordRegisterP"
            placeholder="Senha"
            value={passwordRegisterP}
            onChange={(e) => setPasswordRegister(e.target.value)}
            required
          />
        </div>
        <div className={styles.RegisterConfirmPasswordInput}>
          <div className={styles.IconInput}></div>
          <input
            type="password"
            name="confirmPasswordRegisterP"
            id="confirmPasswordRegisterP"
            placeholder="Confirme sua senha"
            value={confirmPasswordRegisterP}
            onChange={(e) => setConfirmPasswordRegister(e.target.value)}
            required
          />
        </div>
        <div className={styles.RegisterBtnRegister}>
          <button type="submit" onClick={handleRegisterPermission}>
            Cadastrar
          </button>
        </div>
        <div className={styles.RegisterBtnLogin}>
          <button type="button" onClick={handleBackPageLogin}>
            Já tem uma conta? Faça Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
