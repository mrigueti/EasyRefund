import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Modal } from 'react-bootstrap'; // Importando Modal
import { XCircleFill } from 'react-bootstrap-icons';
import styles from '../GlobalCSS/Template.module.css';
import notification from '../../icons/notifications.png';
import logo from '../../icons/logo_easy.png'
import logout from '../../icons/logout.png';
import perfil from '../../icons/perfil.png';
import UploadDocumentComponent from '../../components/UploadDocument/UploadDocumentComponent';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function UploadDocument() {
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

  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para o modal de notificações
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para o modal de logout

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleBtnLogout = () => {
    setShowLogoutModal(true); // Exibe o modal de confirmação de logout
  };

  const handleBtnPerfilUser = () => {
    navigate("/InformationUser");
  };

  // Funções para abrir e fechar o modal de notificações
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Funções para abrir e fechar o modal de logout
  const handleCloseLogoutModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar_main}>
        <div className={styles.navbar_left}><img src={logo} style={{ height: '60px', width: '60px' }} /></div>
        <div className={styles.navbar_right}>
          <div className={styles.perfil_div} onClick={handleBtnPerfilUser} role="button" aria-label="User Profile">
            <img src={perfil} alt="User Icon" />
            <div className={styles.perfil_div_text}>
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
        {/* Componente para Upload de Documentos */}
        <UploadDocumentComponent />
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

      {/* Modal de Confirmação de Logout */}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
        <Modal.Header closeButton>
          <Modal.Title>Fechar o sistema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você deseja realmente fechar o sistema?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleConfirmLogout}>
            Sim
          </Button>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
