import styles from './FlowRefundComponent.module.css'
import Button from 'react-bootstrap/Button';
import notification from '../../icons/notifications.png'
import logout from '../../icons/logout.png'
import perfil from '../../icons/perfil.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


const FlowRefundComponent = () => {
  const navigate = useNavigate();

  const handleUploadDocument = () => {
    navigate("/home/flow-refund/upload-document")
  }
  return (
        <div className={styles.component}>
          <Button className={styles.button_refund} size="lg" onClick={handleUploadDocument}>Reembolso Dedutível</Button>
          <Button className={styles.button_refund} size="lg" onClick={handleUploadDocument}>Reembolso Não Dedutível</Button>
        </div>
  )
}

export default FlowRefundComponent