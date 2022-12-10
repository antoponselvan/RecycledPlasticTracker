
const express = require("express")
const generalRouter = express.Router()
const Manufacturer = require("../models/manufacturer")
const Product = require("../models/product")


generalRouter.get("/test", (req,res)=>{
    res.json("Hello World 2!")
})


module.exports = generalRouter