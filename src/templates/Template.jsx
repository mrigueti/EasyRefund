import styles from './Template.module.css'
import Button from 'react-bootstrap/Button';
import lupa from '../icons/search.png'
import notification from '../icons/notifications.png'
import settings from '../icons/settings.png'
import logout from '../icons/logout.png'
import question from '../icons/question.png'
import perfil from '../icons/perfil.png'
import 'bootstrap/dist/css/bootstrap.min.css';


const Template = () => {
  return (
    //Navbar
    <div className={styles.main}>
      <div className={styles.navbar_main}>
        <div className={styles.navbar_left}>
        <div className={styles.perfil_div}>
            <img src={perfil}></img>
            <div className={styles.perfil_div_text}>
              <h1>Nome de Usuário</h1>
              <p>Perfil de Acesso</p>
            </div>
          </div>
        </div>
        <div className={styles.navbar_right}>
          <div className={styles.icon_navbar_div}>
            <img src={lupa}></img>
          </div>
          <h1>Título</h1>
          <div className={styles.icon_navbar_div}>
            <img src={notification}></img>
          </div>
        </div>
      </div>
      <div className={styles.content_main}>
        <div className={styles.content_left}>
          <div className={styles.options_div}>
            <img src={question}></img>
            <h2>Ajuda</h2>
          </div>
          <div className={styles.options_div}>
            <img src={settings}></img>
            <h2>Configurações</h2>
          </div>
          <div className={styles.options_div}>
            <img src={logout}></img>
            <h2>Sair</h2>
          </div>

        </div>
        <div className={styles.content_right}>
          {/* Insira o conteúdo aqui */}

        </div>
      </div>
    </div>
  )
}

export default Template