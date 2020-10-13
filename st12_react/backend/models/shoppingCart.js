const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    dish_id: { type: mongoose.Schema.Types.ObjectId, ref: 'dish', required: true},
    quantity: {type: Number, required: true, default: 1}
})

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;