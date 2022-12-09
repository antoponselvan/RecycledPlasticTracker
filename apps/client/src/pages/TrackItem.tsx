
import {Row, Col, Form, Button} from "react-bootstrap"

const TrackItem = () => {
  return (
    <>
    <Row className="text-center mt-3">
      <Col lg={4} md={3} sm={1}></Col>
      <Col>
        <Form.Group className="mb-3">
          <Form.Label>Company Public Key</Form.Label>
          <Form.Control type="text" placeholder="Key" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Serial Number</Form.Label>
          <Form.Control type="text" placeholder="Serial #" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Find
        </Button>
      </Col>
      <Col lg={4} sm={1} md={3}></Col>
    </Row>

    <Row className="text-center mt-5">
      <h3>Table</h3>
    </Row>
    </>
  )
}

export default TrackItem