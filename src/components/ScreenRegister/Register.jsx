import styles from "./Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../../icons/user.png";
import email from "../../icons/email.png";
import lock from "../../icons/cadeado.png";
import sector from "../../icons/setor.png";
import role from "../../icons/cargo.png";
import location from "../../icons/unidade.png";

const Register = () => {
  const navigate = useNavigate();

  const handleBtnBackPage = () => {
    navigate(-1);
  };

  const dataRegister = {
    name: "gabryel",
    role: "aprovador",
    sector: "administrativo",
    location: "vitoria",
    email: "gabryel@gmail.com",
    password: "123456",
  };

  // const [cpfRegisterP, setCpfRegister] = useState("");
  const [nameRegisterP, setNameRegister] = useState("");
  const [roleRegisterP, setRoleRegisterP] = useState("");
  const [sectorRegisterP, setSectorRegisterP] = useState("");
  const [locationRegisterP, setLocationRegisterP] = useState("");
  const [emailRegisterP, setEmailRegister] = useState("");
  const [passwordRegisterP, setPasswordRegister] = useState("");
  const [errors, setErrors] = useState({});
  const [registrationError, setRegistrationError] = useState(false);

  const alertError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleRegisterPermission = (e) => {
    e.preventDefault();
    setErrors({});
    setRegistrationError(false); // Reseta o estado de erro de cadastro

    // if (!cpfRegisterP) {
    //   // Mensagem se CPF estiver vazio
    //   alertError("cpf", "O campo CPF não pode estar vazio!");
    // } else if (cpfRegisterP.length > 0 && cpfRegisterP.length < 11) {
    //   // Mensagem se CPF tiver entre 1 e 10 números
    //   alertError("cpf", "Insira todos os números do CPF");
    // } else if (cpfRegisterP.length === 11) {
    //   // Verifica se o CPF tem 11 números
    //   if (cpfRegisterP.length < 11) {
    //     alertError("cpf", "Insira todos os números do CPF");
    //   }
    // }

    if (!nameRegisterP) {
      alertError("name", "O campo Nome não pode estar vazio!");
    }

    if (!roleRegisterP) {
      alertError("role", "O campo Cargo não pode estar vazio");
    }

    if (!sectorRegisterP) {
      alertError("sector", " O campo de Setor não pode estar vazio");
    }

    if (!locationRegisterP) {
      alertError("location", "O campo Unidade não pode estar vazio");
    }

    if (!emailRegisterP) {
      alertError("email", "O campo E-mail não pode estar vazio!");
    }

    if (!passwordRegisterP) {
      alertError("password", "a senha não pode estar vazio!");
    }

    // Verificação final para garantir que não haja erros antes de cadastrar
    if (
      !errors.name &&
      !errors.role &&
      !errors.sector &&
      !errors.location &&
      !errors.email &&
      !errors.password
    ) {
      if (
        // cpfRegisterP === dataRegister.cpf &&
        nameRegisterP.toLowerCase() === dataRegister.name &&
        roleRegisterP.toLowerCase() === dataRegister.role &&
        sectorRegisterP.toLowerCase() === dataRegister.sector &&
        locationRegisterP.toLowerCase() === dataRegister.location &&
        emailRegisterP.toLowerCase() === dataRegister.email &&
        passwordRegisterP === dataRegister.password
      ) {
        alert(
          `Cadastro realizado com sucesso!\nBem-vindo, ${dataRegister.name}`
        );
        navigate("/");
      } else {
        setRegistrationError(true); // Ativa a mensagem de erro de cadastro se os dados não corresponderem
      }
    }
  };

  // const handleCpfChange = (e) => {
  //   const value = e.target.value;
  //   setCpfRegister(value.replace(/\D/g, ""));
  // };

  return (
    <div className={styles.RegisterPermission}>
      <button
        className={`${styles.infoButtonBack} ${styles.button_back_position}`}
        onClick={handleBtnBackPage}
      >
        <span className={styles.infoArrow}>&larr;</span> Voltar
      </button>
      <form>
        <h1>Cadastrar Usuário</h1>
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
          {errors.name && (
            <div className={styles.errorAlert}>{errors.name}</div>
          )}
        </div>
        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={role} alt="User Icon" className={styles.Icon} />
            <input
              type="text"
              name="roleRegisterP"
              placeholder="Cargo"
              value={roleRegisterP}
              onChange={(e) => setRoleRegisterP(e.target.value)}
              required
            />
          </div>
          {errors.name && (
            <div className={styles.errorAlert}>{errors.role}</div>
          )}
        </div>
        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={sector} alt="User Icon" className={styles.Icon} />
            <input
              type="text"
              name="sectorRegisterP"
              placeholder="Setor"
              value={sectorRegisterP}
              onChange={(e) => setSectorRegisterP(e.target.value)}
              required
            />
          </div>
          {errors.name && (
            <div className={styles.errorAlert}>{errors.sector}</div>
          )}
        </div>
        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={location} alt="User Icon" className={styles.Icon} />
            <input
              type="text"
              name="locationRegisterP"
              placeholder="Unidade"
              value={locationRegisterP}
              onChange={(e) => setLocationRegisterP(e.target.value)}
              required
            />
          </div>
          {errors.name && (
            <div className={styles.errorAlert}>{errors.location}</div>
          )}
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
          {errors.email && (
            <div className={styles.errorAlert}>{errors.email}</div>
          )}
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
          {errors.password && (
            <div className={styles.errorAlert}>{errors.password}</div>
          )}
        </div>
        {registrationError && (
          <div className={styles.errorAlert}>
            Não foi possível efetuar o cadastro!
          </div>
        )}{" "}
        {/* Mensagem de erro de cadastro */}
        <div className={styles.RegisterBtnRegister}>
          <button type="submit" onClick={handleRegisterPermission}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
