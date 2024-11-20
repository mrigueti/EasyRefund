import styles from "./ChangePassword.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import user from '../../icons/user.png';
import lock from '../../icons/cadeado.png';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errorMessages, setErrorMessages] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Função para alterar a senha
  const alterarSenha = async (senhaAtual, novaSenha, confirmarSenha) => {
    try {
      if (novaSenha !== confirmarSenha) {
        setErrorMessages((prevState) => ({
          ...prevState,
          confirmNewPassword: "A nova senha e a confirmação não coincidem.",
        }));
        return;
      }

      const token = sessionStorage.getItem("token");
      if (!token) {
        setErrorMessages((prevState) => ({
          ...prevState,
          currentPassword: "Token não encontrado. Faça login novamente.",
        }));
        return;
      }

      // Decodifica o token para obter o id_usuario
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      // Faz o fetch para a rota de alteração de senha
      const response = await fetch(`http://localhost:3001/api/usuarios/update-password/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclui o token para autenticação
        },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao alterar a senha.");
      }

      const result = await response.json();
      console.log("Senha alterada com sucesso:", result);
      
      // Limpando sessionStorage e redirecionando para a página inicial
      sessionStorage.clear();
      alert("Senha alterada com sucesso.")
      navigate("/");

    } catch (error) {
      console.error("Erro:", error.message);
      setErrorMessages((prevState) => ({
        ...prevState,
        currentPassword: error.message, // Exibe a mensagem de erro no campo correspondente
      }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    e.preventDefault();

    // Limpar mensagens de erro antes de nova validação
    setErrorMessages({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMessages((prevState) => ({
        ...prevState,
        currentPassword: "Por favor, preencha todos os campos.",
      }));
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}":;'\[\]|<>?,.`~\-\/]).{6,}$/;

    if (!passwordPattern.test(newPassword)) {
      setErrorMessages((prevState) => ({
        ...prevState,
        newPassword: "A nova senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.",
      }));
      return;
    }

    if (confirmNewPassword.length < 6) {
      setErrorMessages((prevState) => ({
        ...prevState,
        confirmNewPassword: "A confirmação de senha deve ter pelo menos 6 caracteres.",
      }));
      return;
    }

    if (currentPassword === newPassword) {
      setErrorMessages((prevState) => ({
        ...prevState,
        newPassword: "A nova senha não pode ser igual à senha atual.",
      }));
      return;
    }

    alterarSenha(currentPassword, newPassword, confirmNewPassword);
  };

  const handleLoginPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className={styles.ChangePasswordPermission}>
      <form className={styles.ChangePasswordForm}>
        <h1>Troca de Senha</h1>
        {errorMessages.newPassword && (
            <div className={styles.ErrorMessage}>{errorMessages.newPassword}</div>
          )}
          {errorMessages.confirmNewPassword && (
            <div className={styles.ErrorMessage}>{errorMessages.confirmNewPassword}</div>
          )}
          {errorMessages.currentPassword && (
            <div className={styles.ErrorMessage}>{errorMessages.currentPassword}</div>
          )}
        <div className={styles.InputCurrentPassword}>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Senha Atual"
            required
          />
          <img src={user} alt="icone de usuario" className={styles.Icon} />
        </div>
        <div className={styles.InputNewPassword}>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nova Senha"
            required
          />
          <img src={lock} alt="icone da senha" className={styles.Icon} />
        </div>
        <div className={styles.InputConfirmNewPassword}>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirme sua senha"
            required
          />
          <img src={lock} alt="icone da senha" className={styles.Icon} />
        </div>

        <div className={styles.BtnChangePassword}>
          <button type="submit" onClick={handleConfirmPasswordChange}>
            Confirmar troca de senha
          </button>
        </div>
        <div className={styles.BtnLogin}>
          <button type="button" onClick={handleLoginPage}>Agora não</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
