const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
    category: {type: String,  enum: ["salad", "starter", "soup", "mainDish", "drink", "desert"], required: true},
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    image: {type: String}   
})
const Dish = mongoose.model("dish", dishSchema);
module.exports = Dish;