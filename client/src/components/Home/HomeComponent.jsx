import styles from "./HomeComponent.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleFlowRefund = () => {
    navigate("/home/flow-refund");
  };

  const handleHistory = () => {
    navigate("/home/HistoryUser");
  };
  return (
    <div className={styles.component}>
      <button
        className={styles.RequestNewReimbursement }
        size="lg"
        onClick={handleFlowRefund}
      >
        Solicitar novo reembolso
      </button>

      <button
        className={styles.ReimbursementHistory }
        size="lg"
        onClick={handleHistory}
      >
        Histórico de reembolso
      </button>
    </div>
  );
};

export default HomeComponent;
