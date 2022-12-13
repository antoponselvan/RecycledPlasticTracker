
const Product = require("../models/product")
const Manufacturer = require("../models/manufacturer")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginManufacturer = async (req, res) => {
    const {email, password} = req.body;
    try{
        const manufacturer = await Manufacturer.findOne({email})
        let manufacturerObj = manufacturer.toObject()
        delete manufacturerObj.password
        if (!manufacturer){
            res.status(404).json({msg:"No user found"})
            return
        }
        const _id = manufacturer.id
        if (bcrypt.compareSync(password, manufacturer.password)) {
            const token = jwt.sign({_id}, process.env.SECRET, {
                expiresIn:'1D'
            })
            res.status(202).json({token,
                manufacturer:manufacturerObj,
                msg:"Login Successful"})
            return;
        } else {
            res.status(403).json({msg:"Wrong password"})
            return;
        }
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Unknown Server Error"})
    }
}

const registerManufacturer = async (req, res) => {
    // console.log(req.body)
    const {name, regNum, regCountry, solanaPubKey, email, phoneNum, address, password} = req.body
    if (!(name && regNum && regCountry && email && phoneNum && address)){
        res.status(400).json({msg: "Invalid input"})
        return;
    }

    try{
    
        const existingUserKey = await Manufacturer.findOne({solanaPubKey})
        const existingRegNum = await Manufacturer.findOne({regNum})
        const existingEmail = await Manufacturer.findOne({email})
        console.log(existingUserKey, existingRegNum)
        if (existingRegNum || existingUserKey || existingEmail){
            res.status(400).json({msg:"User already exists"})
            return;
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        const auxInfo = (name+regCountry+email)
        const auxInfoHash = bcrypt.hashSync(auxInfo, 10)
        const newManufacturer = await Manufacturer.create({name, regNum, regCountry, solanaPubKey,email,phoneNum,address,password:hashedPassword, auxInfoHash})
        // console.log(name, solanaPubKey)
        console.log(newManufacturer.id)
        res.status(201).json({msg:"Manufacturer Registered"})

    }catch (error){
        console.log(error);
        res.status(500).json({msg: "Unknown Server Error"})
    }
}

const updateManufacturer = async (req, res) => {

    const {phoneNum, address, password} = req.body

    try{
        const manufacturer = await Manufacturer.findById(req.manufacturerId)
        manufacturer.phoneNum = phoneNum
        manufacturer.address = address
        manufacturer.password = bcrypt.hashSync(password, 10)
        await manufacturer.save()
        res.json({id: req.manufacturerId,
            msg: "Updated Manufacturer"})
    }catch (error){
        console.log(error)
        res.status(500).json({msg:"Unknown Server Error"})
    }
}

const getManufacturerBasicDetails = async (req, res) => {

    const manufacturerId = req.manufacturerId
    try{
        const productList = await Product.find({manufacturerId},["rePlasticPct"])
        const latestProductListRaw = await Product.find({manufacturerId}).sort({createdAt:'desc'}).limit(5)
        const latestProductList = latestProductListRaw.map((pdt)=>pdt.toObject())
        const productCount = productList.length
        const avgRecycledPlasticPct = (productList.reduce((curr, next)=>{
            return (curr + next.rePlasticPct)},0))/productCount
        res.status(200).json({productCount, avgRecycledPlasticPct, latestProductList})
        return
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Unknown Server Error"})
        return
    }

}

module.exports = {
    loginManufacturer,
    registerManufacturer,
    updateManufacturer,
    getManufacturerBasicDetails
}
