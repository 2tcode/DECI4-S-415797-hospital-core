const express = require("express");
const cors = require("cors");

const appointmentRoutes = require("./routes/appointmentRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Appointment Service Running");
});

module.exports = app;