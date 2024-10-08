import { useState } from "react";
import Styles from "./ManegementComponent.module.css";
import { useNavigate } from "react-router-dom";

const PageManagement = () => {
  const Navigate = useNavigate();
  const [Filter, setFilter] = useState("Todas");
  const Users = [
    {
      id: 1,
      name: "João",
      date: "01/10/2024",
      status: "Pendente",
      descricao: "Descrição 1",
    },
    {
      id: 2,
      name: "Maria",
      date: "02/10/2024",
      status: "Aceita",
      descricao: "Descrição 2",
    },
    {
      id: 3,
      name: "Carlos",
      date: "03/10/2024",
      status: "Negada",
      descricao: "Descrição 3",
    },
    {
      id: 4,
      name: "Gabryel",
      date: "05/10/2024",
      status: "Revisar",
      descricao: "Descrição 4",
    },
  ];

  const GetStatusClass = (status) => {
    if (status === "Aceita") {
      return Styles.StatusAceita;
    } else if (status === "Negada") {
      return Styles.StatusNegada;
    } else if (status === "Revisar") {
      return Styles.StatusRevisar;
    } else {
      return Styles.StatusPendente;
    }
  };

  const FilteredUsers = Users.filter((user) => {
    if (Filter === "Todas") return true;
    return user.status === Filter;
  });

  return (
    <div className={Styles.component}>
      <header className={Styles.HeaderManagement}>
        <h6>Pesquisa</h6>
      </header>
      <div>
        <div>
          <hr />
          <div className={Styles.BtnContainer}>
            <button
              className={Styles.BtnFilter}
              aria-label="Filtrar por todas"
              onClick={() => setFilter("Todas")}
            >
              Todas
            </button>
            <button
              className={Styles.BtnFilter}
              aria-label="Filtrar por aceitas"
              onClick={() => setFilter("Aceita")}
            >
              Aceitas
            </button>
            <button
              className={Styles.BtnFilter}
              aria-label="Filtrar por negadas"
              onClick={() => setFilter("Negada")}
            >
              Negadas
            </button>
            <button
              className={Styles.BtnFilter}
              aria-label="Filtrar por pendentes"
              onClick={() => setFilter("Pendente")}
            >
              Pendentes
            </button>
            <button
              className={Styles.BtnFilter}
              aria-label="Filtrar por revisar"
              onClick={() => setFilter("Revisar")}
            >
              Revisar
            </button>
          </div>
        </div>
        <div className={Styles.TableContainer}>
          <table className={Styles.ManagementTable}>
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Data</th>
                <th>Status</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {FilteredUsers.map((user) => (
                <tr key={user.id} onDoubleClick={() => Navigate("/manegement/permission")}>
                  <td></td>
                  <td>{user.name}</td>
                  <td>{user.date}</td>
                  <td>
                    <span className={GetStatusClass(user.status)}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PageManagement;
