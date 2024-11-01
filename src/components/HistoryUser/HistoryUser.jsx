import Styles from "./HistoryUser.module.css";

// Componente que exibe o histórico de reembolso do usuário
const HistoryUser = () => {
  return (
    <div className={Styles.RefundContainer}>
      {/* Seção de cabeçalho com o total solicitado */}
      <div className={Styles.RefundHeader}>
        <h1>Reembolsos</h1>
        <div className={Styles.RefundTotalRequested}>
          <span>Total Solicitado</span>
          <h2>$1600</h2>
        </div>
      </div>
      
      {/* Seção que exibe a tabela de histórico de reembolso */}
      <div className={Styles.RefundHistory}>
        <h3>Histórico de Reembolso</h3>
        <table className={Styles.RefundTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Status</th>
              <th>Quantia</th>
            </tr>
          </thead>
          <tbody>
            {/* Linhas exibindo registros individuais de reembolso */}
            <tr>
              <td>#15267</td>
              <td>Mar 1, 2023</td>
              <td className={Styles.RefundSuccess}>Sucesso</td>
              <td>$100</td>
            </tr>
            <tr>
              <td>#153587</td>
              <td>Jan 26, 2023</td>
              <td className={Styles.RefundSuccess}>Sucesso</td>
              <td>$300</td>
            </tr>
            <tr>
              <td>#16879</td>
              <td>Feb 12, 2033</td>
              <td className={Styles.RefundSuccess}>Sucesso</td>
              <td>$500</td>
            </tr>
            <tr>
              <td>#16378</td>
              <td>Feb 28, 2033</td>
              <td className={Styles.RefundRejected}>Rejeitado</td>
              <td>$500</td>
            </tr>
            <tr>
              <td>#16609</td>
              <td>Mar 13, 2033</td>
              <td className={Styles.RefundSuccess}>Sucesso</td>
              <td>$100</td>
            </tr>
            <tr>
              <td>#16907</td>
              <td>Mar 18, 2033</td>
              <td className={Styles.RefundPending}>Pendente</td>
              <td>$300</td>
            </tr>
          </tbody>
        </table>
        
        {/* Seção de paginação */}
        <div className={Styles.RefundPagination}>
          <button className={Styles.btnVoltar}>{'<'}</button>
          <span>1 de 1</span>
          <button className={Styles.btnAvancar}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default HistoryUser;
