const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started at port: ${PORT}`));

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true
}, (err)=>{
    if (err) throw err;
    console.log("MongoDB connection established ")
});

app.use("/orders", require("./routes/ordersRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/dish", require("./routes/dishRoute"));
app.use("/shoppingCart", require("./routes/cartRoute"));
