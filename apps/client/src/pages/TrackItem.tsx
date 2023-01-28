// @ts-nocheck 
import {Row, Col, Form, Button, Table} from "react-bootstrap"
import {useState, useEffect, useRef} from "react"
import { useNavigate } from "react-router-dom"
import ReactGoogleMap from "../components/ReactGoogleMap"

const center1 = {
  lat: 0,
  lng: -180
}

const positions1 = [
  {lat: 37.772, lng: -122.214},
  {lat: 0, lng: -122.214}
]


const TrackItem = () => {
  const [trackDetails, setTrackDetails] = useState([])
  const [fetchFailed, setFetchFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const refPubKey = useRef()
  const refPdtNum = useRef()

  // For Google-map display
  // const center = {lat: 0, lng: 0}
  // let positions = [
  //   {lat: 0, lng: 0}
  // ]
  // if (trackDetails.length>0){
  //   center.lat = trackDetails.reduce((latSum, ManufacStage)=>(latSum+(ManufacStage.lat)),0)/(trackDetails.length)
  //   center.lng = trackDetails.reduce((latSum, ManufacStage)=>(latSum+(ManufacStage.lat)),0)/(trackDetails.length)

  //   positions=[]
  //   positions=trackDetails.map((manufacStage)=>{
  //     return {
  //       lat:manufacStage.lat,
  //       lng:manufacStage.lng
  //     }
  //   })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const serialNum = e.target.serialNum.value
    const solanaPubKey = e.target.solanaPubKey.value

    // Need Some error handling for above inputs

    fetch("https://y1ibu1burk.execute-api.us-east-1.amazonaws.com/api/general/track",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({solanaPubKey, serialNum})
    })
    .then((res)=>{
      setIsLoading(false)
      if (res.status !== 200){
        alert("Fetch Failed! Ensure correct inputs")
      }
      return res.json()
    })
    .then((data)=>{
      setTrackDetails(data)
    })
    .catch((error)=>{
      alert("Fetch Failed!")
      setIsLoading(false)
      console.log(error)
      setFetchFailed(true)
      setTrackDetails([])
    })
  }

  const handleDemo = () => {
    refPubKey.current.value = "4JFWfZcT1S19pLUd9mHj3fPuGGDCbiSVJfGeGVDMRxgY"
    refPdtNum.current.value = "EEEE0001"
  }

  const handleProductClick = (productId) => {
    return (
      () => {
        navigate("/itemdetail/"+productId)
      }
    )
  }

  return (
    <>
    <Row className="text-center mt-3 m-1">
      <Col lg={4} md={3} sm={1}></Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Company Public Key</Form.Label>
            <Form.Control name="solanaPubKey" type="text" placeholder="Key" ref={refPubKey}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Serial Number</Form.Label>
            <Form.Control name="serialNum" type="text" placeholder="Serial #" ref={refPdtNum}/>
          </Form.Group>
          <Button variant="primary" type="submit">Track Transformation</Button>
          <p className="m-3">To Auto-fill Demo Product Details :- 
            <Button variant="secondary" onClick={handleDemo}>Click Here</Button> 
          </p>
        </Form>
        
      </Col>
      <Col lg={4} sm={1} md={3}></Col>
    </Row>
    {
      fetchFailed ? <p>Fetch Error</p>
      :
      <p></p>
    }
    {isLoading ?
        <Row className="mt-5 justify-content-center">
          <div className="spinner-grow" role="status"></div>
          <div className="spinner-grow" role="status"></div>
          <div className="spinner-grow" role="status"></div>
        </Row>
        :
    
      (trackDetails.length > 0) &&
      <>
        <Row className="text-center mt-5">
          <h3>Tracking Details</h3>
        </Row>
        <Row>
          <Col lg={3} md={1} sm={1}></Col>
          <Col>
            <div class="table-responsive">
              <Table striped bordered hover className="mx-3">
                <thead className="bg-secondary">
                  <tr>
                    <th style={{width:"40px"}}>Stage #</th>
                    <th>Company Name</th>
                    <th>Product Name</th>
                    <th style={{width:"130px"}}>Re-Plastic %</th>
                    <th  style={{width:"160px"}}>Location</th>
                    <th style={{width:"130px"}}>Sale Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    trackDetails.map((row, idx)=>
                    <tr key={idx} onClick={handleProductClick(row.productId)} style={{cursor:"pointer"}}>
                      <td>{idx+1}</td>
                      <td>{row.manufacturerName}</td>
                      <td>{row.productName}</td>
                      <td>{row.rePlasticPct}</td>
                      <td>{row.location}</td>
                      <td>{row.saleDate}</td>
                  </tr>
                    )
                  }     
                </tbody>
              </Table>
              </div>
          </Col>
          <Col lg={3} md={1} sm={1}></Col>
        </Row>
      </>
    }
    
    {/* <Row className="d-flex justify-content-center">
      <ReactGoogleMap center={center} positions={positions}/>
    </Row> */}
    
    </>
  )
}

export default TrackItem