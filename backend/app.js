const express = require("express");
const cors = require("cors");

const doctorRoutes = require("./routes/doctorRoute");
const adminRoutes = require("./routes/adminRoute");
const receptionistRoutes = require("./routes/receptionistRoute");
const patientRoutes = require("./routes/patientRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/doctor", doctorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/receptionist", receptionistRoutes);
app.use("/api/patient", patientRoutes);

app.get("/", (req, res) => {
  res.send("Healthcare Backend Running");
});

module.exports = app;
