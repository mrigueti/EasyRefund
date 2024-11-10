import styles from "./FlowRefundComponent.module.css";
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
      <button
        className={styles.BtnDeductible}
        onClick={handleUploadDocument}
      >
        Reembolso Dedutível
        </button>
      <button
        className={styles.BtnNonDeductible}
        size="lg"
        onClick={handleUploadDocument}
      >
        Reembolso não Dedutível
        </button>
    </div>
  );
};

export default FlowRefundComponent;
