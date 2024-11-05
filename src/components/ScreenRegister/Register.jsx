import styles from "./Register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "../../icons/user.png";
import email from "../../icons/email.png";
import sector from "../../icons/setor.png";
import role from "../../icons/cargo.png";
import location from "../../icons/unidade.png";
import { Modal, Button } from "react-bootstrap"; // Importando o Modal e o Button

const Register = () => {
  const navigate = useNavigate();

  const handleBtnBackPage = () => {
    navigate(-1);
  };

  const [nameRegisterP, setNameRegister] = useState("");
  const [roleRegisterP, setRoleRegisterP] = useState("");
  const [sectorRegisterP, setSectorRegisterP] = useState("");
  const [locationRegisterP, setLocationRegisterP] = useState("");
  const [emailRegisterP, setEmailRegister] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // Estado para o modal de confirmação
  const [selectedRadioButton, setSelectedRadioButton] = useState("");
  const [registrationError, setRegistrationError] = useState(false);

  const handleRegisterPermission = (e) => {
    e.preventDefault();
    setErrors({});
    setRegistrationError(false);

    // Resetando a variável de erro
    let hasError = false;

    // Se não houver erros, prosseguir com o cadastro
    if (!hasError) {
      // Limpar os campos após o cadastro
      setNameRegister("");
      setRoleRegisterP("");
      setSectorRegisterP("");
      setLocationRegisterP("");
      setEmailRegister("");
      setSelectedRadioButton("");
      setShowModal(true); // Mostrar modal de confirmação
    } else {
      setRegistrationError(true);
    }
  };

  const handleCloseModal = (sendAnother) => {
    setShowModal(false); // Fecha o modal
    if (!sendAnother) {
      handleBtnBackPage(); // Volta à página anterior
    }
  };

  return (
    <div className={styles.RegisterPermission}>
      <button
        className={`${styles.infoButtonBack} ${styles.button_back_position}`}
        onClick={handleBtnBackPage}
      >
        <span className={styles.infoArrow}>&larr;</span> Voltar
      </button>
      <form onSubmit={handleRegisterPermission}>
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
            <img src={role} alt="Role Icon" className={styles.Icon} />
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
            <img src={sector} alt="Sector Icon" className={styles.Icon} />
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
            <img src={location} alt="Location Icon" className={styles.Icon} />
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
              type="radio"
              name="userRole"
              value="Funcionário"
              checked={selectedRadioButton === "Funcionário"}
              onChange={(e) => setSelectedRadioButton(e.target.value)}
            />
            Funcionário
          </div>
          <div className={styles.CheckPermUser}>
            <input
              type="radio"
              name="userRole"
              value="Liberador"
              checked={selectedRadioButton === "Liberador"}
              onChange={(e) => setSelectedRadioButton(e.target.value)}
            />
            Liberador
          </div>
          <div className={styles.CheckManagerUser}>
            <input
              type="radio"
              name="userRole"
              value="Gerente"
              checked={selectedRadioButton === "Gerente"}
              onChange={(e) => setSelectedRadioButton(e.target.value)}
            />
            Gerente
          </div>
        </div>
        {errors.checkbox && (
          <div className={styles.errorAlert}>{errors.checkbox}</div>
        )}
        <div className={styles.RegisterBtnRegister}>
          {registrationError && (
            <div className={styles.errorAlert}>
              Não foi possível efetuar o cadastro! Verifique os dados inseridos.
            </div>
          )}
          <button type="submit" className={styles.BtnRegisterUser}>
            Cadastrar
          </button>
        </div>
      </form>
      {/* Modal de confirmação */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro realizado com sucesso!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você gostaria cadastrar um novo usuário?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal(false)}>
            Não
          </Button>
          <Button variant="primary" onClick={() => handleCloseModal(true)}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
