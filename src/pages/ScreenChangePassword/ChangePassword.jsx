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
    nPassword: "Abcd2#",
    cPassword: "Abcd2#",
  };

  const handleConfirmPasswordChange = (e) => {
    e.preventDefault();
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    // Validação dos campos
    if (!currentPassword) {
      setCurrentPasswordError("Senha atual é obrigatória.");
      return; // Adicionado return para parar a execução
    }

    if (!newPassword) {
      setNewPasswordError("Nova senha é obrigatória.");
      return;
    }

    if (!confirmNewPassword) {
      setConfirmPasswordError("Confirmação de senha é obrigatória.");
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}":;'\[\]|<>?,.`~\-\/]).{6,}$/;

    if (!passwordPattern.test(newPassword)) {
      setNewPasswordError("A nova senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.");
      return;
    }

    if (confirmNewPassword.length < 6) {
      setConfirmPasswordError("A confirmação de senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (currentPassword === newPassword) {
      setNewPasswordError("A nova senha não pode ser igual à senha atual.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError("A confirmação de senha deve ser igual à nova senha.");
      return;
    }

    if (currentPassword === passwords.current) {
      alert("Senha trocada com sucesso!");
      navigate("/");
    } else {
      setCurrentPasswordError("Senha atual incorreta.");
    }
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
          <button type="submit" onClick={handleConfirmPasswordChange}>
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
