const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    dishes: [ {dish: {type: mongoose.Schema.ObjectId, require: true, ref: 'dish'}, quantity: {type: Number, require: true} }],
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    description: {type: String},
    totalPrice: {type: Number, required: true} 
})
const Order = mongoose.model("orders", orderSchema);
module.exports = Order;