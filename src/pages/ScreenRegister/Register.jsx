import styles from "./Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from '../../icons/user.png';
import email from '../../icons/email.png';
import document from '../../icons/document.png';
import lock from '../../icons/cadeado.png';

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
  const [errors, setErrors] = useState({}); 
  const [registrationError, setRegistrationError] = useState(false); // Novo estado para controle de erro de cadastro

  const alertError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleRegisterPermission = (e) => {
    e.preventDefault();
    setErrors({});
    setRegistrationError(false); // Reseta o estado de erro de cadastro

    if (!cpfRegisterP) {
      alertError("cpf", "O campo CPF não pode estar vazio!");
    }

    if (!nameRegisterP) {
      alertError("name", "O campo Nome não pode estar vazio!");
    }

    if (!emailRegisterP) {
      alertError("email", "O campo E-mail não pode estar vazio!");
    }

    if (cpfRegisterP.length < 11) {
      alertError("cpf", "Insira todos os números do CPF");
    }

    if (!validatePassword(passwordRegisterP)) {
      alertError("password", "A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.");
    }

    if (passwordRegisterP !== confirmPasswordRegisterP) {
      alertError("confirmPassword", "As senhas não correspondem!");
    }

    // Verificação final para garantir que não haja erros antes de cadastrar
    if (
      !errors.cpf &&
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      if (
        cpfRegisterP === dataRegister.cpf &&
        nameRegisterP.toLowerCase() === dataRegister.name &&
        emailRegisterP.toLowerCase() === dataRegister.email &&
        passwordRegisterP === dataRegister.password
      ) {
        alert(`Cadastro realizado com sucesso!\nBem-vindo, ${dataRegister.name}`);
        navigate("/");
      } else {
        setRegistrationError(true); // Ativa a mensagem de erro de cadastro se os dados não corresponderem
      }
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

        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterCpfInput}>
            <img src={document} alt="CPF Icon" className={styles.Icon} />
            <input
              type="text"
              name="cpfRegisterP"
              placeholder="CPF"
              value={cpfRegisterP}
              onChange={handleCpfChange}
              required
              maxLength={11}
            />
          </div>
          {errors.cpf && <div className={styles.errorAlert}>{errors.cpf}</div>}
        </div>

        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={user} alt="User Icon" className={styles.Icon} />
            <input
              type="text"
              name="nameRegisterP"
              placeholder="Nome"
              value={nameRegisterP}
              onChange={(e) => setNameRegister(e.target.value)}
              required
            />
          </div>
          {errors.name && <div className={styles.errorAlert}>{errors.name}</div>}
        </div>

        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterEmailInput}>
            <img src={email} alt="Email Icon" className={styles.Icon} />
            <input
              type="email"
              name="emailRegisterP"
              placeholder="E-mail"
              value={emailRegisterP}
              onChange={(e) => setEmailRegister(e.target.value)}
              required
            />
          </div>
          {errors.email && <div className={styles.errorAlert}>{errors.email}</div>}
        </div>

        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterPasswordInput}>
            <img src={lock} alt="Password Icon" className={styles.Icon} />
            <input
              type="password"
              name="passwordRegisterP"
              placeholder="Senha"
              value={passwordRegisterP}
              onChange={(e) => setPasswordRegister(e.target.value)}
              required
            />
          </div>
          {errors.password && <div className={styles.errorAlert}>{errors.password}</div>}
        </div>

        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterConfirmPasswordInput}>
            <img src={lock} alt="Confirm Password Icon" className={styles.Icon} />
            <input
              type="password"
              name="confirmPasswordRegisterP"
              placeholder="Confirme sua senha"
              value={confirmPasswordRegisterP}
              onChange={(e) => setConfirmPasswordRegister(e.target.value)}
              required
            />
          </div>
          {errors.confirmPassword && <div className={styles.errorAlert}>{errors.confirmPassword}</div>}
        </div>

        {registrationError && <div className={styles.errorAlert}>Não foi possível efetuar o cadastro!</div>} {/* Mensagem de erro de cadastro */}

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
