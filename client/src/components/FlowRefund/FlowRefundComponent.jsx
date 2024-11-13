import styles from "./FlowRefundComponent.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FlowRefundComponent = () => {
  const navigate = useNavigate();
  const [tipoDedutivel, setTipoDedutivel] = useState('')

  const handleUploadDocument = () => {
    navigate("/home/flow-refund/upload-document", {
      state: { tipoDedutivel }
    });
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
        value={true}
        onChange={(e) => setTipoDedutivel(e.target.value)}
      >
        Reembolso Dedutível
      </button>
      <button
        className={styles.BtnNonDeductible}
        size="lg"
        onClick={handleUploadDocument}
        value={false}
        onChange={(e) => setTipoDedutivel(e.target.value)}
      >
        Reembolso não Dedutível
      </button>
    </div>
  );
};

export default FlowRefundComponent;
