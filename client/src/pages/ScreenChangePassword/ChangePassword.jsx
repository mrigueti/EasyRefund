import styles from "./ChangePassword.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import lock from '../../icons/cadeado.png'; // Importando o ícone de cadeado

const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const passwords = {
    current: "Abcd1#",
  };

  const handleConfirmPasswordChange = (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    let hasError = false; // Para rastrear se houve algum erro

    // Validação dos campos
    if (!currentPassword) {
      setCurrentPasswordError("O campo senha atual não pode ser vazio.");
      hasError = true; // Marca erro
    }

    if (!newPassword) {
      setNewPasswordError("O campo nova senha não pode ser vazio.");
      hasError = true; // Marca erro
    }

    if (!confirmNewPassword) {
      setConfirmPasswordError("O campo confirme sua senha não pode ser vazio.");
      hasError = true; // Marca erro
    }

    // Se houve algum erro, não continua a validação
    if (hasError) return;

    // Verificação para nova senha
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}":;'\[\]|<>?,.`~\-\/]).{6,}$/;
    if (!passwordPattern.test(newPassword)) {
      setNewPasswordError("A nova senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.");
      return; // Sai da função se houver erro
    }

    // Verificação para confirmação de senha
    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError("A confirmação de senha deve ser igual à nova senha.");
      return; // Sai da função se houver erro
    }

    // Verificação para a senha atual
    if (currentPassword !== passwords.current) {
      setCurrentPasswordError("Senha atual incorreta.");
      return; // Sai da função se houver erro
    }

    // Se todas as validações passarem
    alert("Senha trocada com sucesso!");
    navigate("/");
  };

  const handleLoginPage = (e) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className={styles.ChangePasswordPermission}>
      <form className={styles.ChangePasswordForm}>
        <h1>Troca de Senha</h1>
        <div className={styles.InputCurrentPassword}>
          <img src={lock} alt="Ícone de cadeado" className={styles.Icon} />
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Senha Atual"
            required
          />
        </div>
        {currentPasswordError && <div className={styles.ErrorMessage}>{currentPasswordError}</div>}
        
        <div className={styles.InputNewPassword}>
          <img src={lock} alt="Ícone de cadeado" className={styles.Icon} />
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nova Senha"
            required
          />
        </div>
        {newPasswordError && <div className={styles.ErrorMessage}>{newPasswordError}</div>}
        
        <div className={styles.InputConfirmNewPassword}>
          <img src={lock} alt="Ícone de cadeado" className={styles.Icon} />
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirme sua senha"
            required
          />
        </div>
        {confirmPasswordError && <div className={styles.ErrorMessage}>{confirmPasswordError}</div>}

        <div className={styles.BtnChangePassword}>
          <button type="button" onClick={handleConfirmPasswordChange}>
            Confirmar troca de senha
          </button>
        </div>
        <div className={styles.BtnLogin}>
          <button type="button" onClick={handleLoginPage}>Faça seu login</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
