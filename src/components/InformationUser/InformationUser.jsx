import styles from "./InformationUser.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import document from '../../icons/document.png';
import user from '../../icons/user.png';
import email from '../../icons/email.png';

const InformationUser = () => {
  const navigate = useNavigate();

  const [informationName, setInformationName] = useState("");
  const [informationCPF, setInformationCPF] = useState("");
  const [informationEmail, setInformationEmail] = useState("");

  const handleSaveChange = (e) => {
    e.preventDefault();
    // lógica para salvar as mudanças
  };

  const handleBtnBackPage = () => {
    navigate("/manegement");
  };

  return (
    <div className={styles.infoContainer}>
      <form className={styles.infoProfileEdit}>
        <header className={styles.infoProfileHeader}>
          <button className={styles.infoButtonBack} onClick={handleBtnBackPage}>
            <span className={styles.infoArrow}>&larr;</span> Voltar
          </button>
          <h1>Editar Perfil</h1>
        </header>
        
        <div className={styles.infoFormGroup}>
          <div className={styles.UserInput}>
            <img src={document} alt="icone de cpf" />
            <input
              type="text"
              name="informationCPF"
              id="informationCPF"
              placeholder="CPF"
              value={informationCPF}
              onChange={(e) => setInformationCPF(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.infoFormGroup}>
          <div className={styles.UserInput}>
            <img src={user} alt="icone de usuário" />
            <input
              type="text"
              name="informationName"
              id="informationName"
              placeholder="Nome"
              value={informationName}
              onChange={(e) => setInformationName(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.infoFormGroup}>
          <div className={styles.UserInput}>
            <img src={email} alt="icone de email" />
            <input
              type="email"
              name="informationEmail"
              id="informationEmail"
              placeholder="Email"
              value={informationEmail}
              onChange={(e) => setInformationEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.infoButtonGroup}>
          <button type="submit" className={styles.infoButtonSave} onClick={handleSaveChange}>
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default InformationUser;
