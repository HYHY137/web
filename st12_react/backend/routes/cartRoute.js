const router = require("express").Router();
const Cart = require("../models/shoppingCart");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
    try {
        const allDishes = await Cart.find();
        res.json(allDishes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const dish = await Cart.find({user_id: req.params.id});
        res.json(dish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", auth, async (req, res) => {
    try {
        let { userID, count, dishID } = req.body;
        if (!userID || !count || !dishID) {
            return res.status(400).json({ msg: "Not all fields have been entred." });
        }
        if (count < 1){
            return res.status(400).json({ msg: "Quantity can`t be less 1" });
        }
        const newEntry = new Cart({
            user_id: userID,
            quantity: count,
            dish_id: dishID,
        })
        const savedEntry = await newEntry.save();
        res.json(savedEntry);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const deletedDish = await Cart.findByIdAndDelete(req.params.id);
        res.json(deletedDish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;