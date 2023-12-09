// @ts-nocheck 
import {Row, Col, Form, Button} from "react-bootstrap"
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {manufacturerActions} from "../store/manufacturerSlice"
// import {} from "jsonwebtoken"
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const token = localStorage.getItem("token")

    if (token){
      fetch("https://j5so6wp9z0.execute-api.us-east-1.amazonaws.com/api/general/verifyuser",{
        headers:{
          Authorization: `bearer ${token}`
        }
      }).then((res)=>{
        console.log(res.status)
        if (res.status !== 200){
          throw new Error({msg:"Invalid User"})
        }
        return res.json()})
      .catch((error)=>{
          console.log(error)
        })
      .then((data)=>{
        dispatch(manufacturerActions.updateToken(token))
        dispatch(manufacturerActions.updateManufacturer(data.manufacturer))
        navigate("/manufacturer/home")
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },[])

  const handleLogin = (email,password) => {
    setIsLoading(true)
    fetch("https://j5so6wp9z0.execute-api.us-east-1.amazonaws.com/api/manufacturer/login",{
      method:"POST",
      body:JSON.stringify({email, password}),
      headers:{
        "Content-Type":"application/json",
      },
    }).then((res)=>{
      if (res.status !== 202){
        setIsLoading(false)
        window.alert("Login Failed")
        throw new Error({msg: "Fetch Failed"})
      }
      return res.json()})
    .then((data)=>{
      setIsLoading(false)
      localStorage.setItem("token",data.token)
      dispatch(manufacturerActions.updateToken(data.token))
      dispatch(manufacturerActions.updateManufacturer(data.manufacturer))
      navigate("/manufacturer/home")
    })
    .catch((error)=>{
      setIsLoading(false)
      console.log(error)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    handleLogin(email, password)
  }

  const handleDemo = () => {
    const email = "e@e.com"
    const password = "e123"
    handleLogin(email,password)
  }

  return (
    <>
    <Row className="text-center m-1">
      
    <Col sm={2} md={3} lg={4}></Col>
    <Col className="border p-1 m-2 mt-5">
      <h3>MANUFACTURER LOGIN</h3>
      {isLoading ?
        <div>
          <div className="spinner-grow" role="status"></div>
          <div className="spinner-grow" role="status"></div>
          <div className="spinner-grow" role="status"></div>
        </div>
        :
        <Form className="text-center mt-2" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      }
      <p> Dont have an ID? - Register <a  style={{ cursor: 'pointer' }} onClick={()=>navigate('/manufacturer/register')}>HERE</a></p>
      <p>For Demo w/o Login ID - 
        <Button variant="secondary" onClick={handleDemo}>
          Demo
        </Button>
      </p>
    </Col>

    <Col sm={2} md={3} lg={4}></Col>
    </Row>
    </>
  )
}

export default Login