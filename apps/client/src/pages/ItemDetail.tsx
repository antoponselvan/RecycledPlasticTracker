
import {Row, Col, Container, Form} from "react-bootstrap"

const ItemDetail = () => {
  return (
    <>
    
    <Row className="text-center mt-3">
      <Col lg={4} md={3} sm={1}></Col>
      <Col>
        <Row className="border">
          <h3>Product Details</h3>
          <Form className="text-center mt-1">
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Name</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Description</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Buyer's Public Key</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Serial #</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Net Weight</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Re-Plastic %</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"150px"}} className="">Date of Sale</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"150px"}} className="">Location (Lat)</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"150px"}} className="">Location (Lng)</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          </Form>
        
        </Row>

        <Row className="border mt-5 mb-5">
          <h3>Manufacturer Details</h3>
          <Form className="text-center mt-2">
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Name</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Country</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Registration #</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Email</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Phone #</Form.Label>
            <Form.Control disabled></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"150px"}} className="text-danger">Public Key (Solana)</Form.Label>
            <Form.Control  disabled></Form.Control>
          </div>
        </Form>
        </Row>

      </Col>
      <Col lg={4} sm={1} md={3}></Col>
    </Row>
    </>
  )
}

export default ItemDetail