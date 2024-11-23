import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Styles from "./HistoryUser.module.css";
import { useState, useEffect } from "react";
import exports from "../../icons/export.png"; // Importando ícone de exportação

const HistoryUser = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 8; // Limitar 10 itens por página

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          console.error("Token não encontrado!");
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const response = await fetch(`http://localhost:3001/api/solicitacoes/getById/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar solicitações.");
        }

        const data = await response.json();
        setRequests(data.solicitacoes); // Ajustado para acessar diretamente 'solicitacoes'
        setFilteredRequests(data.solicitacoes); // Ajustado para acessar diretamente 'solicitacoes'
      } catch (error) {
        console.error("Erro ao carregar as solicitações:", error);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    const filtered = requests.filter((request) => {
      if (filter === "Todas") return true;
      return request.status_solicitacao === filter;
    });
    setFilteredRequests(filtered);
  }, [filter, requests]);

  const handleRowClick = (data) => {
    setModalData(data);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalData(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleExportToPDF = () => {
    if (!modalData) return;

    const doc = new jsPDF();
    doc.text(`ID da Requisição: ${modalData.id_solicitacao}`, 10, 10);
    doc.text(`Categoria: ${modalData.categoria}`, 10, 20);
    doc.text(`Data de Criação: ${formatDate(modalData.dt_criacao_solic)}`, 10, 30);
    doc.text(`Valor Solicitado: ${modalData.valor_pedido_solic}`, 10, 40);
    doc.text(`Status: ${modalData.status_solicitacao}`, 10, 50);
    doc.save("solicitacao.pdf");
  };

  const handleExportAllToPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(18);
    doc.text("Histórico de Reembolsos", 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text("ID", 10, y);
    doc.text("Data", 50, y);
    doc.text("Categoria", 100, y);
    doc.text("Valor", 150, y);
    doc.text("Status", 190, y);
    y += 10;

    doc.line(10, y, 200, y);
    y += 5;

    filteredRequests.forEach((request) => {
      doc.text(request.id_solicitacao.toString(), 10, y);
      doc.text(formatDate(request.dt_criacao_solic), 50, y);
      doc.text(request.categoria, 100, y);
      doc.text(request.valor_pedido_solic.toString(), 150, y);
      doc.text(request.status_solicitacao, 190, y);
      y += 8;

      doc.line(10, y, 200, y);
      y += 5;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("historico_reembolsos.pdf");
  };

  const handleBtnBackPage = () => {
    navigate(-1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginate = (requests, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return requests.slice(startIndex, endIndex); // Slice correto para exibir apenas 10 itens por página
  };

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className={Styles.RefundContainer}>
      <div className={Styles.RefundHeader}>
        <button
          className={`${Styles.infoButtonBack} ${Styles.button_back_position}`}
          onClick={handleBtnBackPage}
        >
          <span className={Styles.infoArrow}>&larr;</span> Voltar
        </button>
      </div>

      <div className={Styles.RefundHistory}>
        <h3>Histórico de Reembolso</h3>

        <div className={Styles.BtnContainer}>
          {["Todas", "Pendente", "Aprovada", "Recusada"].map((status) => (
            <button
              key={status}
              className={Styles.BtnFilter}
              onClick={() => setFilter(status) || setCurrentPage(1)}
            >
              {status}
            </button>
          ))}
        </div>

        <button className={Styles.btnExportAll} onClick={handleExportAllToPDF}>
          <img src={exports} alt="Exportar" /> Exportar Todos
        </button>

        {filteredRequests.length > 0 ? (
          <table className={Styles.RefundTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Última Modificação</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Valor Aprovado</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginate(filteredRequests, currentPage, itemsPerPage).map((request) => (
                <tr key={request.id_solicitacao} onClick={() => handleRowClick(request)}>
                  <td>{request.id_solicitacao}</td>
                  <td>{formatDate(request.dt_criacao_solic)}</td>
                  <td>{formatDate(request.dt_aprovacao)}</td>
                  <td>{request.categoria}</td>
                  <td>{request.valor_pedido_solic}</td>
                  <td>{request.valor_aprovado_solic}</td>
                  <td>
                    <span
                      className={`${Styles.StatusBadge} ${getStatusClass(
                        request.status_solicitacao
                      )}`}
                    >
                      {request.status_solicitacao}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className={Styles.RefundTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Última Modificação</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Valor Aprovado</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Nenhuma solicitação encontrada.
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {totalPages > 0 && (
          <div className={Styles.Pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        )}

        {modalVisible && (
          <div className={Styles.ModalOverlay}>
            <div className={Styles.ModalContent}>
              <h2>Detalhes da Solicitação</h2>
              <p>ID: {modalData.id_solicitacao}</p>
              <p>Categoria: {modalData.categoria}</p>
              <p>Data de Criação: {formatDate(modalData.dt_criacao_solic)}</p>
              <p>Valor Solicitado: {modalData.valor_pedido_solic}</p>
              <p>Status: {modalData.status_solicitacao}</p>
              <button onClick={handleExportToPDF}>Exportar para PDF</button>
              <button
                className={Styles.closeButton}
                onClick={handleCloseModal}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case "Pendente":
      return Styles.RefundPending;
    case "Aprovada":
      return Styles.RefundAccepted;
    case "Recusada":
      return Styles.RefundRejected;
    default:
      return "";
  }
};

export default HistoryUser;

