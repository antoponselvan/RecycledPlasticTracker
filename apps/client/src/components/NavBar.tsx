// @ts-nocheck 

import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {manufacturerActions} from "../store/manufacturerSlice"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { Button } from "react-bootstrap"
import {faMagnifyingGlass, faHouseUser, faUser, faSquareCheck, faSquareXmark, faRegistered, faFilePen} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const NavBar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const manufacturer = useSelector((state)=>state.manufacturer)
  const handleLogOut = () => {
    console.log(manufacturerActions)
    dispatch(manufacturerActions.updateToken(""))
    dispatch(manufacturerActions.updateManufacturer({}))
    localStorage.removeItem("token")
    navigate("/manufacturer/login")
  }

  return (
    <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand onClick={()=>navigate("/")}>Re-Plastic Tracker!</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate("/track")}> <FontAwesomeIcon icon={faMagnifyingGlass}/></Nav.Link>
          </Nav>
          {(manufacturer.name) && <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-3 align-items-center">
              <Nav.Link onClick={()=>navigate("/manufacturer/home")}> <div className='p-2'> <FontAwesomeIcon icon={faHouseUser}/> Home</div></Nav.Link>
              <Nav.Link onClick={()=>navigate("/manufacturer/registersale")}> <div className='p-2'><FontAwesomeIcon icon={faFilePen}/> Register Product</div></Nav.Link>
              <Nav.Link onClick={()=>navigate("/manufacturer/solditemslist")}><div className='p-2'><FontAwesomeIcon icon={faRegistered}/> Past Registrations</div></Nav.Link>
              <Nav.Link onClick={()=>navigate("/manufacturer/profile")}><div className='p-2'><FontAwesomeIcon icon={faUser} /> Profile</div></Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </>}
          
          {(!manufacturer.name) ?
            <Button onClick={()=>navigate("/manufacturer/login")}><p className="m-0 p-0">Login</p></Button>
          :
          <Button onClick={handleLogOut}><p className="m-0 p-0 ">Logout</p></Button>}
        </Container>
    </Navbar>
  )
}

export default NavBar