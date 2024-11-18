import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Permission.module.css";

const Permission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { solicitacao } = location.state || {}; // Pega os dados da solicitação passada

  const [status, setStatus] = useState(solicitacao ? solicitacao.status_solicitacao : "Pendente");

  const handleChangeStatus = (newStatus) => {
    if (window.confirm(`Tem certeza que deseja ${newStatus}?`)) {
      setStatus(newStatus);
      alert(`Solicitação ${newStatus.toLowerCase()}!`);
      // Aqui você pode fazer uma atualização no backend para registrar o novo status
      navigate("/manegement");
    }
  };

  return (
    <div className={style.Container}>
      <button className={style.BackButton} onClick={() => navigate(-1)}>
        &larr; Voltar
      </button>
      <div className={style.InformationFunc}>
        <p>
          Nome do Usuário: <span>{solicitacao ? solicitacao.name : "Carregando..."}</span>
        </p>
        <p>
          Cargo: <span>{solicitacao ? solicitacao.cargo : "Carregando..."}</span>
        </p>
        <p>
          Setor: <span>{solicitacao ? solicitacao.nome_setor : "Carregando..."}</span>
        </p>
        <p>
          Unidade: <span>{solicitacao ? solicitacao.nome_unidade : "Carregando..."}</span>
        </p>
      </div>
      <div className={style.OutlayFunc}>
        <h3>Detalhes da Solicitação</h3>
        <div className={style.OutlayItem}>
          <div>
            <p>ID da Solicitação</p>
            <span>{solicitacao ? solicitacao.id_solicitacao : "Carregando..."}</span>
          </div>
          <div>
            <p>Status</p>
            <span>{solicitacao ? solicitacao.status_solicitacao : "Carregando..."}</span>
          </div>
          <div>
            <p>Valor Solicitado</p>
            <span>R$ {solicitacao ? solicitacao.valor : 0}</span>
          </div>
          <div>
            <p>Data da Solicitação</p>
            <span>{solicitacao ? new Date(solicitacao.dt_criacao_solic).toLocaleDateString() : "Carregando..."}</span>
          </div>
          <div>
            <p>Valor Aprovado</p>
            <span>R$ {solicitacao ? solicitacao.valor_aprovado_solic : 0}</span>
          </div>
          <div>
            <p>Descrição</p>
            <span>{solicitacao ? solicitacao.descricao : "Carregando..."}</span>
          </div>
          <div>
            <p>Categoria</p>
            <span>{solicitacao ? solicitacao.categoria : "Carregando..."}</span>
          </div>
          {solicitacao && solicitacao.anexo_nf ? (
            <div>
              <p>Arquivo Anexo</p>
              <a
                href={`data:application/pdf;base64,${solicitacao.anexo_nf}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visualizar Arquivo
              </a>
            </div>
          ) : (
            <div>
              <p>Arquivo Anexo</p>
              <span>Não há arquivo anexado.</span>
            </div>
          )}
        </div>
      </div>
      <div className={style.ButtonContainer}>
        <button
          className={style.ApproveButton}
          onClick={() => handleChangeStatus("Aprovar")}
        >
          Aprovar
        </button>
        <button
          className={style.DenyButton}
          onClick={() => handleChangeStatus("Negar")}
        >
          Negar
        </button>
      </div>
    </div>
  );
};

export default Permission;
