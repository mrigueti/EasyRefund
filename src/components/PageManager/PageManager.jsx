import { useState } from "react";
import styles from "./PageManager.module.css";
import { useNavigate } from "react-router-dom";
import exportacao from "../../icons/export.png";
import adduser from "../../icons/addUser.png";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const PageManager = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [exportStatus, setExportStatus] = useState("Todas");
  const [exportType, setExportType] = useState("PDF");
  const [showPopover, setShowPopover] = useState(false);

  const requests = [
    { name: "João", date: "01/10/2024", status: "Aceita", description: "Descrição 1", value: 100 },
    { name: "Maria", date: "02/10/2024", status: "Negada", description: "Descrição 2", value: 200 },
    { name: "Pedro", date: "03/10/2024", status: "Pendente", description: "Descrição 3", value: 300 },
    // Adicione mais solicitações conforme necessário
  ];

  const handleExport = () => {
    console.log("Exportando:", {
      startDate,
      endDate,
      exportStatus,
      exportType,
    });

    const filteredRequests = requests.filter(request => {
      const requestDate = new Date(request.date.split("/").reverse().join("/")); // Ajuste para o formato brasileiro
      return requestDate >= startDate && requestDate <= endDate &&
             (exportStatus === "Todas" || request.status === exportStatus);
    });

    if (exportType === "PDF") {
      exportToPDF(filteredRequests);
    } else if (exportType === "Excel") {
      exportToExcel(filteredRequests);
    }
  };

  const exportToPDF = (filteredRequests) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Solicitações Exportadas", 10, 10);
    
    doc.setFontSize(12);
    let y = 20;

    filteredRequests.forEach(request => {
      doc.text(`Nome: ${request.name}`, 10, y);
      doc.text(`Data: ${request.date}`, 10, y + 10);
      doc.text(`Status: ${request.status}`, 10, y + 20);
      doc.text(`Descrição: ${request.description}`, 10, y + 30);
      doc.text(`Valor: R$ ${request.value.toFixed(2)}`, 10, y + 40); // Valor formatado
      y += 50;
      doc.line(10, y, 200, y);
      y += 5;
    });

    doc.save("solicitacoes.pdf");
  };

  const exportToExcel = (filteredRequests) => {
    const ws = XLSX.utils.json_to_sheet(filteredRequests.map(request => ({
      Nome: request.name,
      Data: request.date,
      Status: request.status,
      Descrição: request.description,
      Valor: request.value,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Solicitações");
    XLSX.writeFile(wb, "solicitacoes.xlsx");
  };

  const handleRegisterUser = () => {
    navigate("/register"); 
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
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
    setExportStatus(status);
  };

  return (
    <div className={styles.componentGerente}>
      <div className="min-h-screen bg-light p-4">
        <div className="container bg-white rounded shadow p-4">
          <header className={styles.HeaderGerente}>
            <h2 className="h4">Painel de Gestão</h2>
            <div className="d-flex align-items-center">
              <div style={{ position: "relative" }}>
                <button className={`btn btn-light btn-small`} onClick={togglePopover}>
                  <img src={exportacao} alt="Solicitar relatório" />
                </button>
                <button className={`btn btn-light btn-small`} onClick={handleRegisterUser}>
                  <img src={adduser} alt="Adicionar usuário" />
                </button>
                {showPopover && (
                  <div
                    className="popover show"
                    style={{
                      position: "absolute",
                      left: "0%",
                      top: "100%",
                      zIndex: 10,
                      width: "300px",
                    }}
                  >
                    <div className="popover-header">
                      <h4 className="font-weight-bold">Exportar Dados</h4>
                      <p className="text-muted">Selecione as opções para exportação</p>
                    </div>
                    <div className="popover-body">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="startDate">Data de Início</label>
                        <input
                          type="date"
                          className="form-control"
                          value={startDate.toISOString().split("T")[0]}
                          onChange={handleStartDateChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="endDate">Data de Término</label>
                        <input
                          type="date"
                          className="form-control"
                          value={endDate.toISOString().split("T")[0]}
                          onChange={handleEndDateChange}
                          min={startDate.toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="status">Status</label>
                        <select
                          className="form-select"
                          value={exportStatus}
                          onChange={(e) => setExportStatus(e.target.value)}
                        >
                          <option value="Todas">Todas</option>
                          <option value="Aceita">Aceita</option>
                          <option value="Negada">Negada</option>
                          <option value="Pendente">Pendente</option>
                          <option value="Revisar">Revisar</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="type">Tipo de Exportação</label>
                        <select
                          className="form-select"
                          value={exportType}
                          onChange={(e) => setExportType(e.target.value)}
                        >
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
              </div>
            </div>
          </header>

          <div className="mb-4">
            <div className={styles.BtnContainerGerente}>
              <button className={styles.BtnFilterGerente} onClick={() => handleFilterByStatus("Todas")}>Todas</button>
              <button className={styles.BtnFilterGerente} onClick={() => handleFilterByStatus("Aceita")}>Aceitas</button>
              <button className={styles.BtnFilterGerente} onClick={() => handleFilterByStatus("Negada")}>Negadas</button>
              <button className={styles.BtnFilterGerente} onClick={() => handleFilterByStatus("Pendente")}>Pendentes</button>
              <button className={styles.BtnFilterGerente} onClick={() => handleFilterByStatus("Revisar")}>Revisar</button>
            </div>
          </div>

          <div className={styles.TableContainerGerente}>
            <table className={styles.GerenteTable}>
              <thead>
                <tr>
                  <th className="text-start">Nome</th>
                  <th className="text-start">Data</th>
                  <th className="text-start">Status</th>
                  <th className="text-start">Descrição</th>
                  <th className="text-start">Valor</th> {/* Coluna para o valor */}
                </tr>
              </thead>
              <tbody>
                {requests.filter(request => exportStatus === "Todas" || request.status === exportStatus).map((request, index) => (
                  <tr key={index}>
                    <td>{request.name}</td>
                    <td>{request.date}</td>
                    <td>
                      <span className={request.status === "Aceita" ? styles.StatusAceitaGerente : styles.StatusNegadaGerente}>
                        {request.status}
                      </span>
                    </td>
                    <td>{request.description}</td>
                    <td>R$ {request.value.toFixed(2)}</td> {/* Exibição do valor da solicitação */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageManager;
