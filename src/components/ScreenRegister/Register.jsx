import styles from "./Register.module.css"; // Importa o CSS específico para estilização do componente
import { useState } from "react"; // Importa o hook useState do React para gerenciar estados
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para manipulação de rotas
import user from "../../icons/user.png"; // Importa o ícone do usuário
import email from "../../icons/email.png"; // Importa o ícone de e-mail
import sector from "../../icons/setor.png"; // Importa o ícone de setor
import role from "../../icons/cargo.png"; // Importa o ícone de cargo
import location from "../../icons/unidade.png"; // Importa o ícone de unidade

const Register = () => {
  const navigate = useNavigate(); // Inicializa o hook para navegação entre páginas

  // Função para voltar à página anterior
  const handleBtnBackPage = () => {
    navigate(-1);
  };

  // Dados de registro pré-definidos (para comparação)
  const dataRegister = {
    name: "gabryel",
    role: "aprovador",
    sector: "administrativo",
    location: "vitoria",
    email: "gabryel@gmail.com",
    password: "123456",
    radioButton: true,
  };

  // Estado para os campos do formulário
  const [nameRegisterP, setNameRegister] = useState("");
  const [roleRegisterP, setRoleRegisterP] = useState("");
  const [sectorRegisterP, setSectorRegisterP] = useState("");
  const [locationRegisterP, setLocationRegisterP] = useState("");
  const [emailRegisterP, setEmailRegister] = useState("");
  const [errors, setErrors] = useState({}); // Estado para armazenar mensagens de erro
  const [selectedRadioButton, setSelectedRadioButton] = useState(""); // Estado para o valor do botão de rádio
  const [registrationError, setRegistrationError] = useState(false); // Estado para indicar erro no registro

  // Função para definir mensagens de erro
  const alertError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message })); // Atualiza o estado de erros
  };

  // Função para lidar com a tentativa de registro
  const handleRegisterPermission = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    setErrors({}); // Reseta os erros anteriores
    setRegistrationError(false); // Reseta o erro de registro

    // Variável para controlar se houve erro
    let hasError = false;

    // Valida os campos do formulário
    if (!nameRegisterP) {
      alertError("name", "O campo Nome não pode estar vazio!"); // Mensagem de erro para o campo Nome
      hasError = true; // Indica que houve um erro
    }
    if (!roleRegisterP) {
      alertError("role", "O campo Cargo não pode estar vazio"); // Mensagem de erro para o campo Cargo
      hasError = true;
    }
    if (!sectorRegisterP) {
      alertError("sector", "O campo de Setor não pode estar vazio"); // Mensagem de erro para o campo Setor
      hasError = true;
    }
    if (!locationRegisterP) {
      alertError("location", "O campo Unidade não pode estar vazio"); // Mensagem de erro para o campo Unidade
      hasError = true;
    }
    if (!emailRegisterP) {
      alertError("email", "O campo E-mail não pode estar vazio!"); // Mensagem de erro para o campo E-mail
      hasError = true;
    }
    if (!selectedRadioButton) {
      alertError("checkbox", "Selecione uma função."); // Mensagem de erro para o botão de rádio
      hasError = true;
    }

    // Se não houver erros, prosseguir com o cadastro
    if (!hasError) {
      // Verifica se os dados do formulário correspondem aos dados pré-definidos
      const isRegistrationSuccessful =
        nameRegisterP.toLowerCase() === dataRegister.name &&
        roleRegisterP.toLowerCase() === dataRegister.role &&
        sectorRegisterP.toLowerCase() === dataRegister.sector &&
        locationRegisterP.toLowerCase() === dataRegister.location &&
        emailRegisterP.toLowerCase() === dataRegister.email;

      // Se o cadastro for bem-sucedido, exibe uma mensagem de sucesso
      if (isRegistrationSuccessful) {
        alert(`Cadastro realizado com sucesso!\nBem-vindo, ${dataRegister.name}`);
      } else {
        setRegistrationError(true); // Se não, define erro de registro
      }
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
      <form onSubmit={handleRegisterPermission}>
        <h1>Cadastrar Usuário</h1>
        {/* Campo para Nome */}
        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={user} alt="User Icon" className={styles.Icon} />
            <input
              type="text"
              name="nameRegisterP"
              placeholder="Nome"
              value={nameRegisterP}
              onChange={(e) => setNameRegister(e.target.value)} // Atualiza o estado do nome
              required
            />
          </div>
          {errors.name && <div className={styles.errorAlert}>{errors.name}</div>} {/* Exibe erro se houver */}
        </div>
        {/* Campo para Cargo */}
        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={role} alt="User Icon" className={styles.Icon} />
            <input
              type="text"
              name="roleRegisterP"
              placeholder="Cargo"
              value={roleRegisterP}
              onChange={(e) => setRoleRegisterP(e.target.value)} // Atualiza o estado do cargo
              required
            />
          </div>
          {errors.role && <div className={styles.errorAlert}>{errors.role}</div>} {/* Exibe erro se houver */}
        </div>
        {/* Campo para Setor */}
        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={sector} alt="User Icon" className={styles.Icon} />
            <input
              type="text"
              name="sectorRegisterP"
              placeholder="Setor"
              value={sectorRegisterP}
              onChange={(e) => setSectorRegisterP(e.target.value)} // Atualiza o estado do setor
              required
            />
          </div>
          {errors.sector && <div className={styles.errorAlert}>{errors.sector}</div>} {/* Exibe erro se houver */}
        </div>
        {/* Campo para Unidade */}
        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterNameInput}>
            <img src={location} alt="User Icon" className={styles.Icon} />
            <input
              type="text"
              name="locationRegisterP"
              placeholder="Unidade"
              value={locationRegisterP}
              onChange={(e) => setLocationRegisterP(e.target.value)} // Atualiza o estado da unidade
              required
            />
          </div>
          {errors.location && <div className={styles.errorAlert}>{errors.location}</div>} {/* Exibe erro se houver */}
        </div>
        {/* Campo para E-mail */}
        <div className={styles.RegisterInputContainer}>
          <div className={styles.RegisterEmailInput}>
            <img src={email} alt="Email Icon" className={styles.Icon} />
            <input
              type="email"
              name="emailRegisterP"
              placeholder="E-mail"
              value={emailRegisterP}
              onChange={(e) => setEmailRegister(e.target.value)} // Atualiza o estado do e-mail
              required
            />
          </div>
          {errors.email && <div className={styles.errorAlert}>{errors.email}</div>} {/* Exibe erro se houver */}
        </div>
        {/* Seleção do Cargo com Botões de Rádio */}
        <div className={styles.CheckBox}>
          <div className={styles.CheckFuncUser}>
            <input
              type="radio"
              name="userRole"
              value="Funcionário"
              onChange={(e) => setSelectedRadioButton(e.target.value)} // Atualiza o estado do cargo selecionado
            />{" "}
            Funcionário
          </div>
          <div className={styles.CheckPermUser}>
            <input
              type="radio"
              name="userRole"
              value="Liberador"
              onChange={(e) => setSelectedRadioButton(e.target.value)} // Atualiza o estado do cargo selecionado
            />{" "}
            Liberador
          </div>
          <div className={styles.CheckManagerUser}>
            <input
              type="radio"
              name="userRole"
              value="Gerente"
              onChange={(e) => setSelectedRadioButton(e.target.value)} // Atualiza o estado do cargo selecionado
            />{" "}
            Gerente
          </div>
        </div>
        {errors.checkbox && <div className={styles.errorAlert}>{errors.checkbox}</div>} {/* Exibe erro se houver */}
        <div className={styles.RegisterBtnRegister}>
          {registrationError && (
            <div className={styles.errorAlert}>
              Não foi possível efetuar o cadastro! Verifique os dados inseridos.
            </div>
          )}
          <button type="submit">Cadastrar</button> {/* Botão para enviar o formulário */}
        </div>
      </form>
    </div>
  );
};

export default Register; 
