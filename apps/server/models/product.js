
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    serialNum: String,
    rePlasticPct: Number,
    purchaserId: {type:mongoose.Schema.Types.ObjectId, ref:"manufacturer"},
    ingridientProductId: {type:mongoose.Schema.Types.ObjectId, ref:"product"},
    weightKg: Number,
    saleYear: Number,
    saleMonth: Number,
    saleDate: Number,
    manufacLocLatDeg: Number,
    manufacLocLongDeg: Number
},{
    timestamps:true
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel