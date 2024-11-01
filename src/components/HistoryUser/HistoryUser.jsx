import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import Styles from "./HistoryUser.module.css";
import { useState } from "react";
import exports from "../../icons/export.png"; // Importando ícone de exportação

const HistoryUser = () => {
  const navigate = useNavigate();

  const [modalData, setModalData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("Todas"); // Estado para o filtro

  const handleRowClick = (data) => {
    setModalData(data);
    setModalVisible(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`ID da Requisição: ${modalData.id}`, 10, 10);
    doc.text(`Nome do Aprovador: ${modalData.approver}`, 10, 20);
    doc.text(`Dia da Aprovação: ${formatDate(modalData.approvalDate)}`, 10, 30); // Formata a data
    doc.text(`Valor Aprovado: ${modalData.approvedAmount}`, 10, 40);
    doc.text(`Valor Solicitado: ${modalData.requestedAmount}`, 10, 50);
    doc.text(`Status: ${modalData.status}`, 10, 60);
    doc.save("solicitacao.pdf");
  };

  const handleExportAllToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    let y = 10;

    doc.setFontSize(18);
    doc.text("Histórico de Reembolsos", 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text("ID da Requisição", 10, y);
    doc.text("Nome do Aprovador", 50, y);
    doc.text("Dia da Aprovação", 100, y);
    doc.text("Valor Aprovado", 150, y);
    doc.text("Status", 190, y);
    y += 10;

    doc.line(10, y, 200, y);
    y += 5;

    refundRequests.forEach((request) => {
      doc.text(request.id, 10, y);
      doc.text(request.approver, 50, y);
      doc.text(formatDate(request.approvalDate), 100, y); // Formata a data
      doc.text(request.approvedAmount, 150, y);
      doc.text(request.status, 190, y);
      y += 8;

      doc.line(10, y, 200, y);
      y += 5;

      if (y > 280) {
        doc.addPage();
        y = 10;
        doc.setFontSize(18);
        doc.text("Histórico de Reembolsos", 10, y);
        y += 10;
        doc.setFontSize(12);
        doc.text("ID da Requisição", 10, y);
        doc.text("Nome do Aprovador", 50, y);
        doc.text("Dia da Aprovação", 100, y);
        doc.text("Valor Aprovado", 150, y);
        doc.text("Status", 190, y);
        y += 10;
        doc.line(10, y, 200, y);
        y += 5;
      }
    });

    doc.save("historico_reembolsos.pdf");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalData(null);
  };

  const refundRequests = [
    {
      id: "#15267",
      approver: "John Doe",
      approvalDate: "Mar 1, 2023",
      approvedAmount: "$100",
      requestedAmount: "$100",
      status: "Aceita",
    },
    {
      id: "#26540",
      approver: "Jane Smith",
      approvalDate: "Jan 26, 2023",
      approvedAmount: "$300",
      requestedAmount: "$300",
      status: "Negada",
    },
    {
      id: "#98754",
      approver: "Jane Smith",
      approvalDate: "Jan 26, 2023",
      approvedAmount: "$200",
      requestedAmount: "$300",
      status: "Pendente",
    },
    {
      id: "#51482",
      approver: "Jane Smith",
      approvalDate: "Jan 26, 2023",
      approvedAmount: "$400",
      requestedAmount: "$300",
      status: "Revisar",
    },
  ];

  // Filtra as solicitações com base no status selecionado
  const filteredRequests = refundRequests.filter((request) => {
    if (filter === "Todas") return true;
    return request.status === filter;
  });

  const handleBtnBackPage = () => {
    navigate(-1);
  };

  return (
    <div className={Styles.RefundContainer}>
      <div className={Styles.RefundHeader}>
        <button
          className={`${Styles.infoButtonBack} ${Styles.button_back_position}`}
          onClick={handleBtnBackPage}
        >
          <span className={Styles.infoArrow}>&larr;</span> Voltar
        </button>
        <div className={Styles.RefundTotalRequested}>
          <span>Total Solicitado</span>
          <h2>$1600</h2>
        </div>
      </div>

      <div className={Styles.RefundHistory}>
        <h3>Histórico de Reembolso</h3>

        {/* Botões de filtro */}
        <div className={Styles.BtnContainer}>
          <button
            className={Styles.BtnFilter}
            onClick={() => setFilter("Todas")}
          >
            Todas
          </button>
          <button
            className={Styles.BtnFilter}
            onClick={() => setFilter("Aceita")}
          >
            Aceitas
          </button>
          <button
            className={Styles.BtnFilter}
            onClick={() => setFilter("Negada")}
          >
            Negadas
          </button>
          <button
            className={Styles.BtnFilter}
            onClick={() => setFilter("Pendente")}
          >
            Pendentes
          </button>
          <button
            className={Styles.BtnFilter}
            onClick={() => setFilter("Revisar")}
          >
            Revisar
          </button>
        </div>

        <button className={Styles.btnExportAll} onClick={handleExportAllToPDF}>
          <img src={exports} alt="Exportar" /> Exportar Todos
        </button>
        <table className={Styles.RefundTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Status</th>
              <th>Quantia</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id} onClick={() => handleRowClick(request)}>
                <td>{request.id}</td>
                <td>{formatDate(request.approvalDate)}</td> {/* Formata a data */}
                <td>
                  <span
                    className={`${Styles.StatusBadge} ${getStatusClass(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </td>
                <td>{request.approvedAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalVisible && (
          <div className={Styles.ModalOverlay}>
            <div className={Styles.ModalContent}>
              <h2>Detalhes da Solicitação</h2>
              <p>ID da Requisição: {modalData.id}</p>
              <p>Nome do Aprovador: {modalData.approver}</p>
              <p>Dia da Aprovação: {formatDate(modalData.approvalDate)}</p> {/* Formata a data */}
              <p>Valor Aprovado: {modalData.approvedAmount}</p>
              <p>Valor Solicitado: {modalData.requestedAmount}</p>
              <p>Status: {modalData.status}</p>
              <button onClick={handleExportToPDF}>Exportar para PDF</button>
              <button className={Styles.closeButton} onClick={handleCloseModal}>
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Função para obter a classe de status correspondente
const getStatusClass = (status) => {
  switch (status) {
    case "Aceita":
      return Styles.RefundAccepted;
    case "Negada":
      return Styles.RefundRejected;
    case "Pendente":
      return Styles.RefundPending;
    case "Revisar":
      return Styles.RefundReview;
    default:
      return "";
  }
};

export default HistoryUser;
