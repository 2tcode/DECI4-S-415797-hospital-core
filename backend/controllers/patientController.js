const Patient = require("../models/patientModel");

exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        console.error("GET PATIENTS ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { id: Number(req.params.id) },
      { medicalHistory: req.body.medicalHistory },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPatient = async (req, res) => {
    try {
        console.log("Body received:", req.body);

        const patient = new Patient(req.body);

        console.log("Patient object:", patient);

        await patient.save();

        console.log("Saved successfully!");

        res.status(201).json(patient);
    } catch (err) {
        console.error("CREATE PATIENT ERROR:");
        console.error(err);
        console.error(err.stack);

        res.status(500).json({
            error: err.message,
            name: err.name
        });
    }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOneAndDelete({
      id: Number(req.params.id),
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.json({
      message: "Patient deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

