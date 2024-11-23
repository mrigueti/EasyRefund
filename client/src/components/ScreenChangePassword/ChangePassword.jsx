import styles from "./ChangePassword.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Modal, Button } from "react-bootstrap"; // Importação correta do Modal e Button

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  async function alterarSenha(senhaAtual, novaSenha, confirmarSenha) {
    try {
      if (novaSenha !== confirmarSenha) {
        throw new Error("A nova senha e a confirmação não coincidem.");
      }

      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const response = await fetch(`http://localhost:3001/api/usuarios/update-password/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao alterar a senha.");
      }

      const result = await response.json();

      // Exibir modal de sucesso
      setModalMessage("A senha foi alterada com sucesso!");
      setShowModal(true);
      setTimeout(() => {
        navigate("/"); // Redireciona para a página de login após 2 segundos
      }, 2000);
    } catch (error) {
      console.error("Erro:", error.message);
      setModalMessage(`Erro: ${error.message}`);
      setShowModal(true);
    }
  }

  const handleConfirmPasswordChange = (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setModalMessage("Por favor, preencha todos os campos.");
      setShowModal(true);
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}":;'\[\]|<>?,.`~\-\/]).{6,}$/;

    if (!passwordPattern.test(newPassword)) {
      setModalMessage("A nova senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.");
      setShowModal(true);
      return;
    }

    if (confirmNewPassword.length < 6) {
      setModalMessage("A confirmação de senha deve ter pelo menos 6 caracteres.");
      setShowModal(true);
      return;
    }

    if (currentPassword === newPassword) {
      setModalMessage("A nova senha não pode ser igual à senha atual.");
      setShowModal(true);
      return;
    }

    if (currentPassword && newPassword === confirmNewPassword) {
      alterarSenha(currentPassword, newPassword, confirmNewPassword);
    } else {
      setModalMessage("Senha atual incorreta ou as novas senhas não são iguais!");
      setShowModal(true);
    }
  };

  const handleLoginPage = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleCloseModal = (shouldNavigate) => {
    setShowModal(false);
    if (shouldNavigate) {
      navigate("/"); // Redireciona para a página de login
    }
  };

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
          <button type="button" onClick={handleConfirmPasswordChange}>
            Confirmar troca de senha
          </button>
        </div>
        <div className={styles.BtnLogin}>
          <button type="button" onClick={handleLoginPage}>Faça seu login</button>
        </div>
      </form>

      {/* Modal de Confirmação */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Solução concluída com sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
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

export default ChangePassword;
