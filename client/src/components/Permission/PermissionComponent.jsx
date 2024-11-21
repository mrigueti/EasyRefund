import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Calendar, FileText, User, Briefcase, Tag, Receipt } from 'lucide-react';
import { Modal, Button } from "react-bootstrap";

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#333",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  infoItem: {
    flex: "1 1 calc(50% - 20px)",
    display: "flex",
    alignItems: "flex-start",
  },
  icon: { marginRight: "10px", color: "#6c757d" },
  label: { fontSize: "14px", color: "#6c757d", margin: 0 },
  value: { fontSize: "16px", fontWeight: "bold", color: "#333" },
  inputContainer: { marginTop: "10px" },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    color: "#fff",
  },
  approveButton: { backgroundColor: "#28a745" },
  denyButton: { backgroundColor: "#dc3545" },
  link: { color: "#007bff", textDecoration: "none", fontWeight: "bold" },
};

const Permission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [valorAprovado, setValorAprovado] = useState("");
  const { solicitacao } = location.state || {};
  const [status, setStatus] = useState(solicitacao?.status);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added error message state

  const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.id;
    }
    return null;
  };

  const handleUpdate = async (newStatus) => {
    const id_usuario = getUserIdFromToken();

    if (!id_usuario) {
      alert("Usuário não autenticado!");
      return;
    }

    const data = {
      id_solicitacao: solicitacao?.id,
      status_solicitacao: newStatus,
      valor_aprovado_solic: valorAprovado || "0",
      id_usuario: id_usuario,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/solicitacoes/updateSolicitacao",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar a solicitação");
      }

      const result = await response.json();
    //  alert("Solicitação atualizada com sucesso!");
      setStatus(newStatus);
      navigate(-1);
    } catch (err) {
      console.error("Erro ao atualizar solicitação:", err);
      //alert("Erro ao atualizar solicitação!");
    }
  };

const handleStatusChange = (newStatus) => {
    if (
      newStatus === "Recusada" &&
      valorAprovado !== "0" &&
      valorAprovado !== ""
    ) {
      setErrorMessage(
        "Solicitações recusadas devem ter o valor aprovado igual a 0!"
      );
      return;
    } else if (
      newStatus === "Aprovada" &&
      (parseFloat(valorAprovado) > parseFloat(solicitacao?.valor_pedido) ||
        parseFloat(valorAprovado) < 0)
    ) {
      setErrorMessage(
        "O valor aprovado não pode ser maior que o valor solicitado ou negativo!"
      );
      return;
    } else {
      setErrorMessage(""); // Clear the error message if the condition is not met
    }

    if (newStatus === "Aprovada") {
      setShowApproveModal(true);
    } else {
      setShowDenyModal(true);
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Aprovada":
        return { backgroundColor: "#e6f4ea", color: "#1e7e34" };
      case "Pendente":
        return { backgroundColor: "#fff3cd", color: "#856404" };
      case "Recusada":
        return { backgroundColor: "#f8d7da", color: "#721c24" };
      default:
        return { backgroundColor: "#e9ecef", color: "#495057" };
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft style={{ marginRight: "5px" }} />
          Voltar
        </button>
        <span style={{ ...styles.status, ...getStatusStyle(status) }}>
          {status}
        </span>
      </div>

      {/* Informações da solicitação */}
      <div style={styles.card}>
        <div style={styles.grid}>
          {/* Informações */}
          <div style={styles.infoItem}>
            <User style={styles.icon} />
            <div>
              <p style={styles.label}>Funcionário</p>
              <p style={styles.value}>{solicitacao?.name || "Não informado"}</p>
            </div>
          </div>
          {/* Unidade */}
          <div style={styles.infoItem}>
            <Building2 style={styles.icon} />
            <div>
              <p style={styles.label}>Unidade</p>
              <p style={styles.value}>
                {solicitacao?.setor || "Não informado"} -{" "}
                {solicitacao?.unidade || "Não informado"}
              </p>
            </div>
          </div>

          {/* Data da solicitação */}
          <div style={styles.infoItem}>
            <Calendar style={styles.icon} />
            <div>
              <p style={styles.label}>Data da Solicitação</p>
              <p style={styles.value}>{solicitacao?.date || "Não informado"}</p>
            </div>
          </div>

          {/* Categoria */}
          <div style={styles.infoItem}>
            <Tag style={styles.icon} />
            <div>
              <p style={styles.label}>Categoria</p>
              <p style={styles.value}>
                {solicitacao?.categoria || "Não informado"}
              </p>
            </div>
          </div>

          {/* Valor Solicitado */}
          <div style={styles.infoItem}>
            <Receipt style={styles.icon} />
            <div>
              <p style={styles.label}>Valor Solicitado</p>
              <p style={styles.value}>
                {formatCurrency(solicitacao?.valor_pedido) || "Não informado"}
              </p>
            </div>
          </div>

          {/* Cargo */}
          <div style={styles.infoItem}>
            <Briefcase style={styles.icon} />
            <div>
              <p style={styles.label}>Cargo</p>
              <p style={styles.value}>
                {solicitacao?.cargo || "Não informado"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div style={styles.card}>
        <h2 style={{ marginBottom: "10px" }}>Descrição</h2>
        <p>{solicitacao?.descricao || "Nenhuma descrição fornecida."}</p>
      </div>

      {/* Arquivo Anexado */}
      <div style={styles.card}>
        <h2 style={{ marginBottom: "10px" }}>Arquivo Anexado</h2>
        <a
          href={`http://localhost:3001/${solicitacao?.documento}`}
          style={styles.link}
          download
        >
          <FileText style={{ marginRight: "5px" }} />
          Baixar Arquivo
        </a>
      </div>

      {/* Valor Aprovado */}
      <div style={styles.card}>
        <div style={styles.inputContainer}>
          <label htmlFor="valorAprovado">Valor Aprovado</label>
          <input
            id="valorAprovado"
            style={styles.input}
            type="number"
            value={valorAprovado}
            onChange={(e) => setValorAprovado(e.target.value)}
          />
        </div>
      </div>

      {/* Erro da solicitação */}
      {errorMessage && (
        <div
          style={{
            color: "#721c24",
            backgroundColor: "#f8d7da",
            padding: "5px",
            borderRadius: "5px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Ações */}
      <div style={styles.actions}>
        <Button
          variant="success"
          style={{ ...styles.button, ...styles.approveButton }}
          onClick={() => handleStatusChange("Aprovada")}
        >
          Aprovar
        </Button>
        <Button
          variant="danger"
          style={{ ...styles.button, ...styles.denyButton }}
          onClick={() => handleStatusChange("Recusada")}
        >
          Negar
        </Button>
      </div>

      {/* Modal de Aprovação */}
      <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Aprovação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja aprovar esta solicitação?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApproveModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdate("Aprovada");
              setShowApproveModal(false);
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Negação */}
      <Modal show={showDenyModal} onHide={() => setShowDenyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Negação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja negar esta solicitação?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDenyModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleUpdate("Recusada");
              setShowDenyModal(false);
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Permission;