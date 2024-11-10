import styles from '../GlobalCSS/Template.module.css'
import Button from 'react-bootstrap/Button';
import notification from '../../icons/notifications.png'
import logout from '../../icons/logout.png'
import perfil from '../../icons/perfil.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import PermissionComponent from '../../components/Permission/PermissionComponent.jsx';
import { useNavigate } from 'react-router-dom';
import InformationUser from '../../components/InformationUser/InformationUser.jsx';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';

const Home = () => {
  const navigate = useNavigate()

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
  const [showModal, setShowModal] = useState(false);

  const handleBtnLogout = () => {
    if (window.confirm("Deseja realmente fechar o site?")) {
      sessionStorage.clear();
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
              <h1>{userName}</h1>
              <p>{userRole}</p>
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

        {/* Insira o Component aqui: */}
        <InformationUser />

      </div>
    </div>
  )
}

export default Home