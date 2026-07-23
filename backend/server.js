const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


const doctorRoutes = require("./routes/doctorRoute");
const adminRoutes = require("./routes/adminRoute");
const receptionistRoutes = require("./routes/receptionistRoute");
const patientRoutes = require("./routes/patientRoute");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        await connectDB();


        app.use("/api/doctor", doctorRoutes);
        app.use("/api/admin", adminRoutes);
        app.use("/api/receptionist", receptionistRoutes);
        app.use("/api/patient", patientRoutes);

        app.get("/", (req, res) => {
            res.send("Healthcare Backend Running");
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}

startServer();