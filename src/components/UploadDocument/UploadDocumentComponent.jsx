import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";
import styles from "./UploadDocumentComponent.module.css";
import { useNavigate } from "react-router-dom";

export default function UploadDocument() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [showTextArea, setShowTextArea] = useState(""); // Controla qual textarea mostrar
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Estado para controle de desativação dos botões
  const textAreaRef = useRef(null); // Ref para o textarea

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

  const handleShowTextArea = (type) => {
    setShowTextArea(type); // Atualiza o estado para o tipo correspondente
    setIsButtonDisabled(true); // Desativa os outros botões
  };

  // Efeito para lidar com cliques fora do textarea
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textAreaRef.current && !textAreaRef.current.contains(event.target)) {
        setShowTextArea(""); // Oculta o textarea se o clique for fora
        setIsButtonDisabled(false); // Reativa os botões
      }
    };

    // Adiciona o listener ao clique do documento
    document.addEventListener("mousedown", handleClickOutside);

    // Limpa o listener ao desmontar o componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  multiple
                />
                <div className={styles.filterBtns}>
                  <div className={styles.buttonWithTextArea}>
                    <button 
                      className={styles.btnHotel} 
                      onClick={(e) => { e.preventDefault(); handleShowTextArea('hotel'); }}
                      disabled={isButtonDisabled} // Desativa o botão se isButtonDisabled for true
                    >
                      Hotel
                    </button>
                    {showTextArea === 'hotel' && (
                      <textarea 
                        ref={textAreaRef}
                        name="textAreaHotel" 
                        id="textAreaHotel" 
                        className={styles.textareaLarge} 
                      ></textarea>
                    )}
                  </div>
                  <div className={styles.buttonWithTextArea}>
                    <button 
                      className={styles.btnFood} 
                      onClick={(e) => { e.preventDefault(); handleShowTextArea('food'); }}
                      disabled={isButtonDisabled} // Desativa o botão se isButtonDisabled for true
                    >
                      Comida
                    </button>
                    {showTextArea === 'food' && (
                      <textarea 
                        ref={textAreaRef}
                        name="textAreaFood" 
                        id="textAreaFood" 
                        className={styles.textareaLarge} 
                      ></textarea>
                    )}
                  </div>
                  <div className={styles.buttonWithTextArea}>
                    <button 
                      className={styles.btnTransport} 
                      onClick={(e) => { e.preventDefault(); handleShowTextArea('transport'); }}
                      disabled={isButtonDisabled} // Desativa o botão se isButtonDisabled for true
                    >
                      Transporte
                    </button>
                    {showTextArea === 'transport' && (
                      <textarea 
                        ref={textAreaRef}
                        name="textAreaTransport" 
                        id="textAreaTransport" 
                        className={styles.textareaLarge} 
                      ></textarea>
                    )}
                  </div>
                </div>
              </Form.Group>
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
              <div className={styles.button_container}>
                <Button className={styles.button_refund} type="submit">
                  Enviar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
