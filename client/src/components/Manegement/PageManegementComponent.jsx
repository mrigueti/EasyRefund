import { useState, useEffect } from "react";
import Styles from "./ManegementComponent.module.css";
import { useNavigate } from "react-router-dom";

const PageManagement = () => {
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [filter, setFilter] = useState("Todas");

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
            status: item.status_solicitacao,
            descricao: item.descricao,
            categoria: item.categoria,
            valor_pedido: item.valor_pedido_solic,
            valor_aprovado: item.valor_aprovado_solic
          }))
        );
      } else {
        console.error("(front) Erro ao buscar os dados:", response.statusText);
      }
    } catch (error) {
      console.error("(front) Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const filteredSolicitacoes =
    filter === "Todas"
      ? solicitacoes
      : solicitacoes.filter((solicitacao) => solicitacao.status === filter);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pendente":
        return Styles.Pending;
      case "Aprovada":
        return Styles.Approved;
      case "Recusada":
        return Styles.Rejected;
      default:
        return "";
    }
  };

  const handleRowClick = (solicitacao) => {
    // Redireciona para a página de permissão com os dados da solicitação
    navigate(`/manegement/permission`, { state: { solicitacao } });
  };

  return (
    <div className={Styles.component}>
      <header className={Styles.HeaderManagement}></header>
      <div>
        <div>
          <div className={Styles.BtnContainer}>
            {["Todas", "Pendente", "Aprovada", "Recusada"].map((status) => (
              <button
                key={status}
                className={Styles.BtnFilter}
                aria-label={`Filtrar por ${status}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <hr />
        <div className={Styles.TableContainer}>
          <table className={Styles.ManagementTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário</th>
                <th>Data</th>
                <th>Status</th>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Valor Aprovado</th>
              </tr>
            </thead>
            <tbody>
              {filteredSolicitacoes.length > 0 ? (
                filteredSolicitacoes.map((solicitacao) => (
                  <tr key={solicitacao.id} onDoubleClick={() => handleRowClick(solicitacao)}>
                    <td>{solicitacao.id}</td>
                    <td>{solicitacao.name}</td>
                    <td>{solicitacao.date}</td>
                    <td>
                      <span className={getStatusClass(solicitacao.status)}>
                        {solicitacao.status}
                      </span>
                    </td>
                    <td>{solicitacao.categoria}</td>
                    <td>{solicitacao.descricao}</td>
                    <td>R$ {solicitacao.valor_pedido}</td>
                    <td>R$ {solicitacao.valor_aprovado}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    Nenhuma solicitação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PageManagement;
