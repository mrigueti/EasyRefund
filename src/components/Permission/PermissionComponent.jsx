import React, { useState } from "react";
import style from "./Permission.module.css";
import { useNavigate } from "react-router-dom";

const Permission = () => {
  const navigate = useNavigate();

  const [userFunc] = useState({
    nameFunc: "Gabryel",
    cargoFunc: "Gerente",
    SetFunc: "Administrativo",
    unidFunc: "Vitora",
  });

  const [userOutlay] = useState({
    ref: "Macarrão",
    amount: 100,
    payment: "Pix",
  });

  const [status, setStatus] = useState("Pendente");

  const handleChangeStatus = (newStatus) => {
    if (window.confirm(`Tem certeza que deseja ${newStatus}?`)) {
      setStatus(newStatus);
      alert(`Solicitação ${newStatus.toLowerCase()}!`);
      navigate("/manegement");
    }
  };

  return (
    <div className={style.Container}>
      <button
        className={style.BackButton}
        onClick={() => navigate("/manegement")}
      >
        &larr; Voltar
      </button>
      <div className={style.InformationFunc}>
        <p>
          Nome: <span>{userFunc.nameFunc}</span>
        </p>
        <p>
          Cargo: <span>{userFunc.cargoFunc}</span>
        </p>
        <p>
          Setor: <span>{userFunc.SetFunc}</span>
        </p>
        <p>
          Unidade: <span>{userFunc.unidFunc}</span>
        </p>
      </div>
      <div className={style.OutlayFunc}>
        <h3>Gastos</h3>
        <div className={style.OutlayItem}>
          <div>
            <p>Refeição</p>
            <span>{userOutlay.ref}</span>
          </div>
          <div className={style.ValueContainer}>
            <p>Valor Gasto</p>
            <div>R$ {userOutlay.amount},00</div>
          </div>
          <div>
            <p>Forma de pagamento</p>
            <div className={style.OutlayDetails}>{userOutlay.payment}</div>
          </div>
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
          className={style.ReviewButton}
          onClick={() => handleChangeStatus("Revisar")}
        >
          Revisar
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
