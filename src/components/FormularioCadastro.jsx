import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormularioCadastro() {
  return (
    <Form className='formulario-cadastro'>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Form>
  );
}

export default FormularioCadastro;