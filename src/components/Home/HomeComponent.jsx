import styles from './HomeComponent.module.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleFlowRefund = () => {
    navigate("/home/flow-refund")
  }

  const handleHistory = () => {
    navigate('/home/HistoryUser')
  }
  return (

    <div className={styles.component}>
      <Button className={styles.button_refund} size="lg" onClick={handleFlowRefund}>Solicitar novo reembolso</Button>
      <Button className={styles.button_refund} size="lg" onClick={handleHistory}>Histórico de reembolso</Button>
    </div>
  )
}

export default HomeComponent