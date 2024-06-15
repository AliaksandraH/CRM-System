const mongoose = require("mongoose");

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Connect to MongoDB successfully");
    } catch (error) {
        console.log("Connect failed: " + error.message);
    }
};

module.exports = connectDB;
