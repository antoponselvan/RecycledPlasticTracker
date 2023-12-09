// @ts-nocheck 
import {Row, Col, Form, Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import {useSelector} from "react-redux"

import * as web3 from '@solana/web3.js'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { RePlasticTracker } from '../data/re_plastic_tracker'
// import { SolanaMovieProgram } from "../data_backup_pgm/solana_movie_program"
import * as smpIdl from '../data/re_plastic_tracker.json';
// import * as smpIdl from '../data_backup_pgm/solana_movie_program.json';
import * as anchor from "@project-serum/anchor";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {  WalletMultiButton} from "@solana/wallet-adapter-react-ui";

const RE_PLASTIC_TRACKER_PROGRAM_ID = "CnBe9kijpRjNv5ts2iUCKDGaZmoFVhtLTDTb1R7VSWDT"
// const RE_PLASTIC_TRACKER_BACKUP_PROGRAM_ID = '2SogeA4hASCYGTSQqoSqKy8cZ3bnka5N5U9Ewkswkyf5'

const RegisterSale = () => {

  const navigate = useNavigate()
  const token = useSelector((state)=>state.token)
  const manufacturer = useSelector((state)=>state.manufacturer)

  const { connection} = useConnection();
  const wallet = useAnchorWallet()

  const trialReadProduct = async () => {
    // if (!wallet?.publicKey.toString()) {return};
    // const serialNum = "ABCD1234"
    // const smpClient = new anchor.Program<RePlasticTracker>(
    //     smpIdl as any,
    //     new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID),
    //     new anchor.AnchorProvider(
    //         connection,
    //         wallet,
    //         anchor.AnchorProvider.defaultOptions()
    //     )
    // ) 
    // const [pda] = await web3.PublicKey.findProgramAddress(
    //     [
    //         wallet.publicKey.toBuffer(), 
    //         Buffer.from(anchor.utils.bytes.utf8.encode(serialNum))
    //     ],
    //     new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID)
    // )
    // const dataOnChain = await smpClient.account.productAccountState.fetch(pda)
    // alert(dataOnChain.serialNum)
    // console.log(dataOnChain)
  }
  

  const trialWriteProduct = async () => {
  //   if (!wallet?.publicKey) {
  //     // alert('Please connect your wallet!')
  //     return
  //   };
    
  //   const product = {rePlasticPct:10 ,serialNum:"TEST", ingridientManufacurerKey:"AFhu69Fx9G6VstaqnqsPyp6maKsmjMZx1wdqKQi4swfm", ingridientSerialNum:"TESTAA11", purchaserKey:"21VM8zfTeXt7Exevh8P1Gpy82j6QTSHPregkdc6J82f1"}
  //   const smpClient = new anchor.Program<RePlasticTracker>(
  //       smpIdl as any,
  //       new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID),
  //       new anchor.AnchorProvider(
  //           connection,
  //           wallet,
  //           anchor.AnchorProvider.defaultOptions()
  //       )
  //     )
  //   const [pda] = await web3.PublicKey.findProgramAddress(
  //     [
  //         wallet.publicKey.toBuffer(), 
  //         Buffer.from(anchor.utils.bytes.utf8.encode(product.serialNum))
  //     ],
  //     new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID)
  //   )
  //   const variant = await connection.getAccountInfo(pda)? 1: 0;
  //   console.log(variant, pda)
  //   try {
  //     const txSig = await smpClient.methods.addOrUpdateProduct(
  //         variant,
  //         product.rePlasticPct,
  //         product.serialNum,
  //         product.ingridientManufacurerKey,
  //         product.ingridientSerialNum,
  //         product.purchaserKey
  //     ).accounts({
  //         initializer: wallet.publicKey,
  //         pdaAccount: pda,
  //         systemProgram: web3.SystemProgram.programId
  //     }).rpc();
  //     alert(`Transaction submitted: https://solana.fm/tx/${txSig}?cluster=devnet-solana`)
  //     console.log(`Transaction submitted: https://solana.fm/tx/${txSig}?cluster=devnet-solana`)
  // } catch (e) {
  //     console.log(JSON.stringify(e))
  //     alert(JSON.stringify(e))
  // }
  }


  

  const getManufacturerKey = async(id: String) => {
    const res = await fetch(("https://j5so6wp9z0.execute-api.us-east-1.amazonaws.com/api/manufacturer/"+id))
    // console.log(res.status)
    if (res.status !== 200){
      return
    }
    const data = await res.json()
    return data.manufacturer.solanaPubKey
  }

  const getIngridientDetails = async(id: String) => {
    const res = await fetch("https://j5so6wp9z0.execute-api.us-east-1.amazonaws.com/api/product/getone/"+id)
    if (res.status !== 200){
      return
    }
    const data = await res.json()
    console.log(data)
    const ingridientDetails = {
      serialNum: data.product.serialNum,
      pubKey: data.manufacturer.solanaPubKey
    }
    return ingridientDetails
  }


  const writeToDB = async(token,name, description,serialNum,rePlasticPct,purchaserId,ingridientId,saleYear,saleMonth,saleDate,manufacLocLatDeg,manufacLocLongDeg,recyclingStartPoint) => {
    const res = await fetch("https://j5so6wp9z0.execute-api.us-east-1.amazonaws.com/api/product/register",{
      method:"POST",
      headers:{
        "content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({name, description,serialNum,rePlasticPct,purchaserId,ingridientId,saleYear,saleMonth,saleDate,manufacLocLatDeg,manufacLocLongDeg,recyclingStartPoint})
    })
    const status = res.status
    const data = await res.json()
    const msg = data.msg
    return {status, msg}
  }

  const writeToSolana = async(rePlasticPct, serialNum, ingridientManufacurerKey, ingridientSerialNum, purchaserKey) => {
    if (!wallet?.publicKey) { return };
    const smpClient = new anchor.Program<RePlasticTracker>(
        smpIdl as any,
        new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID),
        new anchor.AnchorProvider(
            connection,
            wallet,
            anchor.AnchorProvider.defaultOptions()
        )
      )
    const [pda] = await web3.PublicKey.findProgramAddress(
      [wallet.publicKey.toBuffer(), 
      Buffer.from(anchor.utils.bytes.utf8.encode(serialNum))],
      new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID)
    )
    const variant = await connection.getAccountInfo(pda)? 1: 0;
    console.log(variant, pda)
    try {
      const txSig = await smpClient.methods.addOrUpdateProduct(
          variant, rePlasticPct, serialNum,ingridientManufacurerKey,ingridientSerialNum,purchaserKey
      ).accounts({
          initializer: wallet.publicKey,
          pdaAccount: pda,
          systemProgram: web3.SystemProgram.programId
      }).rpc();
      alert(`Transaction submitted: https://solana.fm/tx/${txSig}?cluster=devnet-solana`)
      console.log(`Transaction submitted: https://solana.fm/tx/${txSig}?cluster=devnet-solana`)
  } catch (e) {
      console.log(JSON.stringify(e))
      alert(JSON.stringify(e))
  }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log((e.target.recycleStartPoint.checked))
    const name = e.target.name.value
    const description = e.target.description.value
    const serialNum = e.target.serialNum.value
    const rePlasticPct = e.target.rePlasticPct.value
    const purchaserId = e.target.purchaserId.value
    const ingridientId = e.target.ingridientId.value
    const saleYear = e.target.saleYear.value
    const saleMonth = e.target.saleMonth.value
    const saleDate = e.target.saleDate.value
    const manufacLocLatDeg = e.target.manufacLocLatDeg.value
    const manufacLocLongDeg = e.target.manufacLocLongDeg.value
    let ingridientManufacurerKey, ingridientSerialNum
    let recyclingStartPoint 
    if (e.target.recycleStartPoint.checked) {
      recyclingStartPoint = "True"
    } else {
      recyclingStartPoint = "false"
    }

    if (!wallet?.publicKey.toString()) {
      alert('Please connect to Solana blockhain!')
      return
    };

    // Confirm purchaserID is ok & get key
    const purhaserKey = await getManufacturerKey(purchaserId)
    // console.log(purhaserKey)
    if (!purhaserKey){
      alert("Invalid purchaser ID")
      return
    }

    // Confirm manufacturer has linked the right key
    const manufacturerKey = await getManufacturerKey(manufacturer._id)
    console.log("Manufacturer:", manufacturerKey)
    if ((!manufacturerKey)||(manufacturerKey!==wallet.publicKey.toString())){
      alert("Please link the right solana wallet")
      return
    }

    // Confirm ingridientID is ok & get key+serialNum
    if (recyclingStartPoint==="false"){
      const ingridientDetails = await getIngridientDetails(ingridientId)
      if (!ingridientDetails){
        alert("Invalid Ingridient ID")
        return
      }
      ingridientManufacurerKey = ingridientDetails?.pubKey || "NA"
      ingridientSerialNum = ingridientDetails?.serialNum || "NA"
    }else {
      ingridientManufacurerKey = "NA"
      ingridientSerialNum = "NA"
    }
    // const ingridientManufacurerKey = ingridientDetails?.pubKey || "NA"
    // const ingridientSerialNum = ingridientDetails?.serialNum || "NA"
    // const a = manufacLocLatDeg || 2
    // Write to MongoDB
    const dbResponse = await writeToDB(token,name, description,serialNum,rePlasticPct,purchaserId,ingridientId,saleYear,saleMonth,saleDate,manufacLocLatDeg,manufacLocLongDeg,recyclingStartPoint)
    alert(dbResponse.msg)
    if (dbResponse.status !==201) {return}

    await writeToSolana(rePlasticPct, serialNum, ingridientManufacurerKey, ingridientSerialNum, purhaserKey)
  }

  useEffect(()=>{
    if (token===""){
      navigate("/manufacturer/login")
    }
  },[])

  return (
    <>
    <Row className="text-center m-1">
      <Col sm={1} md={3} lg={4}></Col>
      <Col className=" p-1 m-2 mt-3">
        <h3>Register Product Sold</h3>
        <Form className="text-center mt-4" onSubmit={handleSubmit}>
          <div className="mt-2  text-center d-flex justify-content-center align-items-center">
          <Form.Label style={{width:"160px"}} className="text-danger me-2"> Manufacturer's Public Key (Solana)</Form.Label>
          <WalletMultiButton />
          </div>
          <div className="mt-4 py-2 mx-2 square bg-secondary rounded-top">
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Name</Form.Label>
            <Form.Control style={{width:"250px"}} name="name"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Description</Form.Label>
            <Form.Control style={{width:"250px"}} name="description"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Re-Plastic %</Form.Label>
            <Form.Control style={{width:"250px"}} name="rePlasticPct"></Form.Control>
          </div>
          </div>

          <div className="mt-4 mx-2 py-2 square bg-secondary rounded-top">
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Serial #</Form.Label>
            <Form.Control style={{width:"250px"}} name="serialNum"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Purchaser's ID</Form.Label>
            <Form.Control style={{width:"250px"}} name="purchaserId"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Ingredient Id</Form.Label>
            <Form.Control style={{width:"250px"}} name="ingridientId"></Form.Control>
          </div>
          </div>

          <div className="mt-4 mx-2 py-2 square bg-secondary rounded-top">
          <div className="d-flex mx-1">
            <Form.Label style={{width:"150px"}} className="">Sale Year</Form.Label>
            <Form.Control style={{width:"250px"}} name="saleYear"></Form.Control>
          </div>
          <div className="d-flex m-1 ">
            <Form.Label style={{width:"150px"}} className="">Sale Month</Form.Label>
            <Form.Control style={{width:"250px"}} name="saleMonth"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}} className="">Sale Date</Form.Label>
            <Form.Control style={{width:"250px"}} name="saleDate"></Form.Control>
          </div>
          </div>

          <div className="mt-4 mx-2 py-2 square bg-secondary rounded-top">
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}} className="">Location (Lat)</Form.Label>
            <Form.Control style={{width:"250px"}} name="manufacLocLatDeg"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}} className="">Location (Lng)</Form.Label>
            <Form.Control style={{width:"250px"}} name="manufacLocLongDeg"></Form.Control>
          </div>
          </div>  
          <div className="d-flex m-1 mt-3 mb-3">
            <Form.Label style={{width:"250px"}} className="">Recycling Start Point?</Form.Label>
            <Form.Check type={"checkbox"} name="recycleStartPoint"/>
          </div>
        
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Col>
  
      <Col sm={1} md={3} lg={4}></Col>
      </Row>
{/*       
    <button onClick={trialWriteProduct}>Test Write</button>
    <button onClick={trialReadProduct}>Test Read</button> */}
     
    </>
  )
}

export default RegisterSale