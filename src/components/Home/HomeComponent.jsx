import styles from './HomeComponent.module.css'
import Button from 'react-bootstrap/Button';
import notification from '../../icons/notifications.png'
import logout from '../../icons/logout.png'
import perfil from '../../icons/perfil.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleFlowRefund = () => {
    navigate("/home/flow-refund")
  }

  return (

    <div className={styles.component}>
      <Button className={styles.button_refund} size="lg" onClick={handleFlowRefund}>Solicitar novo reembolso</Button>
      <Button className={styles.button_refund} size="lg" onClick={handleFlowRefund}>Histórico de reembolso</Button>
    </div>
  )
}

export default HomeComponent