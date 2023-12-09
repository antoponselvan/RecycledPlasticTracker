// @ts-nocheck 
import {Row, Col, Form, Button} from "react-bootstrap"
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

const Profile = () => {
  const navigate = useNavigate()
  const token = useSelector((state)=>state.token)
  const manufacturer = useSelector((state)=>state.manufacturer)
  console.log(token)
  useEffect(()=>{
    if (token == ""){
      navigate("/manufacturer/login")
    } 
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    const phoneNum = e.target.phoneNum.value
    const address = e.target.address.value
    const password = e.target.password.value
    const rePassword = e.target.rePassword.value

    if (password !== rePassword){
      window.alert("Passwords Dont Match!")
      return
    }

    fetch("https://j5so6wp9z0.execute-api.us-east-1.amazonaws.com/api/manufacturer/updateprofile",{
      method: "PUT",
      body: JSON.stringify({
        id:manufacturer._id,
        phoneNum,
        address,
        password
      }),
      headers:{
        'content-Type':"application/json",
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      if (res.status !==200){
        throw new Error({msg:"Fetch Failed"})
        return
      }
      return res.json()
    }).then((data)=>{
      window.alert("Record Updated")
    }).catch((error)=>{
      console.log(error)
    }

    )
  }

  return (
    <>
    <Row className="text-center m-1">
      
      <Col sm={2} md={3} lg={4}></Col>
      <Col className="border p-1 m-2 mt-5">
        <h3>UPDATE PROFILE</h3>
        <Form className="text-center mt-4" onSubmit={handleSubmit}>
        <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>ID</Form.Label>
            <Form.Control disabled placeholder={manufacturer._id}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Name</Form.Label>
            <Form.Control disabled placeholder={manufacturer.name}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Country</Form.Label>
            <Form.Control disabled placeholder={manufacturer.regCountry}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Registration #</Form.Label>
            <Form.Control disabled  placeholder={manufacturer.regNum}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Email</Form.Label>
            <Form.Control disabled  placeholder={manufacturer.email}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Phone #</Form.Label>
            <Form.Control  placeholder={manufacturer.phoneNum} name="phoneNum"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Address</Form.Label>
            <Form.Control  placeholder={manufacturer.address} name="address"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Password</Form.Label>
            <Form.Control name="password"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>ReType Password</Form.Label>
            <Form.Control name="rePassword"></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"150px"}} className="text-danger">Public Key (Solana)</Form.Label>
            <Form.Control disabled  placeholder={manufacturer.solanaPubKey}></Form.Control>
          </div>
  
        
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
        </Col>

    <Col sm={2} md={3} lg={4}></Col>
    </Row>
    </>
  )
}

export default Profile