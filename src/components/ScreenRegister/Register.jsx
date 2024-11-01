import styles from "./Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../../icons/user.png";
import email from "../../icons/email.png";
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

  const [nameRegisterP, setNameRegister] = useState("");
  const [roleRegisterP, setRoleRegisterP] = useState("");
  const [sectorRegisterP, setSectorRegisterP] = useState("");
  const [locationRegisterP, setLocationRegisterP] = useState("");
  const [emailRegisterP, setEmailRegister] = useState("");
  const [errors, setErrors] = useState({});
  const [registrationError, setRegistrationError] = useState(false);

  const alertError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleRegisterPermission = (e) => {
    e.preventDefault();
    setErrors({});
    setRegistrationError(false);

    if (!nameRegisterP) {
      alertError("name", "O campo Nome não pode estar vazio!");
    }
    if (!roleRegisterP) {
      alertError("role", "O campo Cargo não pode estar vazio");
    }
    if (!sectorRegisterP) {
      alertError("sector", "O campo de Setor não pode estar vazio");
    }
    if (!locationRegisterP) {
      alertError("location", "O campo Unidade não pode estar vazio");
    }
    if (!emailRegisterP) {
      alertError("email", "O campo E-mail não pode estar vazio!");
    }

    const checkboxes = document.getElementsByName("userRole");
    const isCheckboxChecked = Array.from(checkboxes).some(
      (checkbox) => checkbox.checked
    );
    if (!isCheckboxChecked) {
      alertError("checkbox", "Selecione pelo menos uma função.");
    }

    if (
      !errors.name &&
      !errors.role &&
      !errors.sector &&
      !errors.location &&
      !errors.email &&
      !errors.checkbox
    ) {
      if (
        nameRegisterP.toUpperCase() === dataRegister.name &&
        roleRegisterP.toUpperCase() === dataRegister.role &&
        sectorRegisterP.toUpperCase() === dataRegister.sector &&
        locationRegisterP.toUpperCase() === dataRegister.location &&
        emailRegisterP.toUpperCase() === dataRegister.email
      ) {
        alert(`Cadastro realizado com sucesso!\nBem-vindo, ${dataRegister.name}`);
      } else {
        setRegistrationError(true);
      }
    }
  };

  const handleCheckboxChange = (e) => {
    const checkboxes = document.getElementsByName("userRole");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    e.target.checked = true;
  };

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
          {errors.role && (
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
          {errors.sector && (
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
          {errors.location && (
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
        <div className={styles.CheckBox}>
          <div className={styles.CheckFuncUser}>
            <input
              type="checkbox"
              name="userRole"
              onChange={handleCheckboxChange}
            />{" "}
            Funcionário
          </div>
          <div className={styles.CheckPermUser}>
            <input
              type="checkbox"
              name="userRole"
              onChange={handleCheckboxChange}
            />{" "}
            Liberador
          </div>
          <div className={styles.CheckManagerUser}>
            <input
              type="checkbox"
              name="userRole"
              onChange={handleCheckboxChange}
            />{" "}
            Gerente
          </div>
        </div>
        {errors.checkbox && (
          <div className={styles.errorAlert}>{errors.checkbox}</div>
        )}
        <div className={styles.RegisterBtnRegister}>
          {registrationError && (
            <div className={styles.errorAlert}>
              Não foi possível efetuar o cadastro!
            </div>
          )}

          <button type="submit" onClick={handleRegisterPermission}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
