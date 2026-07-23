const mongoose = require("mongoose");

const connectBackendDB = require("../backend/config/db");
const connectAppointmentDB = require("../microservices/appointmentservice/db");

const Admin = require("../backend/models/adminModel");
const Doctor = require("../backend/models/doctorModel");
const Patient = require("../backend/models/patientModel");
const Receptionist = require("../backend/models/receptionistModel");
const Appointment = require("../microservices/appointmentservice/models/appointmentModel");

const seedAdmins = require("./adminSeed");
const seedDoctors = require("./doctorSeed");
const seedPatients = require("./patientSeed");
const seedReceptionists = require("./receptionistSeed");
const seedAppointments = require("./appointmentSeed");

async function seed() {
  // Backend database
  await connectBackendDB();

  await Admin.deleteMany({});
  await Doctor.deleteMany({});
  await Patient.deleteMany({});
  await Receptionist.deleteMany({});

  await seedAdmins();
  await seedDoctors();
  await seedPatients();
  await seedReceptionists();

  await mongoose.disconnect();

  // Appointment database
  await connectAppointmentDB();

  await Appointment.deleteMany({});
  await seedAppointments();

  await mongoose.disconnect();

  console.log("Database seeded successfully!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
