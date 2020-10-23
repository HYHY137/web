const router = require("express").Router();
const Dish = require("../models/dishModel");
const auth = require("../middleware/auth");
const multer = require('multer');
const fs = require('fs');
const { CssBaseline } = require("@material-ui/core");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB file limit
    }
});

require("dotenv").config();

const categories = ["salad", "starter", "soup", "mainDish", "drink", "desert"];

router.post("/", upload.single('image'), auth, async (req, res) => {
    try {
        let { category, name, description, price } = req.body;

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
        console.log(req.file.path)

        const newDish = new Dish({
            category,
            name,
            description,
            price,
            image: req.file.path
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

router.put("/:id", upload.single('image'), auth, async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ msg: "You cant save dish wothout name" })
        }
        if (!req.body.price && req.body.price <= 0) {
            return res.status(400).json({ msg: "Price cant be less or equal 0." })
        }
        if (!req.body.categories && !categories.includes(req.body.category)) {
            return res.status(400).json({ msg: "This category is not avaible." })
        }
        let updatedDishParams;
        if (req.file) {
            updatedDishParams = { ...req.body, image: req.file.path };
            let imgPath = "./" + req.body.oldImage;
            await fs.unlink(imgPath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
        } else updatedDishParams = {...req.body};
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, { $set: updatedDishParams })
        res.json(updatedDish)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id);
        let imgPath = "./" + deletedDish.image;
        await fs.unlink(imgPath, (err) => {
            if (err) {
                console.error(err)
                return
            }
        });
        res.json(deletedDish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;