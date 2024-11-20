import React, { useState, useEffect } from 'react';
import styles from '../GlobalCSS/Template.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import notification from '../../icons/notifications.png';
import logout from '../../icons/logout.png';
import perfil from '../../icons/perfil.png';
import logo from '../../icons/logo_easy.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import InformationUser from '../../components/InformationUser/InformationUser.jsx';
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

  // Estado para controlar a visibilidade do modal de logout
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleConfirmLogout = () => {
    sessionStorage.clear(); // Limpa o sessionStorage
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar_main}>
        <div className={styles.navbar_left}><img src={logo} style={{height: '60px', width: '60px'}}/></div>
        <div className={styles.navbar_right}>
          <div className={styles.perfil_div}>
            <img src={perfil} alt="Perfil" />
            <div className={styles.perfil_div_text}>
              <h1>{userName}</h1>
              <p>{userRole}</p>
            </div>
          </div>
          <div className={styles.icon_navbar_div}>
            <img src={notification} alt="Notificações" />
          </div>
        </div>
      </div>

      <div className={styles.content_main}>
        <div className={styles.content_left}>
          <div className={styles.options_div}>
            <img src={logout} alt="Logout" onClick={handleShowLogoutModal} />
          </div>
        </div>

        {/* Componente de Informação do Usuário */}
        <InformationUser />
      </div>

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
  );
};

export default Home;
