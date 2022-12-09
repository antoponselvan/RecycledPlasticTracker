
import {Row, Col, } from "react-bootstrap"

const HomeManufacturer = () => {
  return (
    <>
    <Row className="text-center mt-3">
      <Col lg={4} md={3} sm={1}></Col>
      <Col>
        <h3>Hi, <span>User</span></h3>
        <h4>User Stats</h4>
        <h6>Total Products registered: <span></span></h6>
        <h6>Average Recycled Plastic % : <span></span></h6>
      </Col>
      <Col lg={4} sm={1} md={3}></Col>
    </Row>

    <Row className="text-center mt-5">
      <h3>Table</h3>
    </Row>
    
    </>
  )
}

export default HomeManufacturer