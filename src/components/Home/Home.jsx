import styles from './Home.module.css'
import Button from 'react-bootstrap/Button';
import notification from '../../icons/notifications.png'
import logout from '../../icons/logout.png'
import perfil from '../../icons/perfil.png'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
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
            <img src={logout}></img>
          </div>

        </div>
        <div className={styles.content_right}>
          <Button className={styles.button_refund} size="lg">Solicitar novo reembolso</Button>
          <Button className={styles.button_refund} size="lg">Histórico de reembolso</Button>
        </div>
      </div>
    </div>
  )
}

export default Home