import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import styles from "./InformationUser.module.css";
import document from '../../icons/document.png';
import user from '../../icons/user.png';
import email from '../../icons/email.png';

const InformationUser = () => {
  const navigate = useNavigate();
  const [informationName, setInformationName] = useState("");
  const [informationCPF, setInformationCPF] = useState("");
  const [informationEmail, setInformationEmail] = useState("");
  const [previousEmail, setPreviousEmail] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    cpf: "",
    name: "",
    email: "",
  });
  const [message, setMessage] = useState("");

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

  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  const handleSaveChange = (e) => {
    e.preventDefault();
    setErrorMessages({ cpf: "", name: "", email: "" });
    setMessage("");

    let hasError = false;

    if (informationCPF.trim() === "") {
      setErrorMessages((prev) => ({ ...prev, cpf: "O campo CPF está vazio" }));
      hasError = true;
    } else if (informationCPF.length !== 11 || !validateCPF(informationCPF)) {
      setErrorMessages((prev) => ({ ...prev, cpf: "CPF inválido" }));
      hasError = true;
    }

    if (informationName.trim() === "") {
      setErrorMessages((prev) => ({ ...prev, name: "O campo Nome está vazio" }));
      hasError = true;
    }

    if (informationEmail.trim() === "") {
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

    if (hasError) {
      setMessage("Erro: Por favor, preencha todos os campos obrigatórios corretamente.");
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
        setMessage("Erro ao processar a solicitação.");
      }
    }
  };

  const handleBtnBackPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <div className={styles.infoContainer}>
      <form className={styles.infoProfileEdit} onSubmit={handleSaveChange}>
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
              maxLength={11}  
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
              required
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
              required
            />
          </div>
          {errorMessages.email && <div className={styles.errorAlert}>{errorMessages.email}</div>}
        </div>

        <div className={styles.RegisterInputContainer}>
          {message && (
            <div
              className={`${styles.alertMessage} ${message.includes("Erro") ? styles.error : styles.success}`}
            >
              <span className={styles.icon}>
                {message.includes("Erro") ? "❌" : "✅"}
              </span>
              {message}
            </div>
          )}
        </div>

        <div className={styles.infoButtonGroup}>
          <button type="submit" className={styles.infoButtonSave}>
            Salvar
          </button>
        </div>

        <div className={styles.BtnForgotPassword}>
          <button type="button" onClick={handleChangePassword}>Trocar a Senha</button>
        </div>
      </form>
    </div>
  );
};

export default InformationUser;

