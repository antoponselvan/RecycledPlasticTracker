
import {Row, Col, Form, Button, Table} from "react-bootstrap"
import {useState, useEffect} from "react"
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
  const navigate = useNavigate()

  const center = {lat: 0, lng: 0}
  
  let positions = [
    {lat: 0, lng: 0}
  ]
  if (trackDetails.length>0){
    center.lat = trackDetails.reduce((latSum, ManufacStage)=>(latSum+(ManufacStage.lat)),0)/(trackDetails.length)
    center.lng = trackDetails.reduce((latSum, ManufacStage)=>(latSum+(ManufacStage.lat)),0)/(trackDetails.length)

    positions=[]
    positions=trackDetails.map((manufacStage)=>{
      return {
        lat:manufacStage.lat,
        lng:manufacStage.lng
      }
    })
  }
  console.log(center, positions, trackDetails)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const serialNum = e.target.serialNum.value
    const solanaPubKey = e.target.solanaPubKey.value

    console.log(serialNum, solanaPubKey)
    // Need Some error handling for above inputs

    fetch("/api/general/track",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({solanaPubKey, serialNum})
    })
    .then((res)=>{
      if (res.status !== 200){
        // throw new Error({msg:"Fetch Failed"})
      }
      return res.json()
    })
    .then((data)=>{
      // console.log(data)
      setTrackDetails(data)
    })
    .catch((error)=>{
      console.log(error)
      setFetchFailed(true)
      setTrackDetails([])
    })
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
    <Row className="text-center mt-3">
      <Col lg={4} md={3} sm={1}></Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Company Public Key</Form.Label>
            <Form.Control name="solanaPubKey" type="text" placeholder="Key" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Serial Number</Form.Label>
            <Form.Control name="serialNum" type="text" placeholder="Serial #" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Track
          </Button>
        </Form>
      </Col>
      <Col lg={4} sm={1} md={3}></Col>
    </Row>
    {
      fetchFailed ? <p>Fetch Error</p>
      :
      <p></p>
    }
    <Row className="text-center mt-5">
      <h3>Tracking Details</h3>
    </Row>
    <Row>
      <Col lg={3} md={1} sm={1}></Col>
      <Col>
        {
          (trackDetails.length > 0) &&
          <Table striped bordered hover className="mx-3">
          <thead className="bg-secondary">
            <tr>
              <th style={{width:"50px"}}>#</th>
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
              <tr onClick={handleProductClick(row.productId)} style={{cursor:"pointer"}}>
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
          }
      </Col>
      <Col lg={3} md={1} sm={1}></Col>
    </Row>
    <Row className="d-flex justify-content-center">
      <ReactGoogleMap center={center} positions={positions}/>
    </Row>
    
    </>
  )
}

export default TrackItem