const Doctor = require("../models/doctorModel");
exports.login = async (req, res) => {
  try {
    const { name, id } = req.body;

    console.log("Request body:", req.body);

    const doctor = await Doctor.findOne({ name, id });

    console.log("Query:", { name, id });
    console.log("Result:", doctor);

    if (!doctor) {
      return res.json({
        success: false,
      });
    }

    return res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndDelete({
      id: Number(req.params.id),
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json({
      message: "Doctor deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);

    await doctor.save();

    res.status(201).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create doctor",
      error: err.message,
    });
  }
};
