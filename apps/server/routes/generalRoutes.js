
const express = require("express")
const generalRouter = express.Router()
const Manufacturer = require("../models/manufacturer")
const Product = require("../models/product")
const {trackProduct} = require("../controllers/generalControllers")

generalRouter.get("/test", (req,res)=>{
    res.json("Hello World!")
})

generalRouter.post("/track", trackProduct)

module.exports = generalRouter