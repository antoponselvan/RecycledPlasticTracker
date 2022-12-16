// @ts-nocheck 
import {Row, Col, Container, Table, Card} from "react-bootstrap"
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import {useState, useEffect} from "react"

const SoldItemsList = () => {
  const navigate = useNavigate()
  const token = useSelector((state)=>state.token)
  const [productList, setProductList] = useState([])

  useEffect(()=>{
    if (token===""){
      navigate("/manufacturer/login")
    } else {
      fetch("/api/product/getall",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then((res)=>{
        if (res.status !==200){
          throw new Error({msg:"Fetch Failed"})
        }
        return res.json()
      }).then((data)=>{
        console.log(data)
        setProductList(data)
      }).catch((error)=>{
        console.log(error)
        // setProductList(data)
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
    <Container>
      <Row className="text-center mt-3">
      <Col lg={3} md={1} sm={1}></Col>
      <Col>
        <Card>
          <Card.Header>
            <h3>List of Products Registered</h3>
          </Card.Header>
        </Card>
        <Table striped bordered hover className="mt-3">
        <thead className="bg-secondary">
          <tr>
            <th style={{width:"50px"}}>#</th>
            <th>Product Name</th>
            <th style={{width:"130px"}}>Re-Plastic %</th>
            <th style={{width:"160px"}}>Location</th>
            <th style={{width:"130px"}}>Sale Date</th>
          </tr>
        </thead>
        <tbody>
          {
            productList.map((row, idx)=>
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
      <Col lg={3} md={1} sm={1}></Col>
      </Row>  
    </Container>
    </>
  )
}

export default SoldItemsList