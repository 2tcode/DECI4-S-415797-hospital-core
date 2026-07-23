const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
});

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

// Routes
const appointmentRoutes = require("./routes/appointmentRoute");

const app = express();
const PORT = process.env.MICRO_PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        await connectDB();

        // Appointment API
        app.use("/appointments", appointmentRoutes);

        // Health check
        app.get("/", (req, res) => {
            res.send("Appointment Service Running");
        });

        app.listen(PORT, () => {
            console.log(`Appointment Service running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start appointment service:", err);
        process.exit(1);
    }
}

startServer();