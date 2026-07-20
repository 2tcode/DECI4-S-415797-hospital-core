const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
});
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.MICRO_PORT || 5001;

app.use(cors());
app.use(express.json());

const connectDB = require("./db");

async function startServer() {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();