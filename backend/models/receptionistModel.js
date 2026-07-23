const mongoose = require("mongoose");

const receptionistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
    min: 100000,
    max: 999999,
  },
});
module.exports = mongoose.model("Receptionist", receptionistSchema);
