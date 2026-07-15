const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error.message);

        process.exit(1);
    }
}

module.exports = connectDB;