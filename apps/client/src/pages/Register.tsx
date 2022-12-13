import {Row, Col, Form, Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"

const Register = () => {

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const regCountry = e.target.regCountry.value
    const regNum = e.target.regNum.value 
    const email = e.target.email.value 
    const phoneNum = e.target.phoneNum.value 
    const address = e.target.address.value 
    const password = e.target.password.value 
    const rePassword = e.target.rePassword.value 
    const solanaPubKey = e.target.solanaPubKey.value 

    if (password !== rePassword){
      window.alert("Passwords dont match!")
      return
    }

    fetch("/api/manufacturer/register",{
      method:"POST",
      body:JSON.stringify({
        name, regCountry, regNum, email,phoneNum, address, password, solanaPubKey
      }),
      headers: {
        "content-Type":"application/json",
      }
    }).then((res)=>{
      if (res.status !== 201){
        window.alert("Registration failed")
        throw new Error({msg:"Fetch failed"})
      }
      return res.json()
    }).then((data)=>{
      window.alert("Manufacturer Registered")
      navigate("/manufacturer/login")
    })
  }

  return (
    <>
    <Row className="text-center">
      
    <Col sm={2} md={3} lg={4}></Col>
    <Col className="border p-1 m-2 mt-5">
      <h3>REGISTER  MANUFACTURER</h3>
      <Form className="text-center mt-4" onSubmit={handleSubmit}>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Name</Form.Label>
          <Form.Control name="name"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Country</Form.Label>
          <Form.Control name="regCountry"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Registration #</Form.Label>
          <Form.Control name="regNum"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Email</Form.Label>
          <Form.Control name="email"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Phone #</Form.Label>
          <Form.Control name="phoneNum"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Address</Form.Label>
          <Form.Control name="address"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Password</Form.Label>
          <Form.Control name="password"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Retype Password</Form.Label>
          <Form.Control name="rePassword"></Form.Control>
        </div>
        <div className="d-flex m-1 mb-4">
          <Form.Label style={{width:"210px"}} className="text-danger">Public Key (Solana)</Form.Label>
          <Form.Control name="solanaPubKey"></Form.Control>
          <Button variant="secondary">Use Wallet</Button>
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