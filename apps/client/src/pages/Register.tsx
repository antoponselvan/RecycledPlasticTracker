import {Row, Col, Form, Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"

const Register = () => {

  const navigate = useNavigate()

  return (
    <>
    <Row className="text-center">
      
    <Col sm={2} md={3} lg={4}></Col>
    <Col className="border p-1 m-2 mt-5">
      <h3>REGISTER  MANUFACTURER</h3>
      <Form className="text-center mt-4">
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Name</Form.Label>
          <Form.Control></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Country</Form.Label>
          <Form.Control></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Registration #</Form.Label>
          <Form.Control></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Email</Form.Label>
          <Form.Control></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Phone #</Form.Label>
          <Form.Control></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Password</Form.Label>
          <Form.Control></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>ReType Password</Form.Label>
          <Form.Control></Form.Control>
        </div>
        <div className="d-flex m-1 mb-4">
          <Form.Label style={{width:"150px"}} className="text-danger">Public Key (Solana)</Form.Label>
          <Form.Control  disabled></Form.Control>
        </div>

      
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p> Have an ID? - Login <a  style={{ cursor: 'pointer' }} onClick={()=>navigate('/manufacturer/login')}>HERE</a></p>
    </Col>

    <Col sm={2} md={3} lg={4}></Col>
    </Row>
    </>
  )
}

export default Register