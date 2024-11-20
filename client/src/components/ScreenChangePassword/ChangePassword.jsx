import styles from "./ChangePassword.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  async function alterarSenha(senhaAtual, novaSenha, confirmarSenha) {
    try {
      if (novaSenha !== confirmarSenha) {
        throw new Error("A nova senha e a confirmação não coincidem.");
      }

      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
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
    } catch (error) {
      console.error("Erro:", error.message);
    }
  }

  const handleConfirmPasswordChange = (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}":;'\[\]|<>?,.`~\-\/]).{6,}$/;

    if (!passwordPattern.test(newPassword)) {
      alert("A nova senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.");
      return;
    }

    if (confirmNewPassword.length < 6) {
      alert("A confirmação de senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (currentPassword === newPassword) {
      alert("A nova senha não pode ser igual à senha atual.");
      return;
    }

    if (currentPassword === passwords.current && newPassword === confirmNewPassword) {
      console.log("Cheguei");
      
      alterarSenha(currentPassword, newPassword, confirmNewPassword)
    } else {
      alert("Senha atual incorreta ou as novas senhas não são iguais!");
    }
  };

  const handleLoginPage = (e) => {
    e.preventDefault();
    navigate("/")
  }

  return (
    <div className={styles.ChangePasswordPermission}>
      <form className={styles.ChangePasswordForm}>
        <h1>Troca de Senha</h1>
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
        </div>

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
