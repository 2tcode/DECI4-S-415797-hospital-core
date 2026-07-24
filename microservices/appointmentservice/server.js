const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.MICRO_PORT || 5005;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Appointment Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start appointment service:", err);
    process.exit(1);
  }
}

startServer();
