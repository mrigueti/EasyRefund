import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import styles from './UploadDocumentComponent.module.css'

export default function UploadDocument() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
    }
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter(file => file !== fileToRemove));
  };

  return (
    <div className={styles.component}>
      <h1 className="text-center mb-4">Anexar Nota Fiscal</h1>
      {/* Content */}
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="file" onChange={handleFileChange} multiple />
              </Form.Group>
              {files.length > 0 && (
                <ListGroup className="mb-3">
                  {files.map((file, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      <span className="text-truncate">{file.name}</span>
                      <Button variant="link" className="text-danger p-0" onClick={() => removeFile(file)}>
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