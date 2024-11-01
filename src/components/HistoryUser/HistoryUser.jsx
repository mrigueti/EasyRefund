import { jsPDF } from "jspdf";
import Styles from "./HistoryUser.module.css";
import { useState } from "react";
import exports from '../../icons/export.png'; // Importando ícone de exportação

const HistoryUser = () => {
  const [modalData, setModalData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleRowClick = (data) => {
    setModalData(data);
    setModalVisible(true);
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`ID da Requisição: ${modalData.id}`, 10, 10);
    doc.text(`Nome do Aprovador: ${modalData.approver}`, 10, 20);
    doc.text(`Dia da Aprovação: ${modalData.approvalDate}`, 10, 30);
    doc.text(`Valor Aprovado: ${modalData.approvedAmount}`, 10, 40);
    doc.text(`Valor Solicitado: ${modalData.requestedAmount}`, 10, 50);
    doc.text(`Status: ${modalData.status}`, 10, 60);
    doc.save("solicitacao.pdf");
  };

  const handleExportAllToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12); // Define o tamanho da fonte
    let y = 10; // Posição inicial do texto

    // Título do PDF
    doc.setFontSize(18);
    doc.text("Histórico de Reembolsos", 10, y);
    y += 10; // Espaçamento após o título

    // Cabeçalhos da tabela
    doc.setFontSize(12);
    doc.text("ID da Requisição", 10, y);
    doc.text("Nome do Aprovador", 50, y);
    doc.text("Dia da Aprovação", 100, y);
    doc.text("Valor Aprovado", 150, y);
    doc.text("Status", 190, y);
    y += 10; // Espaçamento após os cabeçalhos

    // Adicionando uma linha horizontal
    doc.line(10, y, 200, y); 
    y += 5; // Espaçamento após a linha

    refundRequests.forEach((request) => {
      doc.text(request.id, 10, y);
      doc.text(request.approver, 50, y);
      doc.text(request.approvalDate, 100, y);
      doc.text(request.approvedAmount, 150, y);
      doc.text(request.status, 190, y);
      y += 8; // Espaçamento entre as requisições

      // Adicionar uma linha horizontal entre requisições
      doc.line(10, y, 200, y);
      y += 5; // Espaçamento após a linha

      // Adicionar uma nova página se necessário
      if (y > 280) {
        doc.addPage();
        y = 10; // Reiniciar a posição vertical
        doc.setFontSize(18);
        doc.text("Histórico de Reembolsos", 10, y);
        y += 10; // Espaçamento após o título
        doc.setFontSize(12);
        doc.text("ID da Requisição", 10, y);
        doc.text("Nome do Aprovador", 50, y);
        doc.text("Dia da Aprovação", 100, y);
        doc.text("Valor Aprovado", 150, y);
        doc.text("Status", 190, y);
        y += 10; // Espaçamento após os cabeçalhos
        doc.line(10, y, 200, y);
        y += 5; // Espaçamento após a linha
      }
    });

    doc.save("historico_reembolsos.pdf");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalData(null);
  };

  const refundRequests = [
    { id: '#15267', approver: 'John Doe', approvalDate: 'Mar 1, 2023', approvedAmount: '$100', requestedAmount: '$100', status: 'Sucesso' },
    { id: '#153587', approver: 'Jane Smith', approvalDate: 'Jan 26, 2023', approvedAmount: '$300', requestedAmount: '$300', status: 'Sucesso' },
    // Adicione mais dados conforme necessário
  ];

  return (
    <div className={Styles.RefundContainer}>
      <div className={Styles.RefundHeader}>
        <h1>Reembolsos</h1>
        <div className={Styles.RefundTotalRequested}>
          <span>Total Solicitado</span>
          <h2>$1600</h2>
        </div>
      </div>
      
      <div className={Styles.RefundHistory}>
        <h3>Histórico de Reembolso</h3>
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
            {refundRequests.map((request) => (
              <tr key={request.id} onClick={() => handleRowClick(request)}>
                <td>{request.id}</td>
                <td>{request.approvalDate}</td>
                <td className={getStatusClass(request.status)}>{request.status}</td>
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
              <p>Dia da Aprovação: {modalData.approvalDate}</p>
              <p>Valor Aprovado: {modalData.approvedAmount}</p>
              <p>Valor Solicitado: {modalData.requestedAmount}</p>
              <p>Status: {modalData.status}</p>
              <button onClick={handleExportToPDF}>Exportar para PDF</button>
              <button onClick={handleCloseModal}>Fechar</button>
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
    case 'Sucesso':
      return Styles.RefundSuccess;
    case 'Rejeitado':
      return Styles.RefundRejected;
    case 'Pendente':
      return Styles.RefundPending;
    case 'Revisar':
      return Styles.RefundReview; // Adicione esta classe no CSS
    default:
      return '';
  }
};

export default HistoryUser;
