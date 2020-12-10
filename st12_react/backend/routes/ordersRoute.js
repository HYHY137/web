const router = require("express").Router();
const Order = require("../models/orderModel");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
    try {
        const allOrders = await Order.find().populate("dishes.dish userID");
        res.json(allOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("dishes.dish userID");
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/user/:userID", auth, async (req, res) => {
    try {
        const orders = await Order.find({userID: req.params.userID}).populate("dishes.dish userID");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", auth, async (req, res) => {
    try {
        let { userID, totalPrice, dishes, description } = req.body;
        console.log(req.body)
        if (!userID || !totalPrice || !dishes) {
            return res.status(400).json({ msg: "Not all fields have been entred." });
        }
        if (dishes.length < 1){
            return res.status(400).json({ msg: "Cant save order without dishes" });
        }
        if (!description || description === ''){
            description = 'No description'
        }
        const newEntry = new Order({
            userID,
            totalPrice,
            dishes,
            description
        })
        const savedEntry = await newEntry.save();
        res.json(savedEntry);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.json(deletedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;