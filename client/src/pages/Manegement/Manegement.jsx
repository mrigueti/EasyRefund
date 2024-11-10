import React, { useState } from 'react';
import styles from '../GlobalCSS/Template.module.css';
import notification from '../../icons/notifications.png';
import logout from '../../icons/logout.png';
import perfil from '../../icons/perfil.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import ManegementComponent from '../../components/Manegement/PageManegementComponent';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Home = () => {
  const navigate = useNavigate();

  // Estado para controlar a visibilidade do modal
  const [showModal, setShowModal] = useState(false);

  const handleBtnLogout = () => {
    if (window.confirm("Deseja realmente fechar o site?")) {
      sessionStorage.clear();
      navigate("/");
    }
  };

  const handleBtnPerfilUser = () => {
    navigate("/InformationUser");
  };

  // Funções para abrir e fechar o modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={styles.main}>
      <div className={styles.navbar_main}>
        <div className={styles.navbar_left}></div>
        <div className={styles.navbar_right}>
          <div className={styles.perfil_div}>
            <img src={perfil} alt="Perfil" />
            <div className={styles.perfil_div_text} onClick={handleBtnPerfilUser}>
              <h1>Nome de Usuário</h1>
              <p>Perfil de Acesso</p>
            </div>
          </div>
          <div className={styles.icon_navbar_div} onClick={handleShowModal}>
            <img src={notification} alt="Notificações" />
          </div>
        </div>
      </div>

      <div className={styles.content_main}>
        <div className={styles.content_left}>
          <div className={styles.options_div}>
            <img src={logout} alt="Logout" onClick={handleBtnLogout} />
          </div>
        </div>

        {/* Componente Principal de Gerenciamento */}
        <ManegementComponent />
      </div>

      {/* Modal de Notificações */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Notificações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você tem novas notificações!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Marcar como lida
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
