import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Modal } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import styles from "./UploadDocumentComponent.module.css";
import { useNavigate } from "react-router-dom";

export default function UploadDocument() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [textArea, setTextArea] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para o modal de confirmação
  const fileInputRef = useRef(null); // Referência para o input de arquivo

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(event.target.files),
      ]);
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

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const errors = []; // Array para armazenar mensagens de erro

    // Verificação se não há arquivos ou categoria não selecionada
    if (files.length === 0) {
      errors.push("Por favor, anexe um arquivo.");
    }
    if (!selectedButton) {
      errors.push("Por favor, selecione uma categoria.");
    }

    // Se houver erros, atualiza o estado de mensagens de erro
    if (errors.length > 0) {
      setErrorMessages(errors);
      setSuccessMessage(""); // Limpa a mensagem de sucesso, se houver
    } else {
      setErrorMessages([]); // Limpa as mensagens de erro
      setSuccessMessage("Envio realizado com sucesso!"); // Define a mensagem de sucesso

      // Limpa os campos após o envio
      setFiles([]);
      setSelectedButton(null);
      setTextArea(""); // Limpa o campo de texto
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Limpa o input de arquivo
      }
      setShowModal(true); // Mostra o modal após o envio bem-sucedido
    }
  };

  const handleCloseModal = (sendAnother) => {
    setShowModal(false); // Fecha o modal
    if (sendAnother) {
      // Se o usuário deseja enviar outro documento, não faz nada
      setSuccessMessage(""); // Limpa a mensagem de sucesso
    } else {
      // Se o usuário não deseja enviar outro documento, volta à página anterior
      handleBtnBackPage();
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
                  multiple
                  ref={fileInputRef} // Adicionando a referência aqui
                />
                {errorMessages.includes("Por favor, anexe um arquivo.") && (
                  <div className="text-danger">Por favor, anexe um arquivo.</div>
                )}
              </Form.Group>
              <div className={styles.BtnOption}>
                <div>
                  <button
                    className={`${styles.BtnHotel} ${selectedButton === "hotel" ? styles.selected : ""}`}
                    type="button"
                    onClick={() => handleClickSelected("hotel")}
                  >
                    Hotel
                  </button>
                </div>
                <div>
                  <button
                    className={`${styles.BtnFood} ${selectedButton === "food" ? styles.selected : ""}`}
                    type="button"
                    onClick={() => handleClickSelected("food")}
                  >
                    Comida
                  </button>
                </div>
                <div>
                  <button
                    className={`${styles.BtnTransport} ${selectedButton === "transport" ? styles.selected : ""}`}
                    type="button"
                    onClick={() => handleClickSelected("transport")}
                  >
                    Transporte
                  </button>
                </div>
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
                  onChange={(e) => setTextArea(e.target.value)} // Atualiza o estado
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
              {successMessage && (
                <div className="text-success mt-3 text-center">
                  {successMessage}
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Modal de confirmação */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja enviar outro documento?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você gostaria de enviar outro documento?</p>
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
}
