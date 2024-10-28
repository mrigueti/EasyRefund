import styles from "./FlowRefundComponent.module.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const FlowRefundComponent = () => {
  const navigate = useNavigate();

  const handleUploadDocument = () => {
    navigate("/home/flow-refund/upload-document");
  };

  const handleBtnBackPage = () => {
    navigate(-1);
  };

  return (
    <div className={styles.component}>
      <button
        className={`${styles.infoButtonBack} ${styles.button_back_position}`}
        onClick={handleBtnBackPage}
      >
        <span className={styles.infoArrow}>&larr;</span> Voltar
      </button>
      <Button
        className={styles.button_refund}
        size="lg"
        onClick={handleUploadDocument}
      >
        Reembolso Dedutível
      </Button>
      <Button
        className={styles.button_refund}
        size="lg"
        onClick={handleUploadDocument}
      >
        Reembolso Não Dedutível
      </Button>
    </div>
  );
};

export default FlowRefundComponent;
