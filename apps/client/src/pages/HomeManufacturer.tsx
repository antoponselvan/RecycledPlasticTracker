// @ts-nocheck 
import {Row, Col, Table, Card, CardGroup } from "react-bootstrap"
import {useSelector} from "react-redux"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import img1 from "../assets/recycling_img1.jpg"
const HomeManufacturer = () => {
  const manufacturer = useSelector((state)=>state.manufacturer)
  const token = useSelector((state)=>state.token)
  const navigate = useNavigate()
  const [manufacturerBasicInfo, setManufacturerBasicInfo] = useState({
    productCount:0,
    avgRecycledPlasticPct:0,
    latestProductList:[]
  })
  // console.log(manufacturer)

  useEffect(()=>{
    if (token === "") {
      navigate("/manufacturer/login")
    } else {
      fetch("https://y1ibu1burk.execute-api.us-east-1.amazonaws.com/api/manufacturer/basics",
        {headers:{
          Authorization: `Bearer ${token}`
        }})
      .then((res)=>res.json())
      .then((data)=>{
        setManufacturerBasicInfo(data)
      })
    }
  },[])

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
        <h3>Company Name: <span>{manufacturer.name}</span></h3>
        <CardGroup>
          <Card>
          <Card.Header>
          <div className="d-flex align-items-center justify-content-center">
            <div className="me-0">
              <Card.Img variant="top" className="me-1" style={{width:"100px"}} src={img1} />
            </div>
            <div className="ms-2">
          <Card.Title>Vital Stats</Card.Title>
            </div>
          </div>
          </Card.Header>
          <Card.Body>          
            <Card.Text>
            Total Products registered  :  <span>{manufacturerBasicInfo.productCount}</span>
            </Card.Text>
            <Card.Text>
            Average Recycled Plastic (%) : <span>{manufacturerBasicInfo.avgRecycledPlasticPct}</span>
            </Card.Text>
          </Card.Body>
          </Card>
        </CardGroup>
        {/* <h4>User Stats</h4> */}
      </Col>
      <Col lg={4} sm={1} md={3}></Col>
    </Row>

    <Row className="text-center mt-5">
    <Col lg={3} md={1} sm={1}></Col>
    <Col>
      <h3>Latest Registered Products</h3>
      <Table striped bordered hover size="sm" responsive="sm" className="mx-3">
        <thead className="bg-secondary">
          <tr>
            <th style={{width:"50px"}}>#</th>
            <th >Product Name</th>
            <th style={{width:"130px"}}>Re-Plastic %</th>
            <th style={{width:"160px"}}>Location</th>
            <th style={{width:"130px"}}>Sale Date</th>
          </tr>
        </thead>
        <tbody>
          {
            manufacturerBasicInfo.latestProductList.map((row, idx)=>
            <tr key={idx} onClick={handleProductClick(row._id)} style={{cursor:"pointer"}}>
              <td>{idx+1}</td>
              <td>{row.name}</td>
              <td>{row.rePlasticPct}</td>
              <td>Lat: {row.manufacLocLatDeg}; Long: {row.manufacLocLongDeg}</td>
              <td>{row.saleDate}-{row.saleMonth}-{row.saleYear}</td>
          </tr>
            )
          }     
        </tbody>
      </Table>
    </Col>
    <Col lg={3} md={1}></Col>
    </Row>
    
    </>
  )
}

export default HomeManufacturer