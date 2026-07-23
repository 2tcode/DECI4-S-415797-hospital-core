const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentID: {
    type: Number,
    required: true,
    unique: true,
  },
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  patientID: {
    type: Number,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
    trim: true,
  },
  doctorID: {
    type: Number,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["Booked", "Completed", "Cancelled"],
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
