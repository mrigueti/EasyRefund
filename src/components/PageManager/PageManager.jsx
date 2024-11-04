import { useState } from "react";
import styles from "./PageManager.module.css";
import { useNavigate } from "react-router-dom";
import exportacao from "../../icons/export.png";
import adduser from "../../icons/addUser.png";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const PageManager = () => {
  const navigate = useNavigate();

  // Estados para armazenar a data de início e de término do filtro
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [exportStatus, setExportStatus] = useState("Todas"); // Estado para o status selecionado
  const [exportType, setExportType] = useState("PDF"); // Estado para o tipo de exportação selecionado
  const [showPopover, setShowPopover] = useState(false); // Controle para mostrar/ocultar o popover

  // Dados de exemplo para as solicitações
  const requests = [
    {
      name: "João",
      date: "01/10/2024",
      status: "Aceita",
      description: "Descrição 1",
      value: 100,
    },
    {
      name: "Maria",
      date: "02/10/2024",
      status: "Negada",
      description: "Descrição 2",
      value: 200,
    },
    {
      name: "Pedro",
      date: "03/10/2024",
      status: "Pendente",
      description: "Descrição 3",
      value: 300,
    },
    {
      name: "Carlos",
      date: "04/10/2024",
      status: "Revisar",
      description: "Descrição 4",
      value: 150,
    },
  ];

  // Função para exportar as solicitações
  const handleExport = () => {
    console.log("Exportando:", {
      startDate,
      endDate,
      exportStatus,
      exportType,
    });

    // Filtra as solicitações com base nas datas e no status
    const filteredRequests = requests.filter((request) => {
      const requestDate = new Date(request.date.split("/").reverse().join("/")); // Converte a data para o formato correto
      return (
        requestDate >= startDate &&
        requestDate <= endDate &&
        (exportStatus === "Todas" || request.status === exportStatus)
      );
    });

    // Exporta conforme o tipo selecionado (PDF ou Excel)
    if (exportType === "PDF") {
      exportToPDF(filteredRequests);
    } else if (exportType === "Excel") {
      exportToExcel(filteredRequests);
    }
  };

  // Função para exportar solicitações filtradas para um arquivo PDF
  const exportToPDF = (filteredRequests) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Solicitações Exportadas", 10, 10); // Título do PDF

    doc.setFontSize(12);
    let y = 20; // Posição inicial para o conteúdo

    // Adiciona cada solicitação ao PDF
    filteredRequests.forEach((request) => {
      doc.text(`Nome: ${request.name}`, 10, y);
      doc.text(`Data: ${request.date}`, 10, y + 10);
      doc.text(`Status: ${request.status}`, 10, y + 20);
      doc.text(`Descrição: ${request.description}`, 10, y + 30);
      doc.text(`Valor: R$ ${request.value.toFixed(2)}`, 10, y + 40);

      y += 50;
      doc.line(10, y, 200, y); // Linha separadora
      y += 5;
    });

    doc.save("solicitacoes.pdf"); // Salva o arquivo como "solicitacoes.pdf"
  };

  // Função para exportar solicitações filtradas para um arquivo Excel
  const exportToExcel = (filteredRequests) => {
    const ws = XLSX.utils.json_to_sheet(
      filteredRequests.map((request) => ({
        Nome: request.name,
        Data: request.date,
        Status: request.status,
        Descrição: request.description,
        Valor: request.value,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Solicitações");
    XLSX.writeFile(wb, "solicitacoes.xlsx");
  };

  // Função para navegar até a página de cadastro de usuários
  const handleRegisterUser = () => {
    navigate("/register");
  };

  // Função para mostrar/ocultar o popover de exportação
  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  // Função para lidar com a mudança da data de início
  const handleStartDateChange = (e) => {
    const date = new Date(e.target.value);
    setStartDate(date);
    if (endDate < date) {
      setEndDate(date);
    }
  };

  // Função para lidar com a mudança da data de término
  const handleEndDateChange = (e) => {
    const date = new Date(e.target.value);
    if (date >= startDate) {
      setEndDate(date);
    }
  };

  // Função para definir o status para filtro
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
                <button
                  className={`btn btn-light btn-small`}
                  onClick={togglePopover}
                >
                  <img src={exportacao} alt="Solicitar relatório" />
                </button>
                <button
                  className={`btn btn-light btn-small`}
                  onClick={handleRegisterUser}
                >
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
                      <p className="text-muted">
                        Selecione as opções para exportação
                      </p>
                    </div>
                    <div className="popover-body">
                      {/* Campo para selecionar a data de início */}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="startDate">
                          Data de Início
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          value={startDate.toISOString().split("T")[0]}
                          onChange={handleStartDateChange}
                        />
                      </div>
                      {/* Campo para selecionar a data de término */}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="endDate">
                          Data de Término
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          value={endDate.toISOString().split("T")[0]}
                          onChange={handleEndDateChange}
                          min={startDate.toISOString().split("T")[0]}
                        />
                      </div>
                      {/* Campo para selecionar o status das solicitações */}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
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
                      {/* Campo para selecionar o tipo de exportação */}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="type">
                          Tipo de Exportação
                        </label>
                        <select
                          className="form-select"
                          value={exportType}
                          onChange={(e) => setExportType(e.target.value)}
                        >
                          <option value="PDF">PDF</option>
                          <option value="Excel">Excel</option>
                        </select>
                      </div>
                      {/* Botão para iniciar a exportação */}
                      <button
                        onClick={handleExport}
                        className="btn btn-primary"
                      >
                        Exportar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Botões de filtro para status das solicitações */}
          <div className="mb-4">
            <div className={styles.BtnContainerGerente}>
              <button
                className={styles.BtnAcoesGerente}
                onClick={() => handleFilterByStatus("Todas")}
              >
                Todas
              </button>
              <button
                className={styles.BtnAcoesGerente}
                onClick={() => handleFilterByStatus("Aceita")}
              >
                Aceita
              </button>
              <button
                className={styles.BtnAcoesGerente}
                onClick={() => handleFilterByStatus("Negada")}
              >
                Negada
              </button>
              <button
                className={styles.BtnAcoesGerente}
                onClick={() => handleFilterByStatus("Pendente")}
              >
                Pendente
              </button>
              <button
                className={styles.BtnAcoesGerente}
                onClick={() => handleFilterByStatus("Revisar")}
              >
                Revisar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageManager;
