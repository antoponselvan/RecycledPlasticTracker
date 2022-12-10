
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const generalRouter = require("./routes/generalRoutes")

const app = express()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

mongoose.connect(MONGO_URI)

app.use(express.json())
app.use(cors())

app.use("/api/general",generalRouter)

mongoose.connection.once("open", ()=>{
    console.log("DB connected")
    app.listen(PORT, ()=>{
        console.log("Server Running")
    })
})

