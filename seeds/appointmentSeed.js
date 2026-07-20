const { faker } = require("@faker-js/faker");

const Patient = require("../backend/models/patientModel.js");
const Doctor = require("../backend/models/doctorModel.js");
const Appointment = require("../microservices/appointmentservice/models/appointmentModel.js");

async function seedAppointments() {
    const patients = await Patient.find();
    const doctors = await Doctor.find();

    const appointments = [];
    const usedIDs = new Set();

    for (let i = 0; i < 20; i++) {
        const patient = faker.helpers.arrayElement(patients);
        const doctor = faker.helpers.arrayElement(doctors);

        // Generate a unique 6-digit appointment ID
        let appointmentID;
        do {
            appointmentID = faker.number.int({ min: 100000, max: 999999 });
        } while (usedIDs.has(appointmentID));
        usedIDs.add(appointmentID);

        const startHour = faker.number.int({ min: 8, max: 16 });
        const startMinute = faker.helpers.arrayElement(["00", "30"]);

        const endHour = startMinute === "30" ? startHour + 1 : startHour;
        const endMinute = startMinute === "00" ? "30" : "00";

        appointments.push({
            appointmentID,
            patientName: patient.name,
            patientID: patient.id,
            doctorName: doctor.name,
            doctorID: doctor.id,
            appointmentDate: faker.date.future(),
            appointmentTime: {
                from: `${String(startHour).padStart(2, "0")}:${startMinute}`,
                to: `${String(endHour).padStart(2, "0")}:${endMinute}`
            },
            status: faker.helpers.arrayElement([
                "Booked",
                "Completed",
                "Cancelled"
            ])
        });
    }

    await Appointment.insertMany(appointments);
}

module.exports = seedAppointments;