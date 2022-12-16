// @ts-nocheck 
import {Route, BrowserRouter, Routes} from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import HomeAll from "./pages/HomeAll"
import HomeManufacturer from "./pages/HomeManufacturer"
import ItemDetail from "./pages/ItemDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RegisterSale from "./pages/RegisterSale"
import SoldItemsList from "./pages/SoldItemsList"
import TrackItem from "./pages/TrackItem"
import Profile from "./pages/Profile"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<HomeAll/>}/>
          <Route path="/track" element={<TrackItem/>}/>
          <Route path="/itemdetail/:productId" element={<ItemDetail/>}/>
          <Route path="/manufacturer/home" element={<HomeManufacturer/>}/>
          <Route path="/manufacturer/login" element={<Login/>}/>
          <Route path="/manufacturer/register" element={<Register/>}/>
          <Route path="/manufacturer/registersale" element={<RegisterSale/>}/>
          <Route path="/manufacturer/solditemslist" element={<SoldItemsList/>}/>
          <Route path="/manufacturer/profile" element={<Profile/>}/>

        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
