import { useState, useEffect } from "react";
import styles from "./PageManager.module.css";
import { useNavigate } from "react-router-dom";
import exportacao from "../../icons/export.png";
import adduser from "../../icons/addUser.png";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

export default function PageManager() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [exportStatus, setExportStatus] = useState("Todas");
  const [exportType, setExportType] = useState("PDF");
  const [showPopover, setShowPopover] = useState(false);

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchSolicitacoes = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/solicitacoes/getAll");
      if (response.ok) {
        const data = await response.json();
        setSolicitacoes(
          data.map((item) => ({
            id: item.id_solicitacao,
            name: item.nome_usuario,
            cargo: item.nome_cargo,
            setor: item.nome_setor,
            unidade: item.nome_unidade,
            date: new Date(item.dt_criacao_solic).toLocaleDateString("pt-BR"),
            data_ultima: new Date(item.dt_aprovacao).toLocaleDateString("pt-BR"),
            status: item.status_solicitacao,
            descricao: item.descricao,
            categoria: item.categoria,
            valor_pedido: item.valor_pedido_solic,
            valor_aprovado: item.valor_aprovado_solic,
          }))
        );
      }
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const filteredSolicitacoes =
    filter === "Todas"
      ? solicitacoes
      : solicitacoes.filter((solicitacao) => solicitacao.status === filter);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSolicitacoes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber === 'prev') {
      setCurrentPage(prev => Math.max(prev - 1, 1));
    } else if (pageNumber === 'next') {
      setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredSolicitacoes.length / itemsPerPage)));
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pendente":
        return styles.Pending;
      case "Aprovada":
        return styles.Approved;
      case "Recusada":
        return styles.Rejected;
      default:
        return "";
    }
  };

  const handleRowClick = (solicitacao) => {
    navigate(`/management/permission`, { state: { solicitacao } });
  };

  const handleExport = () => {
    const exportData =
      exportStatus === "Todas"
        ? filteredSolicitacoes
        : filteredSolicitacoes.filter((item) => item.status === exportStatus);

    if (exportType === "PDF") {
      exportToPDF(exportData);
    } else if (exportType === "Excel") {
      exportToExcel(exportData);
    }
  };

  const exportToPDF = (filteredRequests) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("EasyRefund - Gerente", 10, 10);

    doc.text("Solicitações Exportadas", 10, 20);

    doc.setFontSize(12);
    let y = 30;

    filteredRequests.forEach((request) => {
      doc.text(`Nome: ${request.name}`, 10, y);
      doc.text(`Data: ${request.date}`, 10, y + 10);
      doc.text(`Status: ${request.status}`, 10, y + 20);
      doc.text(`Descrição: ${request.descricao}`, 10, y + 30);
      doc.text(`Valor Pedido: R$ ${request.valor_pedido}`, 10, y + 40);
      doc.text(`Valor Aprovado: R$ ${request.valor_aprovado}`, 10, y + 50);

      doc.setLineWidth(0.5);
      doc.line(10, y + 55, 200, y + 55);
      y += 70;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("solicitacoes_exportadas_gerente.pdf");
  };

  const exportToExcel = (filteredRequests) => {
    const ws = XLSX.utils.json_to_sheet(
      filteredRequests.map((request) => ({
        Nome: request.name,
        Data: request.date,
        Status: request.status,
        Descrição: request.descricao,
        "Valor Pedido": request.valor_pedido,
        "Valor Aprovado": request.valor_aprovado,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Solicitações");
    XLSX.writeFile(wb, "solicitacoes.xlsx");
  };

  const handleRegisterUser = () => {
    navigate("/manager/register");
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const getPopoverStyle = () => {
    const button = document.querySelector(".btn-light");
    if (!button) return {};

    const rect = button.getBoundingClientRect();

    return {
      position: "absolute",
      left: `${rect.left}px`,
      top: `${rect.bottom + window.scrollY}px`,
      zIndex: 10,
      backgroundColor: "white",
      border: "1px solid #ddd",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "10px",
      width: "300px",
    };
  };

  const handleStartDateChange = (e) => {
    const date = new Date(e.target.value);
    setStartDate(date);
    if (endDate < date) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (e) => {
    const date = new Date(e.target.value);
    if (date >= startDate) {
      setEndDate(date);
    }
  };

  const handleFilterByStatus = (status) => {
    setFilter(status);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  

  return (
    <div className={styles.componentGerente}>
      <div className="min-h-screen bg-light p-4">
        <div className="container bg-white rounded shadow p-4">
          <header className={styles.HeaderGerente}>
            <h2 className="h4">Painel de Gestão</h2>
            <div className="d-flex align-items-center">
              <button className="btn btn-light btn-small" onClick={togglePopover}>
                <img src={exportacao} alt="Solicitar relatório" />
              </button>
              <button className="btn btn-light btn-small" onClick={handleRegisterUser}>
                <img src={adduser} alt="Adicionar usuário" />
              </button>
            </div>
          </header>

          {showPopover && (
            <div style={getPopoverStyle()}>
              <div className="popover-header">
                <h4 className="font-weight-bold">Exportar Dados</h4>
              </div>
              <div className="popover-body">
                <div className="mb-3">
                  <label>Data de Início</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate.toISOString().split("T")[0]}
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Data de Término</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate.toISOString().split("T")[0]}
                    onChange={handleEndDateChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Status</label>
                  <select className="form-select" value={exportStatus} onChange={(e) => setExportStatus(e.target.value)}>
                    <option value="Todas">Todas</option>
                    <option value="Aprovada">Aceitas</option>
                    <option value="Recusada">Negadas</option>
                    <option value="Pendente">Pendentes</option>
                    <option value="Revisar">Revisar</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Tipo de Exportação</label>
                  <select className="form-select" value={exportType} onChange={(e) => setExportType(e.target.value)}>
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                  </select>
                </div>
                <button onClick={handleExport} className="btn btn-primary">
                  Exportar
                </button>
              </div>
            </div>
          )}

          <div className={styles.BtnContainerGerente}>
            {["Todas", "Aprovada", "Recusada", "Pendente"].map((status) => (
              <button
                key={status}
                className={styles.BtnFilterGerente}
                onClick={() => handleFilterByStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <div className={styles.TableContainerGerente}>
            <table className={styles.ManagementTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuário</th>
                  <th>Data</th>
                  <th>Última Modificação</th>
                  <th>Status</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                  <th>Valor Aprovado</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((solicitacao) => (
                    <tr key={solicitacao.id}>
                      <td>{solicitacao.id}</td>
                      <td>{solicitacao.name}</td>
                      <td>{solicitacao.date}</td>
                      <td>{solicitacao.data_ultima}</td>
                      <td className={getStatusClass(solicitacao.status)}>{solicitacao.status}</td>
                      <td>{solicitacao.categoria}</td>
                      <td>R$ {solicitacao.valor_pedido}</td>
                      <td>R$ {solicitacao.valor_aprovado}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">Nenhuma solicitação encontrada.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.Pagination}>
            {filteredSolicitacoes.length > itemsPerPage && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => paginate('prev')}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="text-gray-600">
                  Página {currentPage} de {Math.ceil(filteredSolicitacoes.length / itemsPerPage)}
                </span>
                <button
                  onClick={() => paginate('next')}
                  disabled={currentPage === Math.ceil(filteredSolicitacoes.length / itemsPerPage)}
                  className="px-3 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}