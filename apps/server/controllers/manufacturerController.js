
const Product = require("../models/product")
const Manufacturer = require("../models/manufacturer")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginManufacturer = async (req, res) => {
    const {email, password} = req.body;
    try{
        const manufacturer = await Manufacturer.findOne({email})
        if (!manufacturer){
            res.status(404).json({msg:"No user found"})
            return
        }
        const id = manufacturer.id
        if (bcrypt.compareSync(password, manufacturer.password)) {
            const token = jwt.sign({id}, process.env.SECRET, {
                expiresIn:'1D'
            })
            res.status(202).json({token,
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

    const {id, phoneNum, address, password} = req.body
    if (id !== req.manufacturerId){
        res.status(401).json({msg: "Unauthorized! IDs dont match"})
        return
    }
    const manufacturer = await Manufacturer.findById(id)
    manufacturer.phoneNum = phoneNum
    manufacturer.address = address
    manufacturer.password = bcrypt.hashSync(password, 10)
    await manufacturer.save()

    res.json({id: req.manufacturerId,
        msg: "Updated Manufacturer"})
}

const getManufacturerBasicDetails = (req, res) => {
    res.json("basic details")
}

module.exports = {
    loginManufacturer,
    registerManufacturer,
    updateManufacturer,
    getManufacturerBasicDetails
}
