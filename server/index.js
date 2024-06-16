const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
dotenv.config();

const auth = require("./routes/auth");
const client = require("./routes/client");
const connectDB = require("./connectMongo");

app.use(bodyParser.json());
app.use("/auth", auth);
app.use("/client", client);

const PORT = process.env.PORT || 3000;
async function start() {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
