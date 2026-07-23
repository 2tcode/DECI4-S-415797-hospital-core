const Appointment = require("../models/appointmentModel");

exports.getAppointments = async (req, res) => {
    const appointments = await Appointment.find();
    res.json(appointments);
};

exports.completeAppointment = async (req, res) => {
    try {
        console.log("ID received:", req.params.id);

        const appointment = await Appointment.findOneAndUpdate(
            { appointmentID: Number(req.params.id) },
            { status: "Completed" },
            { new: true }
        );

        console.log("Updated:", appointment);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);

        await appointment.save();

        res.status(201).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { appointmentID: Number(req.params.id) },
      { status: "Cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};