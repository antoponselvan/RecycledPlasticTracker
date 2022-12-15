import {Row, Col, Form, Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import {useSelector} from "react-redux"

import * as web3 from '@solana/web3.js'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { RePlasticTracker } from '../data/re_plastic_tracker'
import { SolanaMovieProgram } from "../data_backup_pgm/solana_movie_program"
import * as smpIdl from '../data/re_plastic_tracker.json';
// import * as smpIdl from '../data_backup_pgm/solana_movie_program.json';
import * as anchor from "@project-serum/anchor";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {  WalletMultiButton} from "@solana/wallet-adapter-react-ui";

const RE_PLASTIC_TRACKER_PROGRAM_ID = "CnBe9kijpRjNv5ts2iUCKDGaZmoFVhtLTDTb1R7VSWDT"
const RE_PLASTIC_TRACKER_BACKUP_PROGRAM_ID = '2SogeA4hASCYGTSQqoSqKy8cZ3bnka5N5U9Ewkswkyf5'

const RegisterSale = () => {

  const navigate = useNavigate()
  const token = useSelector((state)=>state.token)

  const { connection} = useConnection();
  const wallet = useAnchorWallet()

  const testPgmConn = async () =>{}

  // const trialWriteMovie = async () => {
  //   if (!wallet?.publicKey) {
  //     // alert('Please connect your wallet!')
  //     return
  //   };
  //   const movie = {title:"Test Anto", rating:4, description:"Please write - Updated"}
  //   const product = {rePlasticPct:10 ,serialNum:"TEST", ingridientManufacurerKey:"AFhu69Fx9G6VstaqnqsPyp6maKsmjMZx1wdqKQi4swfm", ingridientSerialNum:"TESTAA11", purchaserKey:"21VM8zfTeXt7Exevh8P1Gpy82j6QTSHPregkdc6J82f1"}
  //   const smpClient = new anchor.Program<SolanaMovieProgram>(
  //       smpIdl as any,
  //       new web3.PublicKey(RE_PLASTIC_TRACKER_BACKUP_PROGRAM_ID),
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
  //     new web3.PublicKey(RE_PLASTIC_TRACKER_BACKUP_PROGRAM_ID)
  //   )
  //   const variant = await connection.getAccountInfo(pda)? 1: 0;
  //   const description =  (product.rePlasticPct+"---"+product.ingridientManufacurerKey+"---"+product.ingridientSerialNum+"---"+product.purchaserKey)
  //   try {
  //     const txSig = await smpClient.methods.addOrUpdateReview(
  //         variant,
  //         product.serialNum,
  //         4,
  //         description
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
  // }
  const trialWriteProduct = async () => {
    if (!wallet?.publicKey) {
      // alert('Please connect your wallet!')
      return
    };
    
    const product = {rePlasticPct:10 ,serialNum:"TEST", ingridientManufacurerKey:"AFhu69Fx9G6VstaqnqsPyp6maKsmjMZx1wdqKQi4swfm", ingridientSerialNum:"TESTAA11", purchaserKey:"21VM8zfTeXt7Exevh8P1Gpy82j6QTSHPregkdc6J82f1"}
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
      [
          wallet.publicKey.toBuffer(), 
          Buffer.from(anchor.utils.bytes.utf8.encode(product.serialNum))
      ],
      new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID)
    )
    const variant = await connection.getAccountInfo(pda)? 1: 0;
    console.log(variant, pda)
    try {
      const txSig = await smpClient.methods.addOrUpdateProduct(
          variant,
          product.rePlasticPct,
          product.serialNum,
          product.ingridientManufacurerKey,
          product.ingridientSerialNum,
          product.purchaserKey
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

//   const trialReadMovie = async () => {
//     if (!wallet?.publicKey.toString()) {
//         // alert('Please connect your wallet!')
//         return
//     };
//     const smpClient = new anchor.Program<SolanaMovieProgram>(
//         smpIdl as any,
//         new web3.PublicKey(RE_PLASTIC_TRACKER_BACKUP_PROGRAM_ID),
//         new anchor.AnchorProvider(
//             connection,
//             wallet,
//             anchor.AnchorProvider.defaultOptions()
//         )
//     ) 
//     const product = {serialNum:"TEST"}
//     const [pda] = await web3.PublicKey.findProgramAddress(
//         [
//             wallet.publicKey.toBuffer(), 
//             Buffer.from(anchor.utils.bytes.utf8.encode(product.serialNum))
//         ],
//         new web3.PublicKey(RE_PLASTIC_TRACKER_BACKUP_PROGRAM_ID)
//     )
//     const dataOnChain = await smpClient.account.movieAccountState.fetch(pda)
//     alert(dataOnChain.description.split("---"))
//     console.log(dataOnChain)
// }

const trialReadProduct = async () => {
  if (!wallet?.publicKey.toString()) {
      // alert('Please connect your wallet!')
      return
  };
  const smpClient = new anchor.Program<RePlasticTracker>(
      smpIdl as any,
      new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID),
      new anchor.AnchorProvider(
          connection,
          wallet,
          anchor.AnchorProvider.defaultOptions()
      )
  ) 
  const product = {serialNum:"TEST"}
  const [pda] = await web3.PublicKey.findProgramAddress(
      [
          wallet.publicKey.toBuffer(), 
          Buffer.from(anchor.utils.bytes.utf8.encode(product.serialNum))
      ],
      new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID)
  )
  const dataOnChain = await smpClient.account.productAccountState.fetch(pda)
  alert(dataOnChain.serialNum)
  console.log(dataOnChain)
}

  useEffect(()=>{
    if (token===""){
      navigate("/manufacturer/login")
    }
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log((e.target.recycleStartPoint.checked))
    const name = e.target.name.value
    const description = e.target.description.value
    const serialNum = e.target.serialNum.value
    const rePlasticPct = e.target.rePlasticPct.value
    const purchaserId = e.target.purchaserId.value
    const ingridientId = e.target.ingridientId.value
    const weightKg = e.target.weightKg.value
    const saleYear = e.target.saleYear.value
    const saleMonth = e.target.saleMonth.value
    const saleDate = e.target.saleDate.value
    const manufacLocLatDeg = e.target.manufacLocLatDeg.value
    const manufacLocLongDeg = e.target.manufacLocLongDeg.value
    let recyclingStartPoint 
    if (e.target.recycleStartPoint.checked) {
      recyclingStartPoint = "True"
    } else {
      recyclingStartPoint = "false"
    }

    fetch("/api/product/register",{
      method:"POST",
      headers:{
        "content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({name, description,serialNum,rePlasticPct,purchaserId,ingridientId,weightKg,saleYear,saleMonth,saleDate,manufacLocLatDeg,manufacLocLongDeg,recyclingStartPoint})
    }).then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      window.alert(data.msg)
    })
  }

  return (
    <>
    <div className="mt-2 text-center d-flex justify-content-center">
    <WalletMultiButton />
    </div>
    <button onClick={trialWriteProduct}>Test Write</button>
    <button onClick={trialReadProduct}>Test Read</button>
    <Row className="text-center">
      
      <Col sm={2} md={3} lg={4}></Col>
      <Col className="border p-1 m-2 mt-3">
        <h3>REGISTER PRODUCT SOLD</h3>
        <Form className="text-center mt-4" onSubmit={handleSubmit}>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Name</Form.Label>
            <Form.Control name="name"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Description</Form.Label>
            <Form.Control name="description"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Serial #</Form.Label>
            <Form.Control name="serialNum"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Re-Plastic %</Form.Label>
            <Form.Control name="rePlasticPct"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Purchaser's ID</Form.Label>
            <Form.Control name="purchaserId"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Ingridient Id</Form.Label>
            <Form.Control name="ingridientId"></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"150px"}}>Net Weight</Form.Label>
            <Form.Control name="weightKg"></Form.Control>
          </div>
          <div className="d-flex m-1 mt-4">
            <Form.Label style={{width:"150px"}} className="">Sale Year</Form.Label>
            <Form.Control name="saleYear"></Form.Control>
          </div>
          <div className="d-flex m-1 ">
            <Form.Label style={{width:"150px"}} className="">Sale Month</Form.Label>
            <Form.Control name="saleMonth"></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"150px"}} className="">Sale Date</Form.Label>
            <Form.Control name="saleDate"></Form.Control>
          </div>
          <div className="d-flex m-1 mt-4">
            <Form.Label style={{width:"150px"}} className="">Location (Lat)</Form.Label>
            <Form.Control name="manufacLocLatDeg"></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"150px"}} className="">Location (Lng)</Form.Label>
            <Form.Control name="manufacLocLongDeg"></Form.Control>
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"250px"}} className="">Recycling Start Point?</Form.Label>
            <Form.Check type={"checkbox"} name="recycleStartPoint"/>
          </div>  
        
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Col>
  
      <Col sm={2} md={3} lg={4}></Col>
      </Row>
     
    </>
  )
}

export default RegisterSale