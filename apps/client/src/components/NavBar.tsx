
import {useNavigate} from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { Button } from "react-bootstrap"
import {faMagnifyingGlass, faHouseUser, faUser} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const NavBar = () => {

  const navigate = useNavigate()

  return (
    <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand onClick={()=>navigate("/")}>Re-Plastic Tracker!</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate("/track")}> <FontAwesomeIcon icon={faMagnifyingGlass}/></Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-3">
              <Nav.Link onClick={()=>navigate("/manufacturer/home")}><FontAwesomeIcon icon={faHouseUser}/></Nav.Link>
              <Nav.Link onClick={()=>navigate("/manufacturer/registersale")}>Register</Nav.Link>
              <Nav.Link onClick={()=>navigate("/manufacturer/solditemslist")}>Sold_Items</Nav.Link>
              <Nav.Link onClick={()=>navigate("/manufacturer/profile")}><FontAwesomeIcon icon={faUser} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
          
          <Button onClick={()=>navigate("/manufacturer/login")}><p className="m-0 p-0">Login</p></Button>
        </Container>
    </Navbar>
  )
}

export default NavBar