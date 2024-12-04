import { useState, useEffect } from "react";
import Styles from "./Administrator.module.css";
import { useNavigate } from "react-router-dom";

const Administrator = () => {
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [currentPage, setCurrentPage] = useState(1);
  const [pago, setPago] = useState("❌"); // Estado inicial como "x"
  const itemsPerPage = 10;

  const fetchSolicitacoes = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/solicitacoes/getAllAp"
      );
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
            aprovacao: new Date(item.dt_aprovacao).toLocaleDateString("pt-BR"),
            status: item.status_solicitacao,
            descricao: item.descricao,
            categoria: item.categoria,
            valor_pedido: item.valor_pedido_solic,
            valor_aprovado: item.valor_aprovado_solic,
            pago: item.pago
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
    filter === "Pago"
      ? solicitacoes.filter(
          (solicitacao) =>
            solicitacao.pago === 1
        )
      : filter === "Não pago"
      ? solicitacoes.filter(
          (solicitacao) =>
            solicitacao.pago === 0
        )
      : solicitacoes; // "Todas"

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSolicitacoes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
    navigate(`/Administrator/MenuAdministrator`, { state: { solicitacao } });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredSolicitacoes.length / itemsPerPage);

  return (
    <div className={Styles.component}>
      <header className={Styles.HeaderManagement}></header>
      <div>
        <div>
          <div className={Styles.BtnContainer}>
            {["Todas", "Pago", "Não pago"].map((pago) => (
              <button
                key={pago}
                className={Styles.BtnFilter}
                aria-label={`Filtrar por ${pago}`}
                onClick={() => setFilter(pago) || setCurrentPage(1)}
              >
                {pago}
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
                <th>Recebida</th>
                <th>Última Modificação</th>
                <th>Status</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Valor Aprovado</th>
                <th>Pago</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((solicitacao) => (
                  <tr
                    key={solicitacao.id}
                    onDoubleClick={() => handleRowClick(solicitacao)}
                  >
                    <td>{solicitacao.id}</td>
                    <td>{solicitacao.name}</td>
                    <td>{solicitacao.date}</td>
                    <td>{solicitacao.aprovacao}</td>
                    <td>
                      <span className={getStatusClass(solicitacao.status)}>
                        {solicitacao.status}
                      </span>
                    </td>
                    <td>{solicitacao.categoria}</td>
                    <td>R$ {solicitacao.valor_pedido}</td>
                    <td>R$ {solicitacao.valor_aprovado}</td>
                    <td>{solicitacao.pago === 1 ? '✅' : '❌'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    Nenhuma solicitação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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
      </div>
    </div>
  );
};

export default Administrator;
