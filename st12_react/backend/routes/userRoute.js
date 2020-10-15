const router = require("express").Router();
const validator = require('validator');
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


router.post("/register", async (req, res) => {
    try {
        let { email, password, passwordCheck, name, phoneNumber } = req.body;

        if (!email || !password || !passwordCheck || !phoneNumber)
            return res.status(400).json({ msg: "Not all fields have been entred." });

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ msg: "An account with this email alredy exists." })
        }

        if (password.length < 6)
            return res.status(400).json({ msg: "Passport needs to be at least 6 character long." });

        if (!validator.isEmail(email))
            return res.status(400).json({ msg: "Email is incorrect." });

        if (password !== passwordCheck)
            return res.status(400).json({ msg: "Password fields don't match." });

        if (!validator.isMobilePhone(phoneNumber)) {
            return res.status(400).json({ msg: "Phone number is incorrect." });
        }

        if (!name) {
            name = email;
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);



        const newUser = new User({
            email,
            password: passwordHash,
            phoneNumber,
            name,
        });

        const savedUser = await newUser.save();

        res.json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }


});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Not all fields have been entred." });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "No account with this email has been registered." })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ msg: "Invalid credential." })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                phoneNumber: user.phoneNumber,
                name: user.name,
                role: user.role,
            }
        })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        if(req.body.email){
            const existingUser = await User.find({ email: req.body.email });
            if (existingUser.length>1) {
                return res.status(400).json({ msg: "An account with this email alredy exists." })
            }
        } else{
            return res.status(400).json({ msg: "Email must be filled" })
        }
        if(req.body.password){
            if (req.body.password.length < 6)
                return res.status(400).json({ msg: "Passport needs to be at least 6 character long." });
        }    
        if(req.body.email){
            if (!validator.isEmail(req.body.email))
                return res.status(400).json({ msg: "Email is incorrect." });
        }    

        if (req.body.phoneNumber){
            if (!validator.isMobilePhone(req.body.phoneNumber)) {
                return res.status(400).json({ msg: "Phone number is incorrect." });
            }
        }
        
        if (req.body.password){
            if (req.body.password !== req.body.passwordCheck){
                return res.status(400).json({ msg: "Password fields don't match." });
            }
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(req.body.password, salt);
            req.body.password = passwordHash;
        }
        
        if (!req.body.name || req.body.name === "") {
            req.body.name = req.body.email;
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body})
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;