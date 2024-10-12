import styles from '../GlobalCSS/Template.module.css'
import notification from '../../icons/notifications.png'
import logout from '../../icons/logout.png'
import perfil from '../../icons/perfil.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import ManegementComponent from '../../components/Manegement/PageManegementComponent';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate()

  const handleBtnLogout = () => {
    if(window.confirm("Deseja realmente fechar o site?")) {
      navigate("/")
    }
  }

  const handleBtnPerfilUser = () => {
    navigate("/InformationUser")
  }


  return (
    <div className={styles.main}>
      <div className={styles.navbar_main}>
        <div className={styles.navbar_left}>

        </div>
        <div className={styles.navbar_right}>
          <div className={styles.perfil_div}>
            <img src={perfil}></img>
            <div className={styles.perfil_div_text} onClick={handleBtnPerfilUser}>
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

        {/* Insira o Component aqui: */}
        <ManegementComponent />

      </div>
    </div>
  )
}

export default Home