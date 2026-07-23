const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
    min: 100000,
    max: 999999,
  },
});
module.exports = mongoose.model("Admin", adminSchema);
