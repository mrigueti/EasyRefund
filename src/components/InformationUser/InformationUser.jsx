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
  const [previousEmail, setPreviousEmail] = useState(""); // Estado para o e-mail anterior
  const [errorMessages, setErrorMessages] = useState({
    cpf: "",
    name: "",
    email: "",
  });

  const handleSaveChange = (e) => {
    e.preventDefault();
    // Limpar mensagens de erro
    setErrorMessages({ cpf: "", name: "", email: "" });

    // Verificações de campos vazios
    let hasError = false;

    if (informationCPF === "") {
      setErrorMessages((prev) => ({ ...prev, cpf: "O campo CPF está vazio" }));
      hasError = true;
    }

    if (informationName === "") {
      setErrorMessages((prev) => ({ ...prev, name: "O campo Nome está vazio" }));
      hasError = true;
    }

    if (informationEmail === "") {
      setErrorMessages((prev) => ({ ...prev, email: "O campo Email está vazio" }));
      hasError = true;
    } else {
      // Verificar se o email contém "@" e termina com ".com" ou ".br"
      if (!informationEmail.includes('@') || (!informationEmail.endsWith('.com') && !informationEmail.endsWith('.br'))) {
        setErrorMessages((prev) => ({ ...prev, email: "O email deve conter '@' e terminar com '.com' ou '.br'" }));
        hasError = true;
      }
    }

    if (informationCPF.length < 11) {
      setErrorMessages((prev) => ({ ...prev, cpf: "Insira todos os números do CPF" }));
      hasError = true;
    }

    // Se houver erros, não salvar e mostrar alerta
    if (hasError) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Verificar se o novo e-mail é igual ao e-mail anterior
    if (informationEmail === previousEmail) {
      setErrorMessages((prev) => ({ ...prev, email: "O novo e-mail não pode ser igual ao anterior" }));
      alert("O novo e-mail não pode ser igual ao anterior.");
      return;
    }

    // Se as validações passarem, aqui você pode adicionar a lógica para salvar as mudanças
    alert("Dados salvos com sucesso!"); // Exemplo de ação após salvar

    // Limpar os campos após salvar
    setInformationName("");
    setInformationCPF("");
    setInformationEmail("");
    
    // Atualizar o e-mail anterior após salvar
    setPreviousEmail(informationEmail);
  };

  const handleBtnBackPage = () => {
    navigate("/manegement");
    //se, o usuario for o liberador, ele vai voltar para a pagina ("manegement")
    //se não for o liberador, irá voltar para a home ou para a pagina anterior que estava.
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
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setInformationCPF(value);
              }}
              maxLength={11} // Limita o CPF a 11 dígitos
              required
            />
          </div>
          {errorMessages.cpf && <div className={styles.errorAlert}>{errorMessages.cpf}</div>} {/* Mensagem de erro para CPF */}
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
          {errorMessages.name && <div className={styles.errorAlert}>{errorMessages.name}</div>} {/* Mensagem de erro para Nome */}
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
          {errorMessages.email && <div className={styles.errorAlert}>{errorMessages.email}</div>} {/* Mensagem de erro para Email */}
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
