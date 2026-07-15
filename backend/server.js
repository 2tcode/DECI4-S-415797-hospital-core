const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const connectDB = require("./config/db");
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
