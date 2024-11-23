import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import user from "../../icons/user.png";
import emailpng from "../../icons/email.png";
import sector from "../../icons/setor.png";
import role from "../../icons/cargo.png";
import location from "../../icons/unidade.png";
import { Modal, Button } from "react-bootstrap"; // Importando o Modal e o Button

const url_register = 'http://localhost:3001/api/usuarios/register';
const url_unidades_get = 'http://localhost:3001/api/unidades/get'
const url_cargosSetoresUnidades = 'http://localhost:3001/api/cargos-setores-unidades/get'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('123456');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [cargosSetoresUnidades, setCargosSetoresUnidades] = useState([]);
  const [selectedCargo, setSelectedCargo] = useState(""); // Estado para o cargo selecionado


  useEffect(() => {
    const fetchCargosSetoresUnidades = async () => {
      try {
        const response = await fetch(url_cargosSetoresUnidades); // Altere o URL conforme necessário
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();

        setCargosSetoresUnidades(data);
      } catch (error) {
        console.error("Erro ao buscar cargos, setores e unidades:", error);
      }
    };

    fetchCargosSetoresUnidades();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = sessionStorage.getItem("token");
  
    if (!token) {
      console.error("Token não encontrado!");
      setMessage("Erro: Token não encontrado!");
      return;
    }
  
    const selectedData = cargosSetoresUnidades.find(
      (item) => item.Cargo === selectedCargo
    );
  
    if (!selectedData) {
      console.error("Nenhum cargo selecionado ou cargo inválido.");
      setMessage("Erro: Nenhum cargo selecionado ou cargo inválido.");
      return;
    }
  
    // Verifique se o role foi selecionado
    if (!role) {
      console.error("Nenhum cargo foi selecionado.");
      setMessage("Erro: Por favor, selecione um cargo.");
      return;
    }
  
    try {
      const response = await fetch(url_register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome_usuario: username,
          email_usuario: email,
          senha_usuario: senha,
          role_nome: role,
          id_cargo: selectedData.id_cargo,
          id_setor: selectedData.id_setor,
          id_unidade: selectedData.id_unidade,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Erro na resposta do servidor:", data);
        setMessage(`Erro: ${data.message || "Falha ao cadastrar o usuário."}`);
      } else {
        console.log("Usuário cadastrado com sucesso:", data);
        setMessage("Cadastro realizado com sucesso!");
        clearFormFields(); // Limpa os campos do formulário
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setMessage("Erro: Falha ao enviar dados. Tente novamente mais tarde.");
    }
  };
  

  const clearFormFields = () => {
    setUsername("");
    setEmail("");
    setSenha("123456");
    setRole("");
    setSelectedCargo("");
  };




  const navigate = useNavigate();

  const handleBtnBackPage = () => {
    navigate(-1);
  };

  const [nameRegisterP, setNameRegister] = useState("");
  const [roleRegisterP, setRoleRegisterP] = useState("");
  const [locationRegisterP, setLocationRegisterP] = useState("");
  const [sectorRegisterP, setSectorRegisterP] = useState("");
  const [emailRegisterP, setEmailRegister] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // Estado para o modal de confirmação
  const [selectedRadioButton, setSelectedRadioButton] = useState("");
  const [registrationError, setRegistrationError] = useState(false);

  const handleRegisterPermission = (e) => {
    e.preventDefault();
    setErrors({});
    setRegistrationError(false);

    // Resetando a variável de erro
    let hasError = false;

    // Se não houver erros, prosseguir com o cadastro
    if (!hasError) {
      // Limpar os campos após o cadastro
      setNameRegister("");
      setRoleRegisterP("");
      setSectorRegisterP("");
      setLocationRegisterP("");
      setEmailRegister("");
      setSelectedRadioButton("");
      setShowModal(true); // Mostrar modal de confirmação
    } else {
      setRegistrationError(true);
    }
  };

  const handleCloseModal = (sendAnother) => {
    setShowModal(false); // Fecha o modal
    if (!sendAnother) {
      handleBtnBackPage(); // Volta à página anterior
    }
  };

  return (
    <div className={styles.RegisterPermission}>
      <button
        className={`${styles.infoButtonBack} ${styles.button_back_position}`}
        onClick={handleBtnBackPage}
      >
        <span className={styles.infoArrow}>&larr;</span> Voltar
      </button>
      <form onSubmit={handleSubmit}>
        <h1>Cadastrar Usuário</h1>
        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={user} alt="User Icon" className={styles.Icon} />
            <input
              type="text"
              name="nameRegisterP"
              placeholder="Nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {errors.name && (
            <div className={styles.errorAlert}>{errors.name}</div>
          )}
        </div>

        {/* Select para escolher o Cargo */}
        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={location} alt="Location Icon" className={styles.Icon} />
            <select
              name="cargo"
              value={selectedCargo}
              onChange={(e) => setSelectedCargo(e.target.value)}
              required
              className={styles.RegisterSelect}
            >
              <option value="">Cargo - Setor - Unidade</option>
              {cargosSetoresUnidades.map((item, index) => (
                <option key={index} value={item.Cargo}>
                  {`${item.Cargo} - ${item.Setor} - ${item.Unidade}`}
                </option>
              ))}
            </select>
          </div>
          {errors.location && (
            <div className={styles.errorAlert}>{errors.location}</div>
          )}
        </div>

        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterEmailInput}>
            <img src={emailpng} alt="Email Icon" className={styles.Icon} />
            <input
              type="email"
              name="emailRegisterP"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {errors.email && (
            <div className={styles.errorAlert}>{errors.email}</div>
          )}
        </div>
        {/* <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={user} alt="User Icon" className={styles.Icon} />
            <input
              type="password"
              name="nameRegisterP"
              placeholder="Senha"
              value={senha}
              disabled
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          {errors.name && (
            <div className={styles.errorAlert}>{errors.name}</div>
          )}
        </div> */}
        <div className={styles.CheckBox}>
          <div className={styles.CheckFuncUser}>
            <input
              type="radio"
              name="userRole"
              value="Funcionário"
              checked={role === "Funcionário"}
              onChange={(e) => setRole(e.target.value)}
            />
            Funcionário
          </div>
          <div className={styles.CheckPermUser}>
            <input
              type="radio"
              name="userRole"
              value="Aprovador"
              checked={role === "Aprovador"}
              onChange={(e) => setRole(e.target.value)}
            />
            Aprovador
          </div>
          <div className={styles.CheckManagerUser}>
            <input
              type="radio"
              name="userRole"
              value="Gerente"
              checked={role === "Gerente"}
              onChange={(e) => setRole(e.target.value)}
            />
            Gerente
          </div>
        </div>
        {errors.checkbox && (
          <div className={styles.errorAlert}>{errors.checkbox}</div>
        )}
        <div className={styles.RegisterBtnRegister}>
          {registrationError && (
            <div className={styles.errorAlert}>
              Não foi possível efetuar o cadastro! Verifique os dados inseridos.
            </div>
          )}
          <button type="submit" className={styles.BtnRegisterUser}>
            Cadastrar
          </button>
        </div>
        <div className={styles.RegisterInputContainer}>
          {message && (
            <div
              className={`${styles.alertMessage} ${message.includes("Erro") ? styles.error : styles.success
                }`}
            >
              <span className={styles.icon}>
                {message.includes("Erro") ? "❌" : "✅"}
              </span>
              {message}
            </div>
          )}
        </div>

      </form>
      {/* Modal de confirmação */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro realizado com sucesso!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você gostaria cadastrar um novo usuário?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal(false)}>
            Não
          </Button>
          <Button variant="primary" onClick={() => handleCloseModal(true)}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
