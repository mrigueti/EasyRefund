import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Modal } from 'react-bootstrap'; // Importando Modal
import { XCircleFill } from 'react-bootstrap-icons';
import styles from '../GlobalCSS/Template.module.css';
import notification from '../../icons/notifications.png';
import logout from '../../icons/logout.png';
import perfil from '../../icons/perfil.png';
import UploadDocumentComponent from '../../components/UploadDocument/UploadDocumentComponent';
import { useNavigate } from 'react-router-dom';

export default function UploadDocument() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para o modal de notificações

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleBtnLogout = () => {
    if (window.confirm("Deseja realmente fechar o site?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  const handleShowModal = () => setShowModal(true); // Função para abrir o modal
  const handleCloseModal = () => setShowModal(false); // Função para fechar o modal

  return (
    <div className={styles.main}>
      <div className={styles.navbar_main}>
        <div className={styles.navbar_left}></div>
        <div className={styles.navbar_right}>
          <div className={styles.perfil_div} onClick={() => navigate("/InformationUser")}>
            <img src={perfil} alt="Perfil" />
            <div className={styles.perfil_div_text}>
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
        {/* Insira o Component aqui */}
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
    </div>
  );
}
