import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import styles from '../GlobalCSS/Template.module.css'
import notification from '../../icons/notifications.png'
import logout from '../../icons/logout.png'
import perfil from '../../icons/perfil.png'
import UploadDocumentComponent from '../../components/UploadDocument/UploadDocumentComponent'
import { useNavigate } from 'react-router-dom';

export default function UploadDocument() {
  const navigate = useNavigate()

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleBtnLogout = () => {
    if(window.confirm("Deseja realmente fechar o site?")) {
      navigate("/")
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.navbar_main}>
        <div className={styles.navbar_left}>

        </div>
        <div className={styles.navbar_right}>
          <div className={styles.perfil_div}>
            <img src={perfil}></img>
            <div className={styles.perfil_div_text}>
              <h1>Nome de Usuário</h1>
              <p>Perfil de Acesso</p>
            </div>
          </div>
          <div className={styles.icon_navbar_div}>
            <img src={notification}></img>
          </div>
        </div>
      </div>
      <div className={styles.content_main}>
        <div className={styles.content_left}>

          <div className={styles.options_div}>
            <img src={logout} onClick={handleBtnLogout}></img>
          </div>

        </div>
        {/* Insira o Component aqui */}
        <UploadDocumentComponent />
      </div>
    </div>
  );
}