const {faker} = require("@faker-js/faker");

const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const patients = await Patient.find();
const doctors = await Doctor.find();

const Appointment = require("appointment.js");

async function seedAppointments() {
    const appointments = [];

    for (let i = 0; i < 20; i++) {
        const patient = faker.helpers.arrayElement(patients);
        const doctor = faker.helpers.arrayElement(doctors);
        const appointmentData = new Appointment({
            patientName: patient.name,
            patientID: patient._id,
            doctorName: doctor.name,
            doctorID: doctor._id,
            appointmentDate: faker.date.future(),
            status: faker.helpers.arrayElement(['Pending', 'Completed', 'Accepted', 'Rejected'])
        });
        appointments.push(appointmentData);
    }
    await Appointment.insertMany(appointments);
}

module.exports = seedAppointments;

connectDB();

await Appointment.deleteMany({});
await seedAppointments();

disconnect();