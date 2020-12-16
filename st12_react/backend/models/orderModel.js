const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    dishes: [ {dish: {type: mongoose.Schema.ObjectId, require: true, ref: 'dish'}, quantity: {type: Number, require: true} }],
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    description: {type: String},
    created_at: {type: Date, default: () => Date.now() + 3*60*60*1000},
    totalPrice: {type: Number, required: true} 
})
const Order = mongoose.model("orders", orderSchema);
module.exports = Order;