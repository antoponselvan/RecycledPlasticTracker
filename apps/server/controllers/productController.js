
const Manufacturer = require("../models/manufacturer")
const Product = require("../models/product")

const getAllProducts = async (req, res) => {
    const manufacturerId = req.manufacturerId
    try{
        // Need to add specific columns needed
        const productListRaw = await Product.find({manufacturerId})
        const productList = productListRaw.map((product)=>product.toObject());
        res.status(200).json(productList)
        return
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Unknown server error"})
    }
    res.json("Get All")
}

const registerProduct = async (req, res) => {
    const manufacturerId = req.manufacturerId
    let {name, description, serialNum, rePlasticPct, purchaserId, ingridientId, weightKg, saleYear, saleMonth, saleDate, manufacLocLatDeg, manufacLocLongDeg, recyclingStartPoint} = req.body
    rePlasticPct = Number(rePlasticPct)
    weightKg = Number(weightKg)
    saleDate = Number(saleDate)
    saleMonth = Number(saleMonth)
    saleYear = Number(saleYear)
    manufacLocLatDeg = Number(manufacLocLatDeg)
    manufacLocLongDeg = Number(manufacLocLongDeg)
    recyclingStartPoint = Boolean(recyclingStartPoint)
    console.log(name,serialNum,rePlasticPct,purchaserId,ingridientId,saleYear,recyclingStartPoint,manufacLocLatDeg)
    if (!(name && serialNum && rePlasticPct && saleYear && recyclingStartPoint && manufacLocLatDeg && manufacLocLongDeg && recyclingStartPoint)){ 
        //  )){
        console.log("Fill all details")
        res.status(400).json({msg:"Error: Fill all details"})
        return
    }

    if ((!recyclingStartPoint)&&(!ingridientId)){
        res.status(400).json({msg:"Error: Ingridient needed if not starting point"})
        return
    }

    
    try{
        const boughtProduct = await Product.findOne({purchaserId:manufacturerId, _id:ingridientId})
        if (!boughtProduct){
            res.status(400).json({msg:"Error: You cannot link a ingridient that you have not bought"})
            return
        }
        const buyer = await Manufacturer.findById(purchaserId)
        if (!(buyer.name)){
            res.status(400).json({msg:"Error: Buyer ID doesnt exist"})
            return
        }

        const existingProduct = await Product.findOne({manufacturerId, serialNum})
        if (existingProduct){
            res.status(400).json({msg:"Error: Product already exists"})
            return
        }
        const newProduct = await Product.create({manufacturerId,name,description,serialNum,rePlasticPct,purchaserId, ingridientId, weightKg,saleYear,saleMonth,saleDate,manufacLocLatDeg,manufacLocLongDeg, recyclingStartPoint})
        res.status(201).json({msg:"Product Registered"})
        return

    }catch (error){
        console.log(error)
        res.status(500).json({msg:"Error: Unknown server error"})
        return
    }
}

const getProductDetails = async (req,res) => {
    const id = req.params.id
    console.log(id)

    try{
        const product = await Product.findById(id)
        if (!product){
            res.status(400).json({msg:"No such product registered"})
            return
        }
        const manufacturerId = product.manufacturerId
        const manufacturer = await Manufacturer.findById(manufacturerId)
        // const productObj = product.map((p)=>p.toObject())
        const productObj = product.toObject()
        const manufacturerObj = manufacturer.toObject()
        // console.log(Object.keys(product))
        console.log(productObj, manufacturerObj)
        res.status(200).json({
            product:productObj,
            manufacturer:manufacturerObj
        })
        return
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Unknown server error"})
    }
    res.json("get one")
}

module.exports = { getAllProducts, registerProduct, getProductDetails}
