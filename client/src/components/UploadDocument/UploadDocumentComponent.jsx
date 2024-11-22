import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Modal } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import styles from "./UploadDocumentComponent.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export default function UploadDocument() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [textArea, setTextArea] = useState("");
  const [valor_pedido, setValorPedido] = useState("");
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const location = useLocation();
  const tipoDedutivel = location.state?.tipoDedutivel;
  const [userId, setUserId] = useState(null);
  const url_solicitacao = 'http://localhost:3001/api/solicitacoes/create';

  const allowedFileTypes = ['.pdf', '.doc', '.docx', '.jpeg', '.png', '.jpg', '.jfif'];

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      if (allowedFileTypes.includes(fileExtension)) {
        setFiles([file]);
        setErrorMessages(errorMessages.filter(msg => msg !== "Tipo de arquivo não permitido."));
      } else {
        setErrorMessages([...errorMessages, "Tipo de arquivo não permitido."]);
        event.target.value = ''; // Limpa o input de arquivo
      }
    }
  };
  
  const removeFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleBtnBackPage = () => {
    navigate(-1);
  };

  const handleClickSelected = (button) => {
    setSelectedButton(button);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessages([]);

    if (!selectedButton) {
      setErrorMessages((prev) => [...prev, "Por favor, selecione uma categoria."]);
      return;
    }

    if (files.length === 0) {
      setErrorMessages((prev) => [...prev, "Por favor, anexe um arquivo."]);
      return;
    }

    if (!valor_pedido || valor_pedido.trim() === "") {
      setErrorMessages((prev) => [...prev, "Por favor, insira o valor do pedido."]);
      return;
    }

    const valorNumerico = parseFloat(valor_pedido);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      setErrorMessages((prev) => [...prev, "O valor do pedido deve ser um número positivo."]);
      return;
    }

    if (!userId) {
      console.error('Usuário não autenticado.');
      return;
    }

    const formData = new FormData();
    formData.append("id_usuario", userId);
    formData.append("valor_pedido_solic", valor_pedido);
    formData.append("tipo_dedutivel_solic", tipoDedutivel);
    formData.append("categoria", selectedButton);
    formData.append("descricao", textArea);
    formData.append("anexo_nf", files[0]);

    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(url_solicitacao, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Solicitação enviada com sucesso!");
        setFiles([]);
        fileInputRef.current.value = "";
        setValorPedido("");
        setTextArea("");
        setSelectedButton(null);
        setShowModal(true);
      } else {
        console.error("Falha ao enviar dados:", response.status);
        setErrorMessages((prev) => [...prev, "Erro ao enviar dados."]);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setErrorMessages((prev) => [...prev, "Erro ao enviar dados."]);
    }
  };

  const handleCloseModal = (sendAnother) => {
    setShowModal(false);
    if (!sendAnother) {
      handleBtnBackPage();
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div className={styles.component}>
      <button
        className={`${styles.infoButtonBack} ${styles.button_back_position}`}
        onClick={handleBtnBackPage}
      >
        <span className={styles.infoArrow}>&larr;</span> Voltar
      </button>
      <h1 className="text-center mb-4">Anexar Comprovante</h1>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  accept={allowedFileTypes.join(',')}
                />
                {errorMessages.includes("Por favor, anexe um arquivo.") && (
                  <div className="text-danger">Por favor, anexe um arquivo.</div>
                )}
                {errorMessages.includes("Tipo de arquivo não permitido.") && (
                  <div className="text-danger">Tipo de arquivo não permitido.</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Valor do Pedido</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite o valor"
                  value={valor_pedido}
                  onChange={(e) => setValorPedido(e.target.value)} 
                />
                {errorMessages.includes("Por favor, insira o valor do pedido.") && (
                  <div className="text-danger">Por favor, insira o valor do pedido.</div>
                )}
                {errorMessages.includes("O valor do pedido deve ser um número positivo.") && (
                  <div className="text-danger">O valor do pedido deve ser um número positivo.</div>
                )}
              </Form.Group>

              <label>Selecione uma categoria:</label>
              <div className={styles.BtnOption}>
                <button
                  className={`${styles.BtnHotel} ${selectedButton === "Hospedagem" ? styles.selected : ""}`}
                  type="button"
                  onClick={() => handleClickSelected("Hospedagem")}
                >
                  Hospedagem
                </button>
                <button
                  className={`${styles.BtnFood} ${selectedButton === "Alimentação" ? styles.selected : ""}`}
                  type="button"
                  onClick={() => handleClickSelected("Alimentação")}
                >
                  Alimentação
                </button>
                <button
                  className={`${styles.BtnTransport} ${selectedButton === "Transporte" ? styles.selected : ""}`}
                  type="button"
                  onClick={() => handleClickSelected("Transporte")}
                >
                  Transporte
                </button>
                <button
                  className={`${styles.BtnTransport} ${selectedButton === "Outros" ? styles.selected : ""}`}
                  type="button"
                  onClick={() => handleClickSelected("Outros")}
                >
                  Outros
                </button>
              </div>
              {errorMessages.includes("Por favor, selecione uma categoria.") && (
                <div className="text-danger">Por favor, selecione uma categoria.</div>
              )}

              <div className={styles.TextArea}>
                <textarea
                  className={styles.textAreaDescription}
                  name="textAreaDescription"
                  id="textAreaDescription"
                  placeholder="Descrição..."
                  value={textArea}
                  onChange={(e) => setTextArea(e.target.value)}
                ></textarea>
              </div>
              {files.length > 0 && (
                <ListGroup className="mb-3">
                  {files.map((file, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span className="text-truncate">{file.name}</span>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => removeFile(file)}
                      >
                        <XCircleFill size={20} />
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <div className={styles.BtnSendDiv}>
                <button className={styles.BtnSend} type="submit">Enviar</button>
              </div>
            </Form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Solicitação enviada com sucesso!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Deseja fazer outra solicitação?
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

