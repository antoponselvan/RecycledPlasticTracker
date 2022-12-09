import {Row, Col, Form, Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"

const RegisterSale = () => {

  const navigate = useNavigate()

  return (
    <>
    <Row className="text-center">
      
      <Col sm={2} md={3} lg={4}></Col>
      <Col className="border p-1 m-2 mt-5">
        <h3>REGISTER PRODUCT SOLD</h3>
        <Form className="text-center mt-4">
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Name</Form.Label>
            <Form.Control></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Description</Form.Label>
            <Form.Control></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Buyer's Public Key</Form.Label>
            <Form.Control></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Serial #</Form.Label>
            <Form.Control></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Net Weight</Form.Label>
            <Form.Control></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Re-Plastic %</Form.Label>
            <Form.Control></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Ingridient</Form.Label>
            <Form.Control></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"150px"}} className="">Date of Sale</Form.Label>
            <Form.Control></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"150px"}} className="">Location (Lat)</Form.Label>
            <Form.Control></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"150px"}} className="">Location (Lng)</Form.Label>
            <Form.Control></Form.Control>
          </div>
  
        
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Col>
  
      <Col sm={2} md={3} lg={4}></Col>
      </Row>
    </>
  )
}

export default RegisterSale