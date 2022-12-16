// @ts-nocheck 
import {Row, Col, Form, Button} from "react-bootstrap"
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {manufacturerActions} from "../store/manufacturerSlice"
// import {} from "jsonwebtoken"
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const manufacturer = useSelector((state)=>state.manufacturer)
  // const token = useSelector((state)=>state.token)

  useEffect(()=>{
    // const manufacturer1 = JSON.parse(localStorage.getItem('manufacturer'))
    // console.log(manufacturer)
    const token = localStorage.getItem("token")

    if (token){
      fetch("/api/general/verifyuser",{
        headers:{
          Authorization: `bearer ${token}`
        }
      }).then((res)=>{
        console.log(res.status)
        if (res.status !== 200){
          // window.alert("Login Failed")
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

  const handleLogin = (e) => {
    e.preventDefault()
    // console.log(e.target.email.value, e.target.password.value)
    const email = e.target.email.value
    const password = e.target.password.value
    fetch("/api/manufacturer/login",{
      method:"POST",
      body:JSON.stringify({email, password}),
      headers:{
        "Content-Type":"application/json",
      },
    }).then((res)=>{
      if (res.status !== 202){
        window.alert("Login Failed")
        throw new Error({msg: "Fetch Failed"})
      }
      return res.json()})
    .then((data)=>{
      console.log(data)
      localStorage.setItem("token",data.token)
      // localStorage.setItem("manufacturer", data.manufacturer)
      dispatch(manufacturerActions.updateToken(data.token))
      dispatch(manufacturerActions.updateManufacturer(data.manufacturer))
      navigate("/manufacturer/home")
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <>
    <Row className="text-center">
      
    <Col sm={2} md={3} lg={4}></Col>
    <Col className="border p-1 m-2 mt-5">
      <h3>LOGIN</h3>
      <Form className="text-center mt-2" onSubmit={handleLogin}>
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
      <p> Dont have an ID? - Register <a  style={{ cursor: 'pointer' }} onClick={()=>navigate('/manufacturer/register')}>HERE</a></p>
    </Col>

    <Col sm={2} md={3} lg={4}></Col>
    </Row>
    </>
  )
}

export default Login