import styles from "./InformationUser.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InformationUser = () => {
  const navigate = useNavigate();

  const [informationName, setInformationName] = useState();
  const [informationCPF, setInformationCPF] = useState();
  const [informationEmail, setInformationEmail] = useState();

  const handleSalveChange = (e) => {
    e.preventDefault();
    // lógica para salvar as mudanças
  };

  const handleBtnBackPage = () => {
    navigate("/manegement")
  }

  return (
    <div className={styles.container}>
      <form className={styles.profileEdit}>
        <header className={styles.profileHeader}>
          <button className={styles.buttonBack} onClick={handleBtnBackPage}>
            <span className={styles.arrow}>&larr;</span> Voltar
          </button>
          <h1>Editar Perfil</h1>
        </header>
        
        <div className={styles.formGroup}>
          <label htmlFor="informationCPF">CPF:</label>
          <input
            type="text"
            name="informationCPF"
            id="informationCPF"
            value={informationCPF}
            onChange={(e) => setInformationCPF(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="informationName">Nome:</label>
          <input
            type="text"
            name="informationName"
            id="informationName"
            value={informationName}
            onChange={(e) => setInformationName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="informationEmail">Email:</label>
          <input
            type="email"
            name="informationEmail"
            id="informationEmail"
            value={informationEmail}
            onChange={(e) => setInformationEmail(e.target.value)}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.buttonSave} onClick={handleSalveChange}>
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default InformationUser;
