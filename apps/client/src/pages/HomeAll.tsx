// @ts-nocheck 
import img1 from "../assets/recycling_img1.jpg"
import { Container, Row, Col, Button, Card} from "react-bootstrap"
import {useNavigate} from 'react-router-dom'

const HomeAll = () => {
  const navigate = useNavigate()

  return (
    <>
    <Container>
      <Row className="justify-content-center">
        <Col sm={1} md={2} lg={3}></Col>
        <Col className="text-center mx-auto justify-content-center">
          {/* <Stack className="text-align-center"> */}
            <p></p>          
            <h3>Recycled Plastic Certifier & Verifier</h3>
            <p></p>
            <Card className="mt-4">
            <Card.Header>
            <h5>Choose Your Role</h5>
            <Button className="m-2" style={{width:"160px"}} onClick={()=>navigate('/manufacturer/login')}>Manufacturer</Button>
            <Button className="m-2" style={{width:"160px"}} onClick={()=>navigate('/track')}>Purchaser</Button>
            </Card.Header>
            </Card>
            <img className="" src={img1} alt=""/>  
          {/* </Stack> */}
        </Col>
        <Col sm={1} md={2} lg={3}></Col>
      </Row>
    </Container>
    </>
    )
}

export default HomeAll