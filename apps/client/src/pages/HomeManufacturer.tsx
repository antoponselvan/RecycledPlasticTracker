
import {Row, Col, Table } from "react-bootstrap"
import {useSelector} from "react-redux"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

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
      fetch("/api/manufacturer/basics",
        {headers:{
          Authorization: `Bearer ${token}`
        }})
      .then((res)=>res.json())
      .then((data)=>{
        // console.log(data)
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
        <h3>Hi, <span>{manufacturer.name}</span></h3>
        <h4>User Stats</h4>
        <h6>Total Products registered: <span>{manufacturerBasicInfo.productCount}</span></h6>
        <h6>Average Recycled Plastic % : <span>{manufacturerBasicInfo.avgRecycledPlasticPct}</span></h6>
      </Col>
      <Col lg={4} sm={1} md={3}></Col>
    </Row>

    <Row className="text-center mt-5">
      <h3>Latest Registered Products</h3>
      <Table striped bordered hover className="mx-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Re-Plastic %</th>
            <th>Location</th>
            <th>Sale Date</th>
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

    </Row>
    
    </>
  )
}

export default HomeManufacturer