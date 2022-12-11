const express = require("express")
const manufacturerRouter = express.Router()

const {loginManufacturer, registerManufacturer, updateManufacturer, getManufacturerBasicDetails} = require("../controllers/manufacturerController")
const { protect } = require("../middleware/protect")


// manufacturerRouter.get("/login", loginManufacturer)
manufacturerRouter.post("/login", loginManufacturer)
manufacturerRouter.post("/register", registerManufacturer)
manufacturerRouter.put("/updateprofile", protect, updateManufacturer)
manufacturerRouter.get("/basics", protect, getManufacturerBasicDetails)


module.exports = manufacturerRouter
