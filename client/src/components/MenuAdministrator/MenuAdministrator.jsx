import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Calendar, FileText, User, Briefcase, Tag, Receipt } from 'lucide-react';
import { Modal, Button } from "react-bootstrap";
import FileDownloader from "../FileDownloader/FileDownloader";
import Styles from './MenuAdministrator.module.css'


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
    flex: "1 1 calc(30% - 20px)",
    display: "flex",
    alignItems: "flex-start",
  },
  icon: {
    marginRight: "10px",
    color: "#6c757d",
  },
  label: {
    fontSize: "14px",
    color: "#6c757d",
    margin: 0,
  },
  value: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    marginTop: "10px",
  },
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
  approveButton: {
    backgroundColor: "#28a745",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    color: "#fff",
  },
  denyButton: {
    backgroundColor: "#dc3545",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    color: "#fff",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "#721c24",
    backgroundColor: "#f8d7da",
    padding: "5px",
    borderRadius: "5px",
    marginBottom: "10px",
    textAlign: "center",
  },
  descriptionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    // Adicionando truncamento para o título, se necessário
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  description: {
    fontSize: "15px",
    lineHeight: "1.5",
    // Estilos para limitar a descrição a três linhas
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

const MenuAdministrator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [valorAprovado, setValorAprovado] = useState("");
  const [solicitacao, setSolicitacao] = useState(null);
  const [status, setStatus] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [descAprovador, setDescAprovador] = useState("")

  useEffect(() => {
    const fetchSolicitacao = async () => {
      try {
        if (location.state && location.state.solicitacao) {
          setSolicitacao(location.state.solicitacao);
          setStatus(location.state.solicitacao.status);
          setDescAprovador(location.state.solicitacao.desc_aprovador)
          setIsLoading(false);
        } else if (id) {
          const response = await fetch(`http://localhost:3001/api/solicitacoes/get/${id}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar dados da solicitação');
          }
          const data = await response.json();
          console.log("Solicitacao from API:", data);
          setSolicitacao(data);
          setStatus(data.status);
          setIsLoading(false);
        } else {
          throw new Error('Nenhum ID de solicitação fornecido');
        }
      } catch (error) {
        console.error('Erro ao buscar solicitação:', error);
        setErrorMessage('Erro ao carregar dados da solicitação');
        setIsLoading(false);
      }
    };

    fetchSolicitacao();
  }, [id, location.state]);

  const getUserIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.id;
    }
    return null;
  };

  const handleUpdate = async (pagoFunc) => {
    const id_usuario = getUserIdFromToken();
    
    if (!id_usuario) {
      setErrorMessage("Usuário não autenticado!");
      return;
    }

    const data = {
      id_solicitacao: solicitacao.id,
      id_usuario: id_usuario,
      pago: pagoFunc
    };
    console.log(data);
    
    try {
      const response = await fetch(
        "http://localhost:3001/api/solicitacoes/updateSolicitacaoAdm",
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
      console.log(result);
      
      setShowApproveModal(false);
      setShowDenyModal(false);
    } catch (err) {
      console.error("Erro ao atualizar solicitação:", err);
      setErrorMessage("Erro ao atualizar solicitação!");
    }
  };

  const handleStatusChange = (pagoFunc) => {
    if (pagoFunc === 1) {
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

  const getFileUrl = (id) => {
    return `http://localhost:3001/api/solicitacoes/download/${id}`;
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!solicitacao) {
    return <div>Solicitação não encontrada</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft style={{ marginRight: "5px" }} />
          Voltar
        </button>
        <span style={{ ...styles.status, ...getStatusStyle(status) }}>
          {status}
          {solicitacao.pago === 1 ? '✅' : '❌'}
        </span>
      </div>

      <div style={styles.card}>
        <div style={styles.grid}>
          <div style={styles.infoItem}>
            <User style={styles.icon} />
            <div>
              <p style={styles.label}>Funcionário</p>
              <p style={styles.value}>{solicitacao.name || "Não informado"}</p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <Building2 style={styles.icon} />
            <div>
              <p style={styles.label}>Unidade</p>
              <p style={styles.value}>
                {solicitacao.setor || "Não informado"} - {solicitacao.unidade || "Não informado"}
              </p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <Calendar style={styles.icon} />
            <div>
              <p style={styles.label}>Data da Solicitação</p>
              <p style={styles.value}>{solicitacao.date || "Não informado"}</p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <Tag style={styles.icon} />
            <div>
              <p style={styles.label}>Categoria</p>
              <p style={styles.value}>{solicitacao.categoria || "Não informado"}</p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <Receipt style={styles.icon} />
            <div>
              <p style={styles.label}>Valor Solicitado</p>
              <p style={styles.value}>{formatCurrency(solicitacao.valor_pedido) || "Não informado"}</p>
            </div>
          </div>
          <div style={styles.infoItem}>
            <Briefcase style={styles.icon} />
            <div>
              <p style={styles.label}>Cargo</p>
              <p style={styles.value}>{solicitacao.cargo || "Não informado"}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <label style={styles.descriptionTitle}>Descrição do funcionário</label>
        <p style={styles.description}>{solicitacao.descricao || "Nenhuma descrição fornecida."}</p>
        <div style={styles.inputContainer}>
          <hr />
          <label>Descrição do aprovador</label>
          <input
            id="valorAprovado"
            style={styles.input}
            type="text"
            value={descAprovador}
            disabled={status === "Aprovada"}
            onChange={(e) => setDescAprovador(e.target.value)}
          />
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={{ marginBottom: "10px" }}>Arquivo Anexado</h2>
        {solicitacao.id ? (
          <FileDownloader
            fileUrl={getFileUrl(solicitacao.id)}
            fileName={`anexo_${solicitacao.id}`}
          />
        ) : (
          <p>Nenhum arquivo anexado.</p>
        )}
        {status === "Pendente" && (

          <div style={styles.inputContainer}>
            <hr></hr>
            <label htmlFor="valorAprovado">Valor Aprovado</label>
            <input
              id="valorAprovado"
              style={styles.input}
              type="number"
              value={valorAprovado}
              onChange={(e) => setValorAprovado(e.target.value)}
            />
          </div>
        )}
      </div>



      {errorMessage && (
        <div style={styles.errorMessage}>
          {errorMessage}
        </div>
      )}

      {solicitacao.pago === 0 && (
        <div style={styles.actions}>
          <Button
            variant="default"
            onClick={() => handleStatusChange(1)}
            style={styles.approveButton}
          >
            Pagar
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleStatusChange(0)}
            style={styles.denyButton}
          >
            Não Pagar
          </Button>
        </div>
      )}

      {/* Modal de Aprovação */}
      <Modal show={showApproveModal} onHide={() => setShowApproveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Pagamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja marcar como pago esta solicitação?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApproveModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdate(1);
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
          Tem certeza de que deseja negar o pagamento desta solicitação?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDenyModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleUpdate(0);
              setShowDenyModal(false);
              navigate(-1)
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MenuAdministrator;