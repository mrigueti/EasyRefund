import { useState } from "react";
import styles from "./PageManager.module.css";
import { useNavigate } from "react-router-dom";
import exportacao from "../../icons/export.png";
import adduser from "../../icons/addUser.png";

const PageManager = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [exportStatus, setExportStatus] = useState("Todas");
  const [exportType, setExportType] = useState("PDF");
  const [showPopover, setShowPopover] = useState(false);

  const handleExport = () => {
    console.log("Exportando:", {
      startDate,
      endDate,
      exportStatus,
      exportType,
    });
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
    // Se a data de término for anterior à data de início, ajusta
    if (endDate < date) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (e) => {
    const date = new Date(e.target.value);
    // Permite a mudança se a data de término for igual ou posterior à data de início
    if (date >= startDate) {
      setEndDate(date);
    }
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
                      left: "0%", // Ajuste para centralizar em relação ao botão
                      top: "100%", // Posicionar diretamente abaixo do botão
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
                          min={startDate.toISOString().split("T")[0]} // Bloquear datas anteriores à data de início
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
              <button className={styles.BtnFilterGerente} onClick={() => setExportStatus("Todas")}>Todas</button>
              <button className={styles.BtnFilterGerente} onClick={() => setExportStatus("Aceita")}>Aceitas</button>
              <button className={styles.BtnFilterGerente} onClick={() => setExportStatus("Negada")}>Negadas</button>
              <button className={styles.BtnFilterGerente} onClick={() => setExportStatus("Pendente")}>Pendentes</button>
              <button className={styles.BtnFilterGerente} onClick={() => setExportStatus("Revisar")}>Revisar</button>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>João</td>
                  <td>01/10/2024</td>
                  <td>
                    <span className={styles.StatusAceitaGerente}>Aceita</span>
                  </td>
                  <td>Descrição 1</td>
                </tr>
                {/* Mais linhas da tabela podem ser adicionadas aqui */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageManager;
