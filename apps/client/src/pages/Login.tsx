
import {Row, Col, Form, Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  return (
    <>
    <Row className="text-center">
      
    <Col sm={2} md={3} lg={4}></Col>
    <Col className="border p-1 m-2 mt-5">
      <h3>LOGIN</h3>
      <Form className="text-center mt-2">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p> Dont have an ID? - Register <a  style={{ cursor: 'pointer' }} onClick={()=>navigate('/manufacturer/register')}>HERE</a></p>
    </Col>

    <Col sm={2} md={3} lg={4}></Col>
    </Row>
    </>
  )
}

export default Login