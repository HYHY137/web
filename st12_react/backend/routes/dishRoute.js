const router = require("express").Router();
const Dish = require("../models/dishModel");
const auth = require("../middleware/auth");

require("dotenv").config();

const categories = ["salad", "starter", "soup", "mainDish", "drink", "desert"];

router.post("/", auth, async (req, res) => {
    try {
        let { category, name, description, price, image } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({ msg: "Not all fields have been entred." });
        }
        const existingDish = await Dish.findOne({ name: name });
        if (existingDish) {
            return res.status(400).json({ msg: "A dish with same name alredy exists." })
        }
        if (price <= 0) {
            return res.status(400).json({ msg: "Price cant be less or equal 0." })
        }
        if (!categories.includes(category)) {
            return res.status(400).json({ msg: "This category is not avaible." })
        }
        if (!description) {
            description = "No provided description";
        }
        if (!image) {
            image = "";
        }

        const newDish = new Dish({
            category,
            name,
            description,
            price,
            image
        })
        const savedDish = await newDish.save();
        res.json(savedDish);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const allDishes = await Dish.find();
        res.json(allDishes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        res.json(dish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        if (req.body.price && req.body.price <= 0) {
            return res.status(400).json({ msg: "Price cant be less or equal 0." })
        }
        if (req.body.categories && !categories.includes(req.body.category)) {
            return res.status(400).json({ msg: "This category is not avaible." })
        }
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.json(updatedDish)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id);
        res.json(deletedDish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;