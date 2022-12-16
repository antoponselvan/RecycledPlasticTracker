// @ts-nocheck 
import {Row, Col, Form, Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"

import * as web3 from '@solana/web3.js'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {  WalletMultiButton} from "@solana/wallet-adapter-react-ui";


const Register = () => {

  const navigate = useNavigate()
  const wallet = useAnchorWallet()

  const registerToDB = async (name, regCountry, regNum, email,phoneNum, address, password, solanaPubKey) => {
    const res = await fetch("/api/manufacturer/register",{
      method:"POST",
      body:JSON.stringify({
        name, regCountry, regNum, email,phoneNum, address, password, solanaPubKey
      }),
      headers: {
        "content-Type":"application/json",
      }
    })
    const status = res.status
    const data = await res.json()
    const msg = data.msg
    return {status, msg}

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const regCountry = e.target.regCountry.value
    const regNum = e.target.regNum.value 
    const email = e.target.email.value 
    const phoneNum = e.target.phoneNum.value 
    const address = e.target.address.value 
    const password = e.target.password.value 
    const rePassword = e.target.rePassword.value 
    const solanaPubKey = wallet?.publicKey.toString() 

    if (!wallet?.publicKey) {
      alert("Please connect to Solana")
      return
    }

    if (password !== rePassword){
      window.alert("Passwords dont match!")
      return
    }

    const dbResponse = await registerToDB(name, regCountry, regNum, email,phoneNum, address, password, solanaPubKey)
    alert(dbResponse.msg)
    if (dbResponse.status !==201){return}
    navigate("/manufacturer/login")

    // fetch("/api/manufacturer/register",{
    //   method:"POST",
    //   body:JSON.stringify({
    //     name, regCountry, regNum, email,phoneNum, address, password, solanaPubKey
    //   }),
    //   headers: {
    //     "content-Type":"application/json",
    //   }
    // }).then((res)=>{
    //   if (res.status !== 201){
    //     window.alert("Registration failed")
    //     throw new Error({msg:"Fetch failed"})
    //   }
    //   return res.json()
    // }).then((data)=>{
    //   window.alert("Manufacturer Registered")
    //   navigate("/manufacturer/login")
    // })
  }

  return (
    <>
    <Row className="text-center">
    <Col sm={2} md={3} lg={4}></Col>
    <Col className="p-1 m-1 mt-3">
      <h3>Register  Manufacturer</h3>

      <Form className="text-center mt-4" onSubmit={handleSubmit}>
        <div className="d-flex m-1 mb-2 align-items-center">
          <Form.Label style={{width:"210px"}} className="text-danger">Public Key (Solana)</Form.Label>
          {/* <Form.Control style={{width:"200px"}} name="solanaPubKey"></Form.Control> */}
          <WalletMultiButton /> 
        </div>

        <div className="bg-secondary py-2">
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Name</Form.Label>
          <Form.Control style={{width:"250px"}} name="name"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Country</Form.Label>
          <Form.Control style={{width:"250px"}} name="regCountry"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Comp Country Reg#</Form.Label>
          <Form.Control style={{width:"250px"}} name="regNum"></Form.Control>
        </div>
        </div>

        <div className="bg-secondary py-2 mt-3">
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Email</Form.Label>
          <Form.Control style={{width:"250px"}} name="email"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Phone #</Form.Label>
          <Form.Control style={{width:"250px"}} name="phoneNum"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Address</Form.Label>
          <Form.Control style={{width:"250px"}} name="address"></Form.Control>
        </div>
        </div>

        <div className="bg-secondary  py-2 my-3">
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Password</Form.Label>
          <Form.Control style={{width:"250px"}} name="password"></Form.Control>
        </div>
        <div className="d-flex m-1">
          <Form.Label style={{width:"150px"}}>Retype Password</Form.Label>
          <Form.Control style={{width:"250px"}} name="rePassword"></Form.Control>
        </div>
        </div>

      
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p> Have an ID? - Login <a  style={{ cursor: 'pointer' }} onClick={()=>navigate('/manufacturer/login')}>HERE</a></p>
    </Col>

    <Col sm={2} md={3} lg={4} className=""></Col>
    </Row>
    </>
  )
}

export default Register