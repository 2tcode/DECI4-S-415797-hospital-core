const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

console.log(process.env.MICRO_MONGODB_URI);

async function connectDB() {
    try {
        await mongoose.connect(process.env.MICRO_MONGODB_URI);

        console.log("Appointment DB connected successfully");
    } catch (error) {
        console.error("Appointment DB connection failed:");
        console.error(error.message);

        process.exit(1);
    }
}

module.exports = connectDB;