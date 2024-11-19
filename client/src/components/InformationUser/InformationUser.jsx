import styles from "./InformationUser.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import document from '../../icons/document.png';
import user from '../../icons/user.png';
import email from '../../icons/email.png';
import { jwtDecode } from 'jwt-decode'; // Corrigindo para o nome correto da importação

const InformationUser = () => {
  const navigate = useNavigate();

  const handleBtnBackPage = (e) => {
    e.preventDefault(); // Impede que o formulário seja enviado
    navigate(-1);
  };

  const [informationName, setInformationName] = useState("");
  const [informationCPF, setInformationCPF] = useState("");
  const [informationEmail, setInformationEmail] = useState("");
  const [previousEmail, setPreviousEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    cpf: "",
    name: "",
    email: "",
  });
  const [message, setMessage] = useState(""); // Estado para mensagem de sucesso ou erro

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        fetch(`http://localhost:3001/api/usuarios/get/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.user) {
              setInformationName(data.user.nome_usuario);
              setInformationCPF(data.user.cpf_usuario);
              setInformationEmail(data.user.email_usuario);
              setPreviousEmail(data.user.email_usuario);
            }
          })
          .catch((err) => {
            console.error("Erro ao buscar dados do usuário:", err);
          });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  const handleSaveChange = (e) => {
    e.preventDefault();
    setErrorMessages({ cpf: "", name: "", email: "" });
    setMessage("");

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
    } else if (
      !informationEmail.includes("@") ||
      (!informationEmail.endsWith(".com") && !informationEmail.endsWith(".br"))
    ) {
      setErrorMessages((prev) => ({
        ...prev,
        email: "O email deve conter '@' e terminar com '.com' ou '.br'",
      }));
      hasError = true;
    }

    if (informationCPF.length < 11) {
      setErrorMessages((prev) => ({
        ...prev,
        cpf: "Insira todos os números do CPF",
      }));
      hasError = true;
    }

    if (hasError) {
      setMessage("Erro: Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        fetch(`http://localhost:3001/api/usuarios/update/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nome_usuario: informationName,
            cpf_usuario: informationCPF,
            email_usuario: informationEmail,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setMessage("Dados atualizados com sucesso!");
              setInformationName("");
              setInformationCPF("");
              setInformationEmail("");
              setPreviousEmail("");
            } else {
              setMessage(data.message || "Erro ao atualizar os dados.");
            }
          })
          .catch((err) => {
            console.error("Erro ao atualizar os dados:", err);
            setMessage("Erro ao atualizar os dados.");
          });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  };

  return (
    <div className={styles.infoContainer}>
      <form className={styles.infoProfileEdit}>
        <header className={styles.infoProfileHeader}>
          <button type="button" className={styles.infoButtonBack} onClick={handleBtnBackPage}>
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
              required
            />
          </div>
          {errorMessages.cpf && <div className={styles.errorAlert}>{errorMessages.cpf}</div>}
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
          {errorMessages.name && <div className={styles.errorAlert}>{errorMessages.name}</div>}
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
          {errorMessages.email && <div className={styles.errorAlert}>{errorMessages.email}</div>}
        </div>

        <div className={styles.RegisterInputContainer}>
          {message && (
            <div
              className={`${styles.alertMessage} ${message.includes("Erro") ? styles.error : styles.success
                }`}
            >
              <span className={styles.icon}>
                {message.includes("Erro") ? "❌" : "✅"}
              </span>
              {message}
            </div>
          )}
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
