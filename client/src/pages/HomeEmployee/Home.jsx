import React, { useState, useEffect } from 'react'; // Importando useState e useEffect
import styles from '../GlobalCSS/Template.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; // Importando Modal do Bootstrap
import notification from '../../icons/notifications.png';
import logout from '../../icons/logout.png';
import perfil from '../../icons/perfil.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeComponent from '../../components/Home/HomeComponent';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Recupera o token do sessionStorage
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.nome);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

  // Estados para controle dos modais
  const [showModal, setShowModal] = useState(false); // Modal de Notificação
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal de Logout

  // Funções para controle do modal de logout
  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleConfirmLogout = () => {
    sessionStorage.clear(); // Limpa o sessionStorage
    navigate('/'); // Redireciona para a página de login
  };

  // Função para abrir o modal de notificações
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Função para logout
  const handleBtnLogout = () => {
    handleShowLogoutModal(); // Exibe o modal de logout
  };

  // Função para abrir a página de informações do usuário
  const handleBtnPerfilUser = () => {
    navigate('/InformationUser');
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar_main}>
        <div className={styles.navbar_left}></div>
        <div className={styles.navbar_right}>
          <div className={styles.perfil_div}>
            <img src={perfil} alt="Perfil" />
            <div className={styles.perfil_div_text} onClick={handleBtnPerfilUser}>
              <h1>{userName}</h1>
              <p>{userRole}</p>
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

        {/* Componente de Informações */}
        <HomeComponent />

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

        {/* Modal de Logout */}
        <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
          <Modal.Header closeButton>
            <Modal.Title>Deseja sair?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Você realmente deseja sair do sistema? 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleConfirmLogout}>
              Sair
            </Button>
            <Button variant="secondary" onClick={handleCloseLogoutModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
