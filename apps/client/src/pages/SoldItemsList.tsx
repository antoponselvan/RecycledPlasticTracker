import {Row, Col, Container, Table} from "react-bootstrap"
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
        <h3>List of Products Registered</h3>

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
      </Row>
    </Container>
    </>
  )
}

export default SoldItemsList